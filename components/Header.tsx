"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Ship, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "SERVICES" },
    { name: "SHIPPING RATES", href: "/rates" },
    { name: "SCHEDULE", href: "/schedule" },
    { name: "CONTACT", href: "/contact" },
    { name: "RATES", href: "/rates" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-lime-500 flex items-center justify-center">
              <Ship className="h-5 w-5 text-white rotate-45" />
            </div>
            <Link
              href="/"
              className="text-xl font-black text-white tracking-tighter"
            >
              REX MARINE
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href ?? "#"}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`text-xs font-bold transition-colors tracking-widest ${
                  isScrolled
                    ? "text-gray-600 hover:text-lime-600"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex items-center gap-4"
          >
            <Button className="bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-none">
              GET QUOTE
            </Button>
            {!session?.user ? (
              <>
                <Link href="/signin">
                  <Button className="border-2 border-[#3a67e2] hover:bg-blue-50 transition-all duration-300 ease-in-out text-[#3a67e2] font-bold rounded-none">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="border-2 border-[#3a67e2] hover:bg-blue-50 transition-all duration-300 ease-in-out text-[#3a67e2] font-bold rounded-none">
                    Create Account
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="border-2 border-[#3a67e2] hover:bg-blue-50 transition-all duration-300 ease-in-out text-[#3a67e2] font-bold rounded-none"
              >
                Sign Out
              </Button>
            )}
          </motion.div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden transition-colors ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "300px" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href ?? "#"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-lime-600 font-bold text-sm tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <Button className="bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-none w-full">
                GET QUOTE
              </Button>
              <Button className="border-2 border-lime-500 text-lime-600 hover:bg-lime-50 font-bold rounded-none w-full">
                Create Account
              </Button>
              {!session?.user ? (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="border-2 border-[#3a67e2] text-[#3a67e2] font-bold rounded-none w-full hover:bg-blue-50">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="border-2 border-[#3a67e2] text-[#3a67e2] font-bold rounded-none w-full hover:bg-blue-50">
                      Create Account
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="border-2 border-[#3a67e2] text-[#3a67e2] font-bold rounded-none w-full hover:bg-blue-50"
                >
                  Sign Out
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
