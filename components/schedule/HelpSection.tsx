import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HelpSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <Card className="bg-[#E9F5FF] border-2 border-[#3a67e2]/20 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-[#0B192C]">Need Assistance?</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-700">
          <p className="mb-2">We're here to help with routes, schedules, and bookings.</p>
          <ul className="text-sm space-y-1">
            <li>
              <span className="text-[#0B192C] font-semibold">Call:</span> +14078666667
            </li>
        
            <li>
              <span className="text-[#0B192C] font-semibold">Email:</span> customercare@rexmarine.com
            </li>
            <li>
              <span className="text-[#0B192C] font-semibold">Address:</span> Saint Martin
            </li>
          </ul>
        </CardContent>                   
      </Card>
    </div>
  );
}




