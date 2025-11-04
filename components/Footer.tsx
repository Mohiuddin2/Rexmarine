"use client";

import { Ship, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const links = {
    services: ["BARRELS", "AIR RUSH", "OCEAN", "DOOR 2 DOOR"],
    company: ["ABOUT", "PROCESS", "PROOF", "CONTACT"],
    islands: [
      "JAMAICA",
      "TRINIDAD",
      "BARBADOS",
      "GRENADA",
      "ST. LUCIA",
      "GUYANA",
    ],
  };

  return (
    <footer
      id="contact"
      className="bg-gray-900 border-t-4 border-lime-500 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-lime-500 flex items-center justify-center">
                <Ship className="h-6 w-6 text-white rotate-45" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                REXMARINE
              </span>
            </div>

            <p className="text-gray-300 font-light mb-8">
              Caribbean&apos;s boldest cargo service since 2008.
            </p>

            <div className="space-y-4">
              <a
                href="tel:+13055550100"
                className="flex items-center gap-3 text-gray-300 hover:text-lime-400 transition-colors group"
              >
                <Phone className="h-5 w-5" />
                <span className="font-mono text-sm">+1 305 555 0100</span>
              </a>
              <a
                href="mailto:ship@rexmarine.com"
                className="flex items-center gap-3 text-gray-300 hover:text-lime-400 transition-colors group"
              >
                <Mail className="h-5 w-5" />
                <span className="font-mono text-sm">SHIP@REXMARINE.COM</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-5 w-5 mt-1" />
                <span className="font-mono text-sm">
                  123 OCEAN DRIVE
                  <br />
                  MIAMI FL 33139
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-sm tracking-widest">
              SERVICES
            </h3>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-lime-400 transition-colors font-mono text-xs"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-sm tracking-widest">
              COMPANY
            </h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-lime-400 transition-colors font-mono text-xs"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-sm tracking-widest">
              ISLANDS
            </h3>
            <div className="flex flex-wrap gap-2">
              {links.islands.map((island) => (
                <span
                  key={island}
                  className="px-3 py-1 text-xs bg-lime-500/10 border border-lime-500/20 text-gray-300 hover:text-lime-400 hover:border-lime-400/40 transition-all cursor-pointer font-mono"
                >
                  {island}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-xs font-mono">
              © 2025 REXMARINE. ALL RIGHTS RESERVED.
            </p>

            <div className="flex gap-8 text-xs font-mono">
              <a
                href="#"
                className="text-gray-400 hover:text-lime-400 transition-colors"
              >
                PRIVACY
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-lime-400 transition-colors"
              >
                TERMS
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
