"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "MARCUS T.",
      location: "KINGSTON",
      text: "Five years. Zero issues. That's all you need to know.",
      rating: "10/10",
    },
    {
      name: "ANEESA M.",
      location: "PORT OF SPAIN",
      text: "Best decision I ever made. Fast, reliable, honest.",
      rating: "10/10",
    },
    {
      name: "DAVID C.",
      location: "BRIDGETOWN",
      text: "Shipped everything. Furniture, electronics, you name it. Perfect every time.",
      rating: "10/10",
    },
  ];

  return (
    <section
      id="stories"
      ref={ref}
      className="py-32 bg-gray-50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-lime-500" />
            <span className="text-lime-600 text-xs font-mono uppercase tracking-widest">
              Proof
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-lime-500" />
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-none mb-6">
            DON&apos;T TAKE
            <br />
            <span className="text-gray-400">OUR WORD</span>
          </h2>

          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Real people. Real shipments. Real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="h-full border-2 border-gray-200 hover:border-lime-400 transition-all duration-500 p-8 bg-white shadow-lg hover:shadow-xl">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="text-2xl font-black text-gray-900 mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {testimonial.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono mb-1">
                      RATING
                    </div>
                    <div className="text-2xl font-black text-lime-600">
                      {testimonial.rating}
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  {`"${testimonial.text}"`}
                </p>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                    VERIFIED CUSTOMER
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block border-2 border-lime-500 bg-white px-12 py-6 shadow-lg">
            <div className="text-xs text-gray-500 font-mono mb-2">
              TOTAL REVIEWS
            </div>
            <div className="text-5xl font-black text-lime-600">10,000+</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500" />
    </section>
  );
}
