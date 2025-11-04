import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { z } from "zod";

// Fields inspired by Tropical registration form
const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  title: z.string().optional().default(""),
  department: z.string().optional().default(""),
  primaryPhone: z.string().min(5),
  partnerId: z.string().optional().refine((v) => !v || /^\d{9}$/.test(v), {
    message: "Partner ID must be 9 digits",
  }),
  companyName: z.string().optional().default(""),
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  state: z.string().optional().default(""),
  zipCode: z.string().optional().default(""),
  country: z.string().min(1),
  truckNumber: z.string().optional().default(""),
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      email,
      password,
      firstName,
      lastName,
      title,
      department,
      primaryPhone,
      partnerId,
      companyName,
      streetAddress,
      city,
      state,
      zipCode,
      country,
      truckNumber,
    } = parsed.data;

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const user = new User({
      email,
      password, // will be hashed by pre-save hook
      name: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      phone: primaryPhone,
      address: {
        street: streetAddress,
        city,
        state,
        zipCode,
        country,
      },
      company: {
        name: companyName,
        title,
        department,
        partnerId,
        truckNumber,
      },
    });

    await user.save();

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


