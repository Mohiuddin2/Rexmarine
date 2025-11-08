import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";

/**
 * Next.js defers resolving dynamic route params; this promise resolves to `{ customerId: string }`.
 */
type ParamsPromise = Promise<{ customerId: string }>;

/**
 * GET /api/orders/customer/[customerId]
 *
 * Returns a paginated list of orders for the supplied customer.
 * Query parameters:
 * - `limit` (optional number, default 20, max 100): page size.
 * - `page` (optional number, default 1): page number.
 * - `status` (optional string): filter by order status.
 *
 * Responses:
 * - 200: `{ success: true, data: Order[], pagination: { page, limit, total, totalPages } }`
 * - 400: invalid `customerId`.
 * - 500: unexpected database or server error.
 */
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

    // Enforce sane pagination defaults and bounds (1 ≤ limit ≤ 100).
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 100) : 20;
    const page = pageParam ? Math.max(parseInt(pageParam, 10) || 1, 1) : 1;
    const skip = (page - 1) * limit;

    // Base filter ensures only orders for the requested customer are returned.
    const filters: Record<string, unknown> = { customerId: new Types.ObjectId(customerId) };

    const status = url.searchParams.get("status");
    if (status) {
      filters.status = status;
    }

    // Fetch results and total count concurrently to keep the endpoint responsive.
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


