"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Anchor, Waves } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]"
      style={{
        backgroundImage: "url('/images/ship.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0A0A0A",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 0, 0.15), transparent 80%)`,
        }}
      />

      {/* Dark overlay to improve contrast between background image and content */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-bl from-[#3a67e2]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[60%] bg-gradient-to-tr from-[#00D9FF]/10 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-[#3a67e2] to-transparent" />
                <span className="text-[#3a67e2] text-sm font-mono uppercase tracking-widest">
                  Est.. 2025
                </span>
              </div>

              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none">
                <span className="text-white">SHIP</span>
                <br />
                <span className="text-[#3a67e2] italic">ANYTHING</span>
                <br />
                <span className="text-white/70">ANYWHERE</span>
              </h1>

              <p className="text-2xl text-gray-200 max-w-xl font-light leading-relaxed">
                Caribbean&apos;s most audacious cargo service. Fast, fearless,
                and ridiculously reliable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-[#3a67e2] hover:bg-[#3a67e2]/90 text-black text-lg px-8 py-7 h-auto font-bold rounded-none group"
                >
                  START SHIPPING
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-black hover:bg-white/90 hover:text-black text-lg px-8 py-7 h-auto font-bold rounded-none"
                >
                  TRACK ORDER
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                {[
                  { num: "50K+", label: "SHIPMENTS" },
                  { num: "12", label: "ISLANDS" },
                  { num: "2-5", label: "DAYS AVG" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-black text-[#3a67e2]">
                      {stat.num}
                    </div>
                    <div className="text-xs text-gray-300 font-mono mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-square">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                <Waves
                  className="w-full h-full text-[#3a67e2]/5"
                  strokeWidth={0.5}
                />
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    animate={{
                      y: [-20, 20],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <Anchor
                      className="w-48 h-48 text-[#3a67e2]"
                      strokeWidth={1}
                    />
                  </motion.div>

                  <div className="absolute -bottom-20 -left-20 bg-black border-2 border-[#00D9FF] p-6 rotate-3">
                    <div className="text-xs text-gray-500 font-mono mb-1">
                      JAMAICA
                    </div>
                    <div className="text-2xl font-black text-white">
                      IN TRANSIT
                    </div>
                  </div>

                  <div className="absolute -top-10 -right-20 bg-black border-2 border-[#3a67e2] p-6 -rotate-6">
                    <div className="text-xs text-gray-500 font-mono mb-1">
                      TRINIDAD
                    </div>
                    <div className="text-2xl font-black text-white">
                      DELIVERED
                    </div>
                  </div>

                  <div className="absolute bottom-10 right-0 bg-[#3a67e2] p-4 rotate-12">
                    <div className="text-xs text-black font-mono mb-1">
                      THIS WEEK
                    </div>
                    <div className="text-3xl font-black text-black">124</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
