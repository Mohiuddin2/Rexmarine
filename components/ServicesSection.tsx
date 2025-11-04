"use client";

import { Package, Plane, Ship, Truck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Package,
      title: "BARRELS",
      description: "Pack it. Ship it. Forget it.",
      price: "FROM $45",
      color: "#84cc16", // lime green
    },
    // {
    //   icon: Plane,
    //   title: "AIR RUSH",
    //   description: "48hrs. Guaranteed. Or free.",
    //   price: "FROM $125",
    //   color: "#84cc16",
    // },
    {
      icon: Ship,
      title: "OCEAN",
      description: "Big stuff. Small price.",
      price: "FROM $89",
      color: "#84cc16", // lime green
    },
    {
      icon: Truck,
      title: "DOOR 2 DOOR",
      description: "Zero effort. Max results.",
      price: "FROM $99",
      color: "#84cc16", // lime green
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-1 bg-gradient-to-l from-lime-500 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-lime-500 to-transparent" />
            <span className="text-lime-600 text-xs font-mono uppercase tracking-widest">
              Services
            </span>
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-lime-600 leading-none mb-6">
            WHAT WE
            <br />
            <span className="text-gray-400">MOVE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                style={{ background: `${service.color}20` }}
              />

              <div className="relative border-2 border-gray-200 p-12 hover:border-lime-400 transition-all duration-500 bg-white shadow-lg hover:shadow-xl">
                <div className="flex items-start justify-between mb-8">
                  <service.icon
                    className="w-16 h-16 group-hover:scale-110 transition-transform duration-500"
                    style={{ color: service.color }}
                    strokeWidth={1.5}
                  />
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono mb-1">
                      STARTING
                    </div>
                    <div className="text-2xl font-black text-gray-900">
                      {service.price}
                    </div>
                  </div>
                </div>

                <h3 className="text-4xl font-black text-gray-900 mb-4 leading-none">
                  {service.title}
                </h3>

                <p className="text-lg text-gray-600 font-light mb-8">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest group-hover:gap-4 transition-all">
                  <span className="text-gray-500">LEARN MORE</span>
                  <div className="h-px w-8 bg-lime-500 group-hover:w-16 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 border-2 border-lime-500 p-8 bg-lime-50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs text-gray-500 font-mono mb-2">
                GUARANTEE
              </div>
              <div className="text-2xl font-black text-gray-900">
                100% INSURED. 100% TRACKED. 100% YOU.
              </div>
            </div>
            <Button className="bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-none px-8">
              VIEW ALL SERVICES
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-lime-500 to-transparent" />
    </section>
  );
}
