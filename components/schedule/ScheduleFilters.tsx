import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  origin: string;
  destination: string;
  date: string;
  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
  setDate: (value: string) => void;
  onSearch?: () => void;
};

export function ScheduleFilters({ origin, destination, date, setOrigin, setDestination, setDate, onSearch }: Props) {
  return (
    <Card className="bg-neutral-900 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Find Sailings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-300 mb-2">Origin</label>
            <Input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Miami, FL"
              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-300 mb-2">Destination</label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Nassau, Bahamas"
              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-300 mb-2">Departure Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-black/40 border-white/10 text-white"
            />
          </div>
          <div className="md:col-span-1 flex items-end">
            <Button onClick={onSearch} className="bg-[#3a67e2] hover:bg-[#3a67e2]/90 text-black font-bold w-full rounded-none">Search</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



