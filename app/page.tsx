<<<<<<< HEAD
import CTASection from "@/components/CTASection";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
=======
>>>>>>> 564aa9690fe9a45e8a41a5bdb10b1168656696d5
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
