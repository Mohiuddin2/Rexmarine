import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  const locations = [
    {
      name: "St. Lucia",
      hours: [
        "Monday - Friday: 8:30 am - 5:00 pm",
        "Saturday: 9:00 am - 1:00 pm",
        "Sunday: Open Peak Season Only",
      ],
    },
    {
      name: "Cayman Islands",
      hours: [
        "Monday - Friday: 12:00 pm - 6:00 pm",
        "Saturday: 9:00 am - 2:00 pm",
        "Sunday: Closed",
      ],
    },
    {
      name: "Dominica",
      hours: [
        "Monday - Friday: 9:00 am - 4:00 pm",
        "Saturday: 9:00 am - 2:00 pm",
        "Sunday: Closed",
      ],
    },
    {
      name: "St. Thomas",
      hours: [
        "Monday - Friday: 12:00 pm - 7:00 pm",
        "Saturday: 9:00 am - 6:00 pm",
        "Sunday: Appointments Only",
      ],
    },
    {
      name: "Island Park, NY",
      hours: [
        "Monday - Friday: 9:30 am - 6:00 pm",
        "Saturday: 9:00 am - 12:30 pm",
        "Sunday: Appointments Only",
      ],
    },
    {
      name: "Trinidad",
      hours: [
        "Monday - Friday: 9:00 am - 5:00 pm",
        "Saturday: 10:00 am - 1:00 pm",
        "Sunday: Open Peak Season Only",
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

      <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 leading-none">
        OFFICE
        <br />
        <span className="text-white/20">HOURS</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card
            key={location.name}
            className="bg-[#0B192C] border-2 border-white/10 hover:border-[#3a67e2]/50 transition-all duration-500"
          >
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#3a67e2]" />
                {location.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {location.hours.map((hour, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>{hour}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#0B192C] border-2 border-[#3a67e2]/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Phone className="w-8 h-8 text-[#3a67e2]" />
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">CALL FOR A QUOTE</div>
                <div className="text-2xl font-black text-white">(954) 397-3560</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B192C] border-2 border-[#3a67e2]/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="w-8 h-8 text-[#3a67e2]" />
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">EMAIL US</div>
                <div className="text-lg font-bold text-white">customercare@rexmarine.com</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B192C] border-2 border-[#3a67e2]/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="w-8 h-8 text-[#3a67e2]" />
              <div>
                <div className="text-xs text-gray-500 font-mono mb-1">ADDRESS</div>
                <div className="text-sm font-semibold text-white">501 Santa Martin, FL 33404-6902</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

