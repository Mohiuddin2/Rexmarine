import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HelpSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <Card className="bg-neutral-900 border-white/10 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-white">Need Assistance?</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p className="mb-2">We're here to help with routes, schedules, and bookings.</p>
          <ul className="text-sm space-y-1">
            <li>
              <span className="text-white font-semibold">Call:</span> 800.638.TROP(8767)
            </li>
            <li>
              <span className="text-white font-semibold">Phone:</span> (561) 881-3999
            </li>
            <li>
              <span className="text-white font-semibold">Email:</span> customercare@tropical.com
            </li>
            <li>
              <span className="text-white font-semibold">Address:</span> 501 Avenue P, Riviera Beach, FL 33404-6902
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 text-sm space-y-2">
          <a className="block hover:text-white" href="#">Services</a>
          <a className="block hover:text-white" href="#">Locations</a>
          <a className="block hover:text-white" href="#">Equipment</a>
          <a className="block hover:text-white" href="#">Vessels</a>
        </CardContent>
      </Card>
    </div>
  );
}



