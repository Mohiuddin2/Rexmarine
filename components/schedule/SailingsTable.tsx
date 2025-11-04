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
          <TableRow className="border-white/10">
            <TableHead className="text-gray-300">Service</TableHead>
            <TableHead className="text-gray-300">Vessel</TableHead>
            <TableHead className="text-gray-300">Departure</TableHead>
            <TableHead className="text-gray-300">Arrival</TableHead>
            <TableHead className="text-gray-300">Transit</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sailings.map((sailing) => (
            <TableRow key={sailing.id} className="border-white/10">
              <TableCell className="text-white">{sailing.service}</TableCell>
              <TableCell className="text-white">{sailing.vessel}</TableCell>
              <TableCell className="text-gray-300">
                <div className="font-medium text-white">{sailing.departurePort}</div>
                <div className="text-xs text-gray-400">{new Date(sailing.departureDate).toLocaleString()}</div>
              </TableCell>
              <TableCell className="text-gray-300">
                <div className="font-medium text-white">{sailing.arrivalPort}</div>
                <div className="text-xs text-gray-400">{new Date(sailing.arrivalDate).toLocaleString()}</div>
              </TableCell>
              <TableCell className="text-white">{sailing.transitDays} days</TableCell>
              <TableCell>
                <span
                  className={
                    sailing.status === "On Schedule"
                      ? "text-emerald-400"
                      : sailing.status === "Delayed"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {sailing.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button className="bg-[#3a67e2] hover:bg-[#3a67e2]/90 text-black font-bold rounded-none">Book</Button>
              </TableCell>
            </TableRow>
          ))}
          {sailings.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-400">
                No sailings found for your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}



