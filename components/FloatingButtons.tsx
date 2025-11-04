"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Package, MessageCircle, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4 }}
      className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
    >
      <Button
        size="lg"
        className="w-16 h-16 bg-[#3a67e2] hover:bg-[#3a67e2]/90 text-black shadow-2xl hover:scale-110 transition-transform border-0 rounded-none group p-0"
        title="Track Shipment"
      >
        <Package className="h-7 w-7 group-hover:scale-110 transition-transform" />
      </Button>

      <Button
        size="lg"
        className="w-16 h-16 bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-2xl hover:scale-110 transition-transform border-0 rounded-none group p-0"
        title="WhatsApp"
      >
        <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      </Button>

      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <Button
              size="lg"
              onClick={scrollToTop}
              className="w-16 h-16 bg-white hover:bg-gray-100 text-black shadow-2xl hover:scale-110 transition-all border-2 border-black rounded-none group p-0"
              title="Scroll to Top"
            >
              <ChevronUp className="h-7 w-7 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
