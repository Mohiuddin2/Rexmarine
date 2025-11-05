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
      className="relative min-h-screen flex items-center overflow-hidden bg-gray-900"
      style={{
        backgroundImage: "url('/images/ship5.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#111827",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(132, 204, 22, 0.2), transparent 80%)`,
        }}
      />

      {/* Dark overlay to improve contrast between background image and content */}
      <div className="absolute inset-0 bg-gray-900/70" />

      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-bl from-lime-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[60%] bg-gradient-to-tr from-lime-400/10 to-transparent" />

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
                <div className="h-px w-16 bg-gradient-to-r from-lime-500 to-transparent" />
                <span className="text-lime-400 text-sm font-mono uppercase tracking-widest">
                  Est.. 2025
                </span>
              </div>

              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none">
                <span className="text-white">SHIP</span>
                <br />
                <span className="text-lime-400 italic">ANYTHING</span>
                <br />
                <span className="text-gray-300">ANYWHERE</span>
              </h1>

              <p className="text-2xl text-gray-200 max-w-xl font-light leading-relaxed">
                Caribbean&apos;s most audacious cargo service. Fast, fearless,
                and ridiculously reliable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-lime-500 hover:bg-lime-600 text-white text-lg px-8 py-7 h-auto font-bold rounded-none group"
                >
                  START SHIPPING
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-black hover:bg-white hover:text-gray-900 text-lg px-8 py-7 h-auto font-bold rounded-none"
                >
                  TRACK ORDER
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                {[
                  { num: "50K+", label: "SHIPMENTS" },
                  { num: "12", label: "ISLANDS" },
                  { num: "2-5", label: "DAYS AVG" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-black text-lime-400">
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
                  className="w-full h-full text-lime-500/10"
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
                      className="w-48 h-48 text-lime-600"
                      strokeWidth={1}
                    />
                  </motion.div>

                  <div className="absolute -bottom-20 -left-20 bg-white border-2 border-lime-500 p-6 rotate-3 shadow-lg">
                    <div className="text-xs text-gray-500 font-mono mb-1">
                      JAMAICA
                    </div>
                    <div className="text-2xl font-black text-gray-900">
                      IN TRANSIT
                    </div>
                  </div>

                  <div className="absolute -top-10 -right-20 bg-white border-2 border-lime-600 p-6 -rotate-6 shadow-lg">
                    <div className="text-xs text-gray-500 font-mono mb-1">
                      TRINIDAD
                    </div>
                    <div className="text-2xl font-black text-gray-900">
                      DELIVERED
                    </div>
                  </div>

                  <div className="absolute bottom-10 right-0 bg-lime-500 p-4 rotate-12 shadow-lg">
                    <div className="text-xs text-white font-mono mb-1">
                      THIS WEEK
                    </div>
                    <div className="text-3xl font-black text-white">124</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />
    </section>
  );
}
