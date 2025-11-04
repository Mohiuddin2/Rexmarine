"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      num: "01",
      title: "REQUEST",
      desc: "Fill form. Get quote. In seconds.",
    },
    {
      num: "02",
      title: "PACK",
      desc: "Drop off or we pick up. Your call.",
    },
    {
      num: "03",
      title: "SHIP",
      desc: "We handle everything. You chill.",
    },
    {
      num: "04",
      title: "RECEIVE",
      desc: "Track live. Delivered safe. Always.",
    },
  ];

  return (
    <section
      id="process"
      ref={ref}
      className="py-32 bg-gray-50 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-1 h-1/2 bg-gradient-to-b from-lime-500 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="grid lg:grid-cols-12 gap-16"
        >
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-lime-500 to-transparent" />
              <span className="text-lime-600 text-xs font-mono uppercase tracking-widest">
                Process
              </span>
            </div>

            <h2 className="text-6xl md:text-7xl font-black text-gray-900 leading-none mb-8">
              HOW IT
              <br />
              <span className="text-gray-400">WORKS</span>
            </h2>

            <p className="text-xl text-gray-600 font-light mb-12">
              Four steps. Zero stress. Maximum results. That&apos;s the
              REXMARINE way.
            </p>

            <div className="border-2 border-lime-500 p-8 bg-white shadow-lg">
              <div className="text-xs text-gray-500 font-mono mb-2">
                AVERAGE TIME
              </div>
              <div className="text-5xl font-black text-lime-600">2-5 DAYS</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="border-2 border-gray-200 hover:border-lime-400 transition-all duration-500 p-8 bg-white shadow-lg hover:shadow-xl">
                  <div className="flex items-start gap-8">
                    <div className="text-7xl font-black text-gray-300 group-hover:text-lime-400 transition-colors duration-500 leading-none">
                      {step.num}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-3xl font-black text-gray-900 mb-3 leading-none">
                        {step.title}
                      </h3>
                      <p className="text-lg text-gray-600 font-light">
                        {step.desc}
                      </p>
                    </div>

                    <div className="hidden md:block w-12 h-12 border-2 border-gray-200 group-hover:border-lime-500 group-hover:rotate-45 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-l from-lime-500 to-transparent" />
    </section>
  );
}
