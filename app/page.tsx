import CTASection from "@/components/CTASection";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseSection from "@/components/WhyChooseSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
