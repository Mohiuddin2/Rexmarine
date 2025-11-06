import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  const locations = [
    {
      name: "Miami, Florida, Saint Martin",
      hours: [
        "Monday - Sunday: 9:00 am - 10:00 pm",
      ],
    },
   
  ];

  return (
    <div className="mt-16">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-[#3a67e2] to-transparent" />
        <span className="text-[#3a67e2] text-xs font-mono uppercase tracking-widest">
          Contact
        </span>
      </div>

      <h2 className="text-4xl lg:text-5xl font-black text-lime-500 mb-8 leading-none">
        OFFICE
        <br />
        <span className="text-slate-400">HOURS</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card
            key={location.name}
            className="bg-[#E9F5FF] border-2 border-[#3a67e2]/20 hover:border-[#3a67e2]/40 transition-all border border-lime-500 duration-500"
          >
            <CardHeader>
              <CardTitle className="text-[#0B192C] text-xl flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#3a67e2]" />
                {location.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {location.hours.map((hour, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span>{hour}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#E9F5FF] border-2 border-[#3a67e2]/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Phone className="w-8 h-8 text-[#3a67e2]" />
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">CALL FOR A QUOTE</div>
                <div className="text-2xl font-black text-[#0B192C]">+14078666667</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#E9F5FF] border-2 border-[#3a67e2]/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="w-8 h-8 text-[#3a67e2]" />
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">EMAIL US</div>
                <div className="text-lg font-bold text-[#0B192C]">customercare@rexmarine.com</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#E9F5FF] border-2 border-[#3a67e2]/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="w-8 h-8 text-[#3a67e2]" />
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">ADDRESS</div>
                <div className="text-sm font-semibold text-[#0B192C]">Saint Martin</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

