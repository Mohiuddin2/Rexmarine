import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Quote from "@/models/Quote";
import { z } from "zod";

const quoteSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  locationType: z.enum(["Business", "Residence"], {
    errorMap: () => ({ message: "Please select a location type" }),
  }),
  services: z.array(z.string()).default([]),
  additionalDetails: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      locationType,
      services,
      additionalDetails,
    } = parsed.data;

    const quote = new Quote({
      firstName,
      lastName,
      email,
      phone,
      locationType,
      services,
      additionalDetails,
    });

    await quote.save();

    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully",
        id: quote.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting quote:", error);
    return NextResponse.json(
      { error: "Server error", message: "Failed to submit quote request" },
      { status: 500 }
    );
  }
}

