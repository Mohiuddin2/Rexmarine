"use client";

import { Breadcrumbs, PageHeader } from "@/components/contact/Breadcrumbs";
import { ContactSection } from "@/components/contact/ContactSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <section className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <Breadcrumbs />
        <PageHeader />
        
        <ContactSection />
      </section>
    </main>
  );
}

