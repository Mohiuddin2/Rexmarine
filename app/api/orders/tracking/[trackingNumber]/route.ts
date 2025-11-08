import { NextResponse } from "next/server";

import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";

type ParamsPromise = Promise<{ trackingNumber: string }>;

export async function GET(_req: Request, context: { params: ParamsPromise }) {
  try {
    await connectToDatabase();

    const { trackingNumber } = await context.params;
    const sanitizedTrackingNumber = trackingNumber.trim();

    if (!sanitizedTrackingNumber) {
      return NextResponse.json(
        { success: false, message: "Tracking number is required" },
        { status: 400 }
      );
    }

    const order = await Order.findOne({ trackingNumber: sanitizedTrackingNumber }).lean();

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found for the provided tracking number" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        bookingNumber: order.bookingNumber,
        trackingNumber: order.trackingNumber,
        status: order.status,
        shipment: {
          destination: order.shipment.destination,
          weight: order.shipment.weight,
          pickupDate: order.shipment.pickupDate,
          estimatedDeliveryDays: order.shipment.estimatedDeliveryDays,
          actualDeliveryDate: order.shipment.actualDeliveryDate,
        },
        tracking: order.tracking,
        delivery: order.delivery,
        recipient: {
          name: order.recipient.name,
          address: order.recipient.address,
        },
      },
    });
  } catch (error) {
    console.error("Error tracking order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch tracking information" },
      { status: 500 }
    );
  }
}


