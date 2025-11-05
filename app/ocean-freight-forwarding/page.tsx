"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ship, ShieldCheck, CheckCircle2, Phone } from "lucide-react";

export default function OceanFreightForwardingPage() {
  const whyItems = [
    "Shipping as low as $10 USD",
    "Weekly shipping to the Caribbean",
    "No hidden fees",
    "Clearing costs included",
    "Hazardous and oversized freight",
    "RO/RO and breakbulk",
  ];

  return (
    <main className="min-h-screen bg-white text-foreground">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/quteship.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-[#3a67e2] to-transparent" />
              <span className="text-[#3a67e2] text-xs font-mono uppercase tracking-widest">Ocean Freight</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">Turnkey Ocean Freight Shipping</h1>
            <p className="text-lg md:text-xl text-gray-200 mt-4">
              FCL/LCL weekly sailings to the Caribbean, Gulf Coast countries, and Central America.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/get-a-quote">
                <Button className="bg-[#3a67e2] hover:bg-[#3a67e2]/90 text-black font-bold rounded-none px-8">Get a Quote</Button>
              </Link>
              <a href="tel:+14078666667">
                <Button variant="outline" className="border-2 border-white text-black hover:bg-white/90 hover:text-black font-bold rounded-none px-8">+14078666667</Button>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      <section className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="opacity-50">/</li>
            <li className="text-gray-200">Ocean Freight Shipping</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-[#3a67e2] to-transparent" />
            <span className="text-[#3a67e2] text-xs font-mono uppercase tracking-widest">
              Ocean Freight Shipping
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Reliable Ocean Shipping</h1>
          <p className="text-gray-400 mt-2 max-w-3xl">
            Turnkey ocean freight solutions for FCL and LCL. Weekly sailings to the
            Caribbean, Gulf Coast countries, and Central America.
          </p>
        </div>

        {/* Intro / CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-[#E9F5FF] border-2 border-[#3a67e2]/20 transition-colors lg:col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Ship className="w-10 h-10 text-[#3a67e2] flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold mb-2 text-[#0B192C]">Ocean freight forwarding</h2>
                  <p className="text-slate-700">
                    If it fits in a container, we can ship it. Full Container Load (FCL) or
                    Less than Container Load (LCL) — we accommodate any size load with fast,
                    cost-effective weekly schedules.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#E9F5FF] border-2 border-[#3a67e2]/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 font-mono mb-1">Get a Quote</div>
                  <div className="text-2xl font-black text-[#0B192C]">+14078666667</div>
                </div>
                <Phone className="w-8 h-8 text-[#3a67e2]" />
              </div>
              <div className="mt-4 flex gap-3">
                <Link href="/get-a-quote">
                  <Button className="bg-[#3a67e2] hover:bg-[#3a67e2]/90 text-black font-bold rounded-none">Get a Quote</Button>
                </Link>
                <Link href="/rates">
                  <Button variant="outline" className="border-2 border-white text-black hover:bg-white/90 hover:text-black font-bold rounded-none">View Rates</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Heavy Lifting */}
        <Card className="bg-[#E9F5FF] border-2 border-[#3a67e2]/20 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-[#3a67e2] flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-[#0B192C] mb-2">Let us handle the heavy lifting</h3>
                <p className="text-slate-700">
                  Years of experience with international shipping and high-volume handling
                  ensures proper safety measures and regulatory compliance. We negotiate
                  the best rates with carriers and local agencies — and pass the savings to you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Peace of Mind */}
        <Card className="bg-[#E9F5FF] border-2 border-[#3a67e2]/20 mb-10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#3a67e2] flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-[#0B192C] mb-2">Peace of Mind</h3>
                <p className="text-slate-700">
                  Track your shipments easily with connected systems. Our long-term
                  relationships with local agents and government agencies keep your cargo
                  moving safely and in accordance with local regulations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Ship With Us */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-[#3a67e2] to-transparent" />
            <span className="text-[#3a67e2] text-xs font-mono uppercase tracking-widest">
              Why ship with REX MARINE?
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyItems.map((text) => (
              <Card key={text} className="bg-[#E9F5FF] border-2 border-[#3a67e2]/20">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3a67e2]" />
                    <span className="text-slate-800">{text}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-[#E9F5FF] to-[#DFF0FF] border-2 border-[#3a67e2]/30">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-gray-500 font-mono mb-2">WEEKLY SAILINGS</div>
                <div className="text-2xl font-black">Ship FCL/LCL to the Caribbean with confidence</div>
              </div>
              <div className="flex gap-3">
                <Link href="/contact">
                  <Button className="bg-[#3a67e2] hover:bg-[#3a67e2]/90 text-black font-bold rounded-none">Get a Quote</Button>
                </Link>
                <a href="tel:+14078666667">
                  <Button variant="outline" className="border-2 border-white text-black hover:bg-white/90 hover:text-black font-bold rounded-none">+14078666667</Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}


