"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  MapPin,
  Truck,
  Ship,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Min 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Use upper, lower, number and symbol"
    ),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  title: z.string().optional(),
  department: z.string().optional(),
  primaryPhone: z.string().min(5, "Enter a valid phone number"),
  partnerId: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{9}$/.test(v), {
      message: "Must be 9 digits",
    }),
  companyName: z.string().optional(),
  streetAddress: z.string().min(1, "Street address required"),
  city: z.string().min(1, "City required"),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().min(1, "Country required"),
  truckNumber: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const COUNTRIES = [
  "United States",
  "Canada",
  "Mexico",
  "United Kingdom",
  "Australia",
  "Other",
];

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"personal" | "address" | "company">(
    "personal"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const currentStepFields: Record<string, (keyof FormValues)[]> = {
    personal: ["email", "password", "firstName", "lastName", "primaryPhone"],
    address: ["streetAddress", "city", "state", "zipCode", "country"],
    company: ["title", "department", "companyName", "partnerId", "truckNumber"],
  };

  const handleNextStep = async (nextStep: "address" | "company" | null) => {
    const fieldsToValidate = currentStepFields[step];
    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      toast.error("Please fix the errors before proceeding");
      return;
    }

    if (nextStep) setStep(nextStep);
  };

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
        toast.error(data.error || "Registration failed");
        return;
      }

      toast.success("Account created successfully! Redirecting...");
      setTimeout(() => router.replace("/signin"), 1500);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />

      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 animate-fade-in">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                <div className="relative bg-gradient-to-br from-blue-400 to-cyan-500 p-4 rounded-2xl shadow-lg">
                  <Ship className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                Create Account
              </h1>
              <p className="text-blue-200/80 text-sm font-medium">
                Join Cargo Management today
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      step === "personal"
                        ? "bg-blue-500 text-white"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {step === "personal" ? (
                      "1"
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    Personal
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      step === "address"
                        ? "bg-blue-500 text-white"
                        : step === "company"
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {step === "company" || step === "personal" ? "2" : "2"}
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    Address
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      step === "company"
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    Company
                  </span>
                </div>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
                  style={{
                    width:
                      step === "personal"
                        ? "33%"
                        : step === "address"
                        ? "66%"
                        : "100%",
                  }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {step === "personal" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-white/90 text-sm font-medium"
                      >
                        Email Address <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="pl-12 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-white/90 text-sm font-medium"
                      >
                        Password <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="password"
                          type="password"
                          {...register("password")}
                          className="pl-12 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                          placeholder="Min 8 chars, 1 upper, 1 lower, 1 number, 1 symbol"
                        />
                      </div>
                      {errors.password && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-white/90 text-sm font-medium"
                      >
                        First Name <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="firstName"
                          {...register("firstName")}
                          className="pl-12 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-white/90 text-sm font-medium"
                      >
                        Last Name <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="lastName"
                          {...register("lastName")}
                          className="pl-12 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                          placeholder="Doe"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="primaryPhone"
                      className="text-white/90 text-sm font-medium"
                    >
                      Primary Phone <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                      <Input
                        id="primaryPhone"
                        {...register("primaryPhone")}
                        className="pl-12 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {errors.primaryPhone && (
                      <p className="text-red-300 text-xs flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                        {errors.primaryPhone.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      className="flex-1 h-11 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 border border-white/20"
                      onClick={() => router.push("/login")}
                    >
                      Back to Login
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 h-11 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={() => handleNextStep("address")}
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}

              {step === "address" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label
                        htmlFor="streetAddress"
                        className="text-white/90 text-sm font-medium"
                      >
                        Street Address <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="streetAddress"
                          {...register("streetAddress")}
                          className="pl-12 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                          placeholder="123 Main Street"
                        />
                      </div>
                      {errors.streetAddress && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                          {errors.streetAddress.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="city"
                        className="text-white/90 text-sm font-medium"
                      >
                        City <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="city"
                        {...register("city")}
                        className="pl-4 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="state"
                        className="text-white/90 text-sm font-medium"
                      >
                        State
                      </Label>
                      <Input
                        id="state"
                        {...register("state")}
                        className="pl-4 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                        placeholder="NY"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="zipCode"
                        className="text-white/90 text-sm font-medium"
                      >
                        Zip Code
                      </Label>
                      <Input
                        id="zipCode"
                        {...register("zipCode")}
                        className="pl-4 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                        placeholder="10001"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label
                        htmlFor="country"
                        className="text-white/90 text-sm font-medium"
                      >
                        Country <span className="text-red-400">*</span>
                      </Label>
                      <select
                        {...register("country")}
                        className="w-full pl-4 h-11 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-800">
                          Select Country
                        </option>
                        {COUNTRIES.map((country) => (
                          <option
                            key={country}
                            value={country}
                            className="bg-slate-800"
                          >
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      className="flex-1 h-11 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 border border-white/20"
                      onClick={() => setStep("personal")}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 h-11 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={() => handleNextStep("company")}
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}

              {step === "company" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="title"
                        className="text-white/90 text-sm font-medium"
                      >
                        Title
                      </Label>
                      <Input
                        id="title"
                        {...register("title")}
                        className="pl-4 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                        placeholder="e.g., Manager"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="department"
                        className="text-white/90 text-sm font-medium"
                      >
                        Department
                      </Label>
                      <Input
                        id="department"
                        {...register("department")}
                        className="pl-4 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                        placeholder="e.g., Operations"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label
                        htmlFor="companyName"
                        className="text-white/90 text-sm font-medium"
                      >
                        Company Name (as on BOL)
                      </Label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="companyName"
                          {...register("companyName")}
                          className="pl-12 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                          placeholder="Your Company Name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="partnerId"
                        className="text-white/90 text-sm font-medium"
                      >
                        Partner ID (9 digits)
                      </Label>
                      <Input
                        id="partnerId"
                        {...register("partnerId")}
                        className="pl-4 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                        placeholder="123456789"
                      />
                      {errors.partnerId && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                          {errors.partnerId.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="truckNumber"
                        className="text-white/90 text-sm font-medium"
                      >
                        Truck # (Doc Transfer)
                      </Label>
                      <div className="relative group">
                        <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="truckNumber"
                          {...register("truckNumber")}
                          className="pl-12 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                          placeholder="TR-001"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      className="flex-1 h-11 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 border border-white/20"
                      onClick={() => setStep("address")}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-11 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>

                  <p className="text-[11px] text-blue-200/50 text-center pt-2">
                    Cookies are required for a secure experience
                  </p>
                </>
              )}
            </form>

            {step !== "company" && (
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-blue-200/70">
                  Already have an account?{" "}
                  <button
                    onClick={() => router.push("/login")}
                    className="text-blue-300 font-semibold hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </main>
  );
}
