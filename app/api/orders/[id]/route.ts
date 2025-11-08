import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { z } from "zod";

import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";

const orderStatusEnum = z.enum([
  "pending",
  "confirmed",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);

const trackingEventSchema = z.object({
  timestamp: z.coerce.date(),
  status: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  eventType: z.enum(["pickup", "transit", "customs", "delivery", "exception", "info"]),
  agentName: z.string().optional(),
  facilityCode: z.string().optional(),
  nextExpectedEvent: z.string().optional(),
  photos: z.array(z.string()).optional(),
  automated: z.boolean(),
});

const trackingMilestonesSchema = z
  .object({
    orderConfirmed: z.coerce.date().optional(),
    packagePickedUp: z.coerce.date().optional(),
    inTransit: z.coerce.date().optional(),
    arrivedAtDestination: z.coerce.date().optional(),
    outForDelivery: z.coerce.date().optional(),
    delivered: z.coerce.date().optional(),
  })
  .partial()
  .optional();

const updateStatusSchema = z.object({
  status: orderStatusEnum,
  currentLocation: z.string().optional(),
  progressPercentage: z.coerce.number().min(0).max(100).optional(),
  estimatedDeliveryDate: z.coerce.date().optional(),
  milestones: trackingMilestonesSchema,
  addEvent: trackingEventSchema.optional(),
  notes: z.string().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid order id" }, { status: 400 });
    }

    const order = await Order.findById(id).lean();
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid order id" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { status, currentLocation, progressPercentage, estimatedDeliveryDate, milestones, addEvent, notes, isActive } =
      parsed.data;

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    order.status = status;
    order.tracking.currentStatus = status;

    if (currentLocation) {
      order.tracking.currentLocation = currentLocation;
    }

    if (typeof progressPercentage === "number") {
      order.tracking.progressPercentage = progressPercentage;
    }

    if (estimatedDeliveryDate) {
      order.tracking.estimatedDeliveryDate = estimatedDeliveryDate;
    }

    if (milestones) {
      order.tracking.milestones = { ...order.tracking.milestones, ...milestones };
    }

    if (addEvent) {
      order.tracking.events.push(addEvent);
    }

    if (typeof isActive === "boolean") {
      order.isActive = isActive;
    }

    if (typeof notes === "string") {
      order.notes = notes;
    }

    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      data: order.toObject(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order status" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const { id } = params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid order id" }, { status: 400 });
    }

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete order" },
      { status: 500 }
    );
  }
}


