"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-lime-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-12">
            READY?
          </h2>

          <p className="text-2xl text-white/90 font-light mb-16 max-w-2xl mx-auto">
            Let&apos;s move your cargo. Fast. Safe. No BS.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-gray-900 text-xl px-12 py-8 h-auto font-black rounded-none group"
            >
              GET FREE QUOTE
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-4 border-white text-white hover:bg-white hover:text-gray-900 text-xl px-12 py-8 h-auto font-black rounded-none"
            >
              CALL NOW
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 max-w-4xl mx-auto">
            {[
              { label: "24/7 SUPPORT", value: "ALWAYS ON" },
              { label: "INSTANT QUOTES", value: "30 SECONDS" },
              { label: "FREE INSURANCE", value: "INCLUDED" },
            ].map((item) => (
              <div key={item.label} className="bg-white p-8 shadow-lg">
                <div className="text-xs text-gray-500 font-mono mb-2">
                  {item.label}
                </div>
                <div className="text-2xl font-black text-gray-900">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
