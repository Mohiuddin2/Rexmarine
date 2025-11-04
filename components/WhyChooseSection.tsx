"use client";

import { Clock, DollarSign, Shield, Globe } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Express shipping options available for urgent deliveries",
    },
    {
      icon: DollarSign,
      title: "Affordable Rates",
      description: "Competitive pricing with no hidden fees",
    },
    {
      icon: Shield,
      title: "Safe Handling",
      description: "Your cargo is insured and handled with expert care",
    },
    {
      icon: Globe,
      title: "Island-wide Coverage",
      description: "We deliver to all major Caribbean islands",
    },
  ];

  const stats = [
    { label: "Years in Business", value: 15, suffix: "+" },
    { label: "Shipments Delivered", value: 50000, suffix: "+" },
    { label: "Happy Customers", value: 10000, suffix: "+" },
    { label: "Islands Served", value: 12, suffix: "" },
  ];

  return (
    <section
      id="why-choose"
      ref={ref}
      className="py-24 bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              REXMARINE Cargo
            </span>
          </h2>
          <p className="text-lg text-cyan-100">
            Trusted by thousands of families connecting across the ocean
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl">
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-cyan-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              delay={index * 0.1}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatCounter({
  label,
  value,
  suffix,
  delay,
  isInView,
}: {
  label: string;
  value: number;
  suffix: string;
  delay: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-cyan-200 font-medium">{label}</div>
    </motion.div>
  );
}
