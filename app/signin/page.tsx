"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Ship, Anchor } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

const SignInForm = () => {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    console.log("Submitting", values);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      console.log("Response", res);

      if (res.ok) {
        router.push(callbackUrl);
        return;
      }
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-blue-900/85" />
      </div>

      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 animate-fade-in">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                <div className="relative bg-gradient-to-br from-blue-400 to-cyan-500 p-4 rounded-2xl shadow-lg">
                  <Ship className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                Cargo Management
              </h1>
              <p className="text-blue-200/80 text-sm font-medium">
                Streamline your shipping operations
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-white/90 text-sm font-medium"
                >
                  Email Address
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
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
                  Password
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="w-5 h-5 text-blue-300/70 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 rounded-xl"
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-300 rounded-full" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mt-6"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Anchor className="w-4 h-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-sm text-blue-200/70">
                Need assistance?{" "}
                <button className="text-blue-300 font-semibold hover:text-white transition-colors duration-200 underline-offset-4 hover:underline">
                  Contact Support
                </button>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/40 text-xs">
              Secure login powered by advanced encryption
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </main>
  );
};

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading sign-in form...</div>}>
      <SignInForm />
    </Suspense>
  );
}
