"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function GetAQuotePage() {
  const [services, setServices] = useState<string[]>([]);
  const [locationType, setLocationType] = useState<"Business" | "Residence" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const toggleService = (value: string) => {
    setServices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const additionalDetails = formData.get("details") as string;

    // Validate location type
    if (!locationType) {
      toast({
        title: "Validation Error",
        description: "Please select a location type",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/get-a-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          locationType,
          services,
          additionalDetails,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      toast({
        title: "Success!",
        description: "Thank you! We received your request and will reach out shortly.",
      });

      // Reset form
      e.currentTarget.reset();
      setServices([]);
      setLocationType(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-foreground">
      <section className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
            </li>
            <li className="opacity-50">/</li>
            <li className="text-gray-800">Get a Quote</li>
          </ol>
        </nav>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-[#3a67e2] to-transparent" />
            <span className="text-[#3a67e2] text-xs font-mono uppercase tracking-widest">
              Get help, ask a question, request a quote
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Get a Quote</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Learn more about how REX MARINE’s services can help you. Take the first
            step and tell us what you need—shipping, packing, warehousing, or delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <Card className="lg:col-span-2 border-2 border-[#3a67e2]/20">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required placeholder="First" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required placeholder="Last" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="(###) ###-####" />
                  </div>
                </div>

                <div>
                  <Label>Location type</Label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLocationType("Business")}
                      className={`border-2 px-3 py-2 text-sm transition-colors ${
                        locationType === "Business"
                          ? "border-[#3a67e2] bg-[#3a67e2]/10 text-[#0B192C] font-semibold"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      Business
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocationType("Residence")}
                      className={`border-2 px-3 py-2 text-sm transition-colors ${
                        locationType === "Residence"
                          ? "border-[#3a67e2] bg-[#3a67e2]/10 text-[#0B192C] font-semibold"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      Residence
                    </button>
                  </div>
                </div>

                <div>
                  <Label>What service(s) are you interested in?</Label>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Shipping",
                      "Cargo Crating",
                      "Customer Service",
                      "Hazardous Cargo",
                      "Personal Shopper",
                      "Pickup and Delivery",
                      "Warehousing",
                      "Other",
                    ].map((svc) => (
                      <label key={svc} className="flex items-center gap-2 text-sm text-gray-700">
                        <Checkbox checked={services.includes(svc)} onCheckedChange={() => toggleService(svc)} />
                        <span>{svc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea id="details" name="details" rows={5} placeholder="Tell us about your shipment, size, origin/destination, and timing." />
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#3a67e2] hover:bg-[#3a67e2]/90 text-black font-bold rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                  <Link href="tel:+14078666667" className="text-sm text-[#0B192C] underline">
                    or call +14078666667
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Sidebar / Info */}
          <Card className="border-2 border-[#3a67e2]/20">
            <CardHeader>
              <CardTitle>Our Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-700">
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">ADDRESS</div>
                <div>Saint Martin</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">PHONE</div>
                <Link href="tel:+14078666667" className="font-semibold text-[#0B192C]">+14078666667</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}


