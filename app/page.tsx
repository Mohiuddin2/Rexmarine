import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
    </main>
  );
}
