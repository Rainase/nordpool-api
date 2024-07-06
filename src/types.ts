export interface DayAheadResponse {
  deliveryDateCET: string;
  version: number;
  updatedAt: string;
  deliveryAreas: Area;
  market: string;
  multiAreaEntries: MultiAreaEntry[];
}

export interface MultiAreaEntry {
  deliveryStart: string;
  deliveryEnd: string;
  entryPerArea: EntryPerArea;
}

interface EntryPerArea {
  EE: number;
}
const Currencies = [
    "EUR", "DKK", "NOK", "SEK"
] as const;
export type Currency = (typeof Currencies)[number]
const Countries = [
    "EE", "AT", "FI"
  ] as const;
export type Area = (typeof Countries)[number];