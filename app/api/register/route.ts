import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";
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

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const exists = await users.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);
    const now = new Date();
    const { insertedId } = await users.insertOne({
      email,
      password: passwordHash,
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
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ id: String(insertedId) }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


