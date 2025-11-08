import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";

type ParamsPromise = Promise<{ customerId: string }>;

export async function GET(req: Request, context: { params: ParamsPromise }) {
  try {
    await connectToDatabase();

    const { customerId } = await context.params;
    if (!Types.ObjectId.isValid(customerId)) {
      return NextResponse.json({ success: false, message: "Invalid customer id" }, { status: 400 });
    }

    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit");
    const pageParam = url.searchParams.get("page");

    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 100) : 20;
    const page = pageParam ? Math.max(parseInt(pageParam, 10) || 1, 1) : 1;
    const skip = (page - 1) * limit;

    const filters: Record<string, unknown> = { customerId: new Types.ObjectId(customerId) };

    const status = url.searchParams.get("status");
    if (status) {
      filters.status = status;
    }

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
    console.error("Error fetching customer orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch customer orders" },
      { status: 500 }
    );
  }
}


