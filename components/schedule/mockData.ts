import type { Sailing } from "./types";

export const MOCK_SAILINGS: Sailing[] = [
  {
    id: "1",
    service: "Weekly",
    vessel: "Trop Express",
    departurePort: "Miami, FL",
    departureDate: "2025-11-07T10:00:00Z",
    arrivalPort: "Nassau, Bahamas",
    arrivalDate: "2025-11-08T14:00:00Z",
    transitDays: 2,
    status: "On Schedule",
  },
  {
    id: "2",
    service: "Weekly",
    vessel: "Trop Carrier",
    departurePort: "West Palm Beach, FL",
    departureDate: "2025-11-10T12:00:00Z",
    arrivalPort: "Freeport, Grand Bahama",
    arrivalDate: "2025-11-12T09:00:00Z",
    transitDays: 2,
    status: "On Schedule",
  },
  {
    id: "3",
    service: "Bi-Weekly",
    vessel: "Trop Atlantic",
    departurePort: "Miami, FL",
    departureDate: "2025-11-14T08:00:00Z",
    arrivalPort: "San Juan, PR",
    arrivalDate: "2025-11-16T18:00:00Z",
    transitDays: 3,
    status: "Delayed",
  },
];








