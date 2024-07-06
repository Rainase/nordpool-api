interface DayAheadResponse {
    deliveryDateCET: string;
    version: number;
    updatedAt: string;
    deliveryAreas: Area;
    market: string;
    multiAreaEntries: MultiAreaEntry[];
}
interface MultiAreaEntry {
    deliveryStart: string;
    deliveryEnd: string;
    entryPerArea: EntryPerArea;
}
type EntryPerArea = {
    [key in Currency]: number;
};
declare const Currencies: readonly ["EUR", "DKK", "NOK", "SEK"];
type Currency = (typeof Currencies)[number];
declare const Countries: readonly ["EE", "AT", "FI"];
type Area = (typeof Countries)[number];

type PricesProps = {
    area: Array<string> | string;
    vat: number;
    currency?: string;
    endDate?: string;
};
type ReturnedValues = {
    region: string;
    date: string;
    hour: string;
    marketPrice: number;
    consumerPrice: number | string;
    consumerUnit: string;
    marketUnit: string;
}[];
declare const DayAheadPricesHourly: ({ currency, area, vat, endDate }: PricesProps) => Promise<ReturnedValues>;
declare const DayAheadHourly: ({ area, currency }: {
    area: string;
    currency: string;
}) => Promise<MultiAreaEntry[]>;

export { type Area, type Currency, DayAheadHourly, DayAheadPricesHourly, type DayAheadResponse, type MultiAreaEntry, type PricesProps, type ReturnedValues };
