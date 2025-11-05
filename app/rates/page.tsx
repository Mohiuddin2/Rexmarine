"use client";

import { Breadcrumbs, PageHeader } from "@/components/rates/Breadcrumbs";
import { ImportantNotice } from "@/components/rates/ImportantNotice";
import { SeaFreightRates } from "@/components/rates/SeaFreightRates";

export default function RatesPage() {
  return (
    <main className="min-h-screen bg-[#0B192C] text-white">
      <section className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <Breadcrumbs />
        <PageHeader />

        <ImportantNotice />

        <div className="my-12">
          <SeaFreightRates />
        </div>

        {/* Air freight not offered */}
      </section>
    </main>
  );
}

