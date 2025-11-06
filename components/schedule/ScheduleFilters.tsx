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
    <Card className="bg-gray-100 border-2 border-[#3a67e2]/20 border border-lime-500">
      <CardHeader>
        <CardTitle className="text-[#0B192C]">Find Sailings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-600 mb-2">Origin</label>
            <Input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Miami, FL"
              className="bg-white border-2 border-[#3a67e2]/20 text-[#0B192C] placeholder:text-gray-500 focus:border-[#3a67e2]"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-600 mb-2">Destination</label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Nassau, Bahamas"
              className="bg-white border-2 border-[#3a67e2]/20 text-[#0B192C] placeholder:text-gray-500 focus:border-[#3a67e2]"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-600 mb-2">Departure Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white border-2 border-[#3a67e2]/20 text-[#0B192C] focus:border-[#3a67e2]"
            />
          </div>
          <div className="md:col-span-1 flex items-end">
            <Button onClick={onSearch} className="bg-lime-100 hover:bg-lime-50 text-lime-700 font-bold w-full border border-lime-700 rounded shadow-md">Search</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




