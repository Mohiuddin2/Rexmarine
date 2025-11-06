import type { Sailing } from "./types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  sailings: Sailing[];
};

export function SailingsTable({ sailings }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-2 border-[#3a67e2]/20">
            <TableHead className="text-[#0B192C] font-bold">Service</TableHead>
            <TableHead className="text-[#0B192C] font-bold">Vessel</TableHead>
            <TableHead className="text-[#0B192C] font-bold">Departure</TableHead>
            <TableHead className="text-[#0B192C] font-bold">Arrival</TableHead>
            <TableHead className="text-[#0B192C] font-bold">Transit</TableHead>
            <TableHead className="text-[#0B192C] font-bold">Status</TableHead>
            {/* <TableHead className="text-gray-300 text-right">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sailings.map((sailing) => (
            <TableRow key={sailing.id} className="border-2 border-[#3a67e2]/10 hover:border-[#3a67e2]/50 transition-colors">
              <TableCell className="text-slate-800">{sailing.service}</TableCell>
              <TableCell className="text-slate-800">{sailing.vessel}</TableCell>
              <TableCell className="text-slate-700">
                <div className="font-medium text-[#0B192C]">{sailing.departurePort}</div>
                <div className="text-xs text-gray-500">{new Date(sailing.departureDate).toLocaleString()}</div>
              </TableCell>
              <TableCell className="text-slate-700">
                <div className="font-medium text-[#0B192C]">{sailing.arrivalPort}</div>
                <div className="text-xs text-gray-500">{new Date(sailing.arrivalDate).toLocaleString()}</div>
              </TableCell>
              <TableCell className="text-slate-800">{sailing.transitDays} days</TableCell>
              <TableCell>
                <span
                  className={
                    sailing.status === "On Schedule"
                      ? "text-emerald-600"
                      : sailing.status === "Delayed"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {sailing.status}
                </span>
              </TableCell>
              {/* <TableCell className="text-right">
                <Button className="bg-[#3a67e2] hover:bg-[#3a67e2]/90 text-black font-bold rounded-none">Book</Button>
              </TableCell> */}
            </TableRow>
          ))}
          {sailings.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No sailings found for your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}




