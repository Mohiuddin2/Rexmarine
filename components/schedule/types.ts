export type Sailing = {
  id: string;
  service: string;
  vessel: string;
  departurePort: string;
  departureDate: string; // ISO or display string
  arrivalPort: string;
  arrivalDate: string; // ISO or display string
  transitDays: number;
  status: "On Schedule" | "Delayed" | "Cancelled";
};



