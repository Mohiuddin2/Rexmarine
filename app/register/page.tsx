"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Min 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Use upper, lower, number and symbol"
    ),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  title: z.string().optional(),
  department: z.string().optional(),
  primaryPhone: z.string().min(5, "Enter a phone number"),
  partnerId: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{9}$/.test(v), {
      message: "Must be 9 digits",
    }),
  companyName: z.string().optional(),
  streetAddress: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().min(1, "Select a country"),
  truckNumber: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Registration failed");
        return;
      }
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f7fb] p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-center text-lg font-semibold mb-4">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <Label htmlFor="firstName">First name *</Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last name *</Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input id="department" {...register("department")} />
          </div>
          <div>
            <Label htmlFor="primaryPhone">Primary phone *</Label>
            <Input id="primaryPhone" {...register("primaryPhone")} />
            {errors.primaryPhone && (
              <p className="text-red-600 text-sm">{errors.primaryPhone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="partnerId">Partner ID (9 digits)</Label>
            <Input id="partnerId" {...register("partnerId")} />
            {errors.partnerId && <p className="text-red-600 text-sm">{errors.partnerId.message}</p>}
          </div>
          <div>
            <Label htmlFor="companyName">Company Name (as on BOL)</Label>
            <Input id="companyName" {...register("companyName")} />
          </div>
          <div>
            <Label htmlFor="streetAddress">Street address *</Label>
            <Input id="streetAddress" {...register("streetAddress")} />
            {errors.streetAddress && (
              <p className="text-red-600 text-sm">{errors.streetAddress.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="city">City *</Label>
            <Input id="city" {...register("city")} />
            {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" {...register("state")} />
          </div>
          <div>
            <Label htmlFor="zipCode">Zip code</Label>
            <Input id="zipCode" {...register("zipCode")} />
          </div>
          <div>
            <Label htmlFor="country">Country *</Label>
            <Input id="country" placeholder="--Select Country--" {...register("country")} />
            {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
          </div>
          <div>
            <Label htmlFor="truckNumber">Truck # (Doc Transfer)</Label>
            <Input id="truckNumber" {...register("truckNumber")} />
          </div>

          <Button type="submit" className="w-full bg-[#0071bc] hover:bg-[#0062a4]" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <p className="text-[11px] text-gray-500 text-center">Cookies are required</p>
        </form>
      </div>
    </main>
  );
}


