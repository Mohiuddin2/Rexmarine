import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ship } from "lucide-react";

export function SeaFreightRates() {
  const containers = [
    {
      type: "D Container",
      price: "$1,300",
      description: "Full container shipping",
    },
    {
      type: "E Container",
      price: "$899.99",
      description: "Standard container option",
    },
    {
      type: "EH Container",
      price: "$499.99",
      description: "Economy container option",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-[#3a67e2] to-transparent" />
        <span className="text-[#3a67e2] text-xs font-mono uppercase tracking-widest">
          Sea Freight
        </span>
      </div>

      <h2 className="text-4xl lg:text-5xl font-black text-dark mb-6 leading-none">
        SEA FREIGHT
        <br />
        <span className="text-lime-500">PRICES</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {containers.map((container) => (
          <Card
            key={container.type}
            className="bg-gray-100 hover:border-[#3a67e2]/50 transition-all duration-500 border border-lime-500"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Ship className="w-12 h-12 text-[#3a67e2]" strokeWidth={1.5} />
                <div className="text-right">
                  <div className="text-xs text-gray-500 font-mono mb-1">STARTING</div>
                  <div className="text-2xl font-black text-dark">{container.price}</div>
                </div>
              </div>
              <CardTitle className="text-2xl font-black text-dark">{container.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">{container.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-100 border border-lime-500">
        <CardContent className="pt-6">
          <p className="mb-4 text-black">
            <span className="font-semibold">Note:</span> Prices may vary.
          </p>
          <p className="text-black">
            Sea freight charges are based on dimensions and weight, with a rate of{" "}
            <span className="font-bold text-black">$20 per cubic foot</span>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

