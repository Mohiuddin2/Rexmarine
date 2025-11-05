import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HelpSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <Card className="bg-[#0B192C] border-2 border-white/10 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-white">Need Assistance?</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p className="mb-2">We're here to help with routes, schedules, and bookings.</p>
          <ul className="text-sm space-y-1">
            <li>
              <span className="text-white font-semibold">Call:</span> 800 123456(8767)
            </li>
            <li>
              <span className="text-white font-semibold">Phone:</span> (561) 12345
            </li>
            <li>
              <span className="text-white font-semibold">Email:</span> customercare@rexmarine.com
            </li>
            <li>
              <span className="text-white font-semibold">Address:</span> Saint Martin
            </li>
          </ul>
        </CardContent>                   
      </Card>

      <Card className="bg-[#0B192C] border-2 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 text-sm space-y-2">
          <a className="block hover:text-white transition-colors" href="#">Services</a>
          <a className="block hover:text-white transition-colors" href="#">Locations</a>
          <a className="block hover:text-white transition-colors" href="#">Equipment</a>
          <a className="block hover:text-white transition-colors" href="#">Vessels</a>
        </CardContent>
      </Card>
    </div>
  );
}




