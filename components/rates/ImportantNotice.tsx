import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function ImportantNotice() {
  return (
    <Card className="bg-gray-100 mb-8 border border-lime-500">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-[#3a67e2] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-black mb-2">Important Notice: Updates to Our Shipping Rates</h3>
            <p className="text-sm text-gray-300 mb-3">
              <span className="font-semibold text-black">PRICE LIST FOR 2025 UNTIL FURTHER NOTICE</span>
            </p>
            <p className="text-sm text-gray-600">
              Prices may vary based on route, season, and specific requirements. For the most accurate quote, please contact our team.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

