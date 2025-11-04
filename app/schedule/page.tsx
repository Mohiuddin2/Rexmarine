"use client";

import { useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs, PageHeader } from "@/components/schedule/Breadcrumbs";
import { ScheduleFilters } from "@/components/schedule/ScheduleFilters";
import { SailingsTable } from "@/components/schedule/SailingsTable";
import { HelpSection } from "@/components/schedule/HelpSection";
import { MOCK_SAILINGS } from "@/components/schedule/mockData";
import type { Sailing } from "@/components/schedule/types";

export default function SchedulePage() {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const results = useMemo(() => {
    return MOCK_SAILINGS.filter((sailing) => {
      const matchesOrigin = origin ? sailing.departurePort.toLowerCase().includes(origin.toLowerCase()) : true;
      const matchesDestination = destination ? sailing.arrivalPort.toLowerCase().includes(destination.toLowerCase()) : true;
      const matchesDate = date ? sailing.departureDate.slice(0, 10) === date : true;
      return matchesOrigin && matchesDestination && matchesDate;
    });
  }, [origin, destination, date]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <Breadcrumbs />
        <PageHeader />

        <ScheduleFilters
          origin={origin}
          destination={destination}
          date={date}
          setOrigin={setOrigin}
          setDestination={setDestination}
          setDate={setDate}
        />

        <div className="my-8">
          <Separator className="bg-white/10" />
        </div>

        <SailingsTable sailings={results as Sailing[]} />

        <HelpSection />
      </section>
    </main>
  );
}


