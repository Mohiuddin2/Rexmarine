import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export function AirFreightRates() {
  const weightRates = [
    { weight: "½ lb", price: "$10.50" },
    { weight: "1 lb", price: "$13.50" },
    { weight: "2 lb", price: "$26.50" },
    { weight: "3 lb", price: "$35.50" },
    { weight: "4 lb", price: "$43.50" },
  ];

  const boxRates = [
    { size: "Box 24x24", price: "$399.99" },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-[#00D9FF] to-transparent" />
        <span className="text-[#00D9FF] text-xs font-mono uppercase tracking-widest">
          Air Freight
        </span>
      </div>

      <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-none">
        AIR FREIGHT
        <br />
        <span className="text-black">PRICES</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-[#0B192C] border-2 border-white/10">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <Plane className="w-12 h-12 text-[#00D9FF]" strokeWidth={1.5} />
              <CardTitle className="text-white">Weight-Based Pricing</CardTitle>
            </div>
            <p className="text-gray-400 text-sm">
              Prices vary based on flight availability and carrier policies. Some airlines charge based on weight, while others use dimensions.
            </p>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-white/10 rounded">
              <Table>
                <TableHeader>
                  <TableRow className="border-2 border-white/10">
                    <TableHead className="text-gray-300 font-bold">Weight</TableHead>
                    <TableHead className="text-gray-300 font-bold text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weightRates.map((rate, index) => (
                    <TableRow
                      key={rate.weight}
                      className="border-2 border-white/10 hover:border-[#00D9FF]/50 transition-colors"
                    >
                      <TableCell className="text-white">{rate.weight}</TableCell>
                      <TableCell className="text-white text-right font-semibold">{rate.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">
              Note: Prices decrease with increased weight.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0B192C] border-2 border-white/10">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <Plane className="w-12 h-12 text-[#00D9FF]" strokeWidth={1.5} />
              <CardTitle className="text-white">Box Pricing</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-white/10 rounded">
              <Table>
                <TableHeader>
                  <TableRow className="border-2 border-white/10">
                    <TableHead className="text-gray-300 font-bold">Size</TableHead>
                    <TableHead className="text-gray-300 font-bold text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {boxRates.map((rate) => (
                    <TableRow
                      key={rate.size}
                      className="border-2 border-white/10 hover:border-[#00D9FF]/50 transition-colors"
                    >
                      <TableCell className="text-white">{rate.size}</TableCell>
                      <TableCell className="text-white text-right font-semibold">{rate.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#0B192C] border-2 border-[#00D9FF]/30">
        <CardContent className="pt-6">
          <p className="text-gray-300">
            For specific air freight rates, please{" "}
            <Link href="/contact" className="text-[#00D9FF] hover:text-[#00D9FF]/80 underline font-semibold">
              contact us
            </Link>{" "}
            with flight details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

