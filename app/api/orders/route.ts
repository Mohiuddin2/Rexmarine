import { NextResponse } from "next/server";
import { z } from "zod";
import { Types } from "mongoose";

import connectToDatabase from "@/lib/mongoose";
import Order, { OrderStatus, PaymentStatus } from "@/models/Order";

const orderStatusEnum = z.enum([
  "pending",
  "confirmed",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);

const paymentStatusEnum = z.enum(["pending", "paid", "failed", "refunded"]);

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
  .default({});

const realTimeLocationSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  timestamp: z.coerce.date(),
  locationName: z.string().optional(),
  vessel: z.string().optional(),
  flight: z.string().optional(),
});

const trackingSchema = z
  .object({
    currentStatus: z.string().min(1),
    currentLocation: z.string().min(1),
    progressPercentage: z.coerce.number().min(0).max(100),
    estimatedDeliveryDate: z.coerce.date().optional(),
    milestones: trackingMilestonesSchema.optional(),
    events: z.array(trackingEventSchema).optional(),
    realTimeLocation: realTimeLocationSchema.optional(),
  })
  .partial()
  .default({});

const notificationsSchema = z
  .object({
    smsEnabled: z.boolean().default(false),
    emailEnabled: z.boolean().default(false),
    lastNotificationSent: z.coerce.date().optional(),
    preferences: z.array(z.string()).default([]),
  })
  .partial()
  .default({});

const deliveryRatingSchema = z.object({
  score: z.coerce.number().min(1).max(5),
  feedback: z.string().optional(),
  ratedAt: z.coerce.date(),
});

const deliverySchema = z
  .object({
    attempts: z.coerce.number().min(0).default(0),
    instructions: z.string().optional(),
    photos: z.array(z.string()).optional(),
    signature: z.string().optional(),
    deliveredBy: z.string().optional(),
    notes: z.string().optional(),
    rating: deliveryRatingSchema.optional(),
  })
  .partial();

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
});

const shipmentSchema = z.object({
  destination: z.string().min(1),
  weight: z.coerce.number().min(0),
  dimensions: z.object({
    length: z.coerce.number().min(0),
    width: z.coerce.number().min(0),
    height: z.coerce.number().min(0),
  }),
  packageDescription: z.string().optional(),
  pickupDate: z.coerce.date(),
  estimatedDeliveryDays: z.string().min(1),
  actualDeliveryDate: z.coerce.date().optional(),
});

const pricingSchema = z.object({
  baseRate: z.coerce.number().min(0),
  weightCost: z.coerce.number().min(0),
  totalAmount: z.coerce.number().min(0),
  currency: z.string().min(1),
});

const paymentSchema = z
  .object({
    status: paymentStatusEnum.default("pending"),
    method: z.string().optional(),
    transactionId: z.string().optional(),
    paidAt: z.coerce.date().optional(),
  })
  .partial()
  .default({
    status: "pending",
  });

const createOrderSchema = z.object({
  bookingNumber: z.string().min(1).optional(),
  trackingNumber: z.string().min(1).optional(),
  customerId: z
    .string()
    .trim()
    .refine((value) => Types.ObjectId.isValid(value), {
      message: "Invalid customer id",
    })
    .optional(),
  status: orderStatusEnum.optional(),
  shipment: shipmentSchema,
  sender: contactSchema,
  recipient: contactSchema,
  pricing: pricingSchema,
  tracking: trackingSchema.optional(),
  notifications: notificationsSchema.optional(),
  delivery: deliverySchema.optional(),
  payment: paymentSchema,
  notes: z.string().optional(),
  specialInstructions: z.string().optional(),
  isActive: z.boolean().optional(),
});

const buildQueryFilters = (searchParams: URLSearchParams) => {
  const filters: Record<string, unknown> = {};

  const status = searchParams.get("status");
  if (status && orderStatusEnum.safeParse(status).success) {
    filters.status = status;
  }

  const isActive = searchParams.get("isActive");
  if (isActive === "true") filters.isActive = true;
  if (isActive === "false") filters.isActive = false;

  const customerId = searchParams.get("customerId");
  if (customerId && Types.ObjectId.isValid(customerId)) {
    filters.customerId = new Types.ObjectId(customerId);
  }

  const trackingNumber = searchParams.get("trackingNumber");
  if (trackingNumber) {
    filters.trackingNumber = trackingNumber.trim();
  }

  const bookingNumber = searchParams.get("bookingNumber");
  if (bookingNumber) {
    filters.bookingNumber = bookingNumber.trim();
  }

  return filters;
};

async function generateUniqueIdentifier(field: "bookingNumber" | "trackingNumber", prefix: string) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const identifier = `${prefix}${Date.now()}${Math.floor(Math.random() * 10_000)
      .toString()
      .padStart(4, "0")}`;
    const existing = await Order.exists({ [field]: identifier });
    if (!existing) {
      return identifier;
    }
  }

  throw new Error(`Unable to generate unique ${field}`);
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");

    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 100) : 20;
    const page = pageParam ? Math.max(parseInt(pageParam, 10) || 1, 1) : 1;
    const skip = (page - 1) * limit;

    const filters = buildQueryFilters(searchParams);

    const [orders, total] = await Promise.all([
      Order.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(filters),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      bookingNumber,
      trackingNumber,
      customerId,
      status,
      shipment,
      sender,
      recipient,
      pricing,
      tracking,
      notifications,
      delivery,
      payment,
      notes,
      specialInstructions,
      isActive,
    } = parsed.data;

    const resolvedBookingNumber = bookingNumber ?? (await generateUniqueIdentifier("bookingNumber", "BK"));
    const resolvedTrackingNumber =
      trackingNumber ?? (await generateUniqueIdentifier("trackingNumber", "TR"));

    const order = await Order.create({
      customerId: customerId ? new Types.ObjectId(customerId) : undefined,
      bookingNumber: resolvedBookingNumber,
      trackingNumber: resolvedTrackingNumber,
      status: (status as OrderStatus | undefined) ?? "pending",
      shipment,
      sender,
      recipient,
      pricing,
      tracking: {
        currentStatus: tracking?.currentStatus ?? ((status as OrderStatus | undefined) ?? "pending"),
        currentLocation: tracking?.currentLocation ?? "Processing",
        progressPercentage: tracking?.progressPercentage ?? 0,
        estimatedDeliveryDate: tracking?.estimatedDeliveryDate,
        milestones: tracking?.milestones ?? {},
        events: tracking?.events ?? [],
        realTimeLocation: tracking?.realTimeLocation,
      },
      notifications: {
        smsEnabled: notifications?.smsEnabled ?? false,
        emailEnabled: notifications?.emailEnabled ?? false,
        lastNotificationSent: notifications?.lastNotificationSent,
        preferences: notifications?.preferences ?? [],
      },
      delivery,
      payment: {
        status: payment.status as PaymentStatus,
        method: payment.method,
        transactionId: payment.transactionId,
        paidAt: payment.paidAt,
      },
      notes,
      specialInstructions,
      isActive: isActive ?? true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        data: order.toObject(),
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating order:", error);

    if (error instanceof Error && /duplicate key error/.test(error.message)) {
      return NextResponse.json(
        { success: false, message: "Order with the same booking or tracking number already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}


