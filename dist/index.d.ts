interface MultiAreaEntry {
    deliveryStart: string;
    deliveryEnd: string;
    entryPerArea: EntryPerArea;
}
interface EntryPerArea {
    EE: number;
}
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

declare const nordpool: {
    hourly: ({ area, vat, currency, endDate, }: PricesProps) => Promise<ReturnedValues>;
    dayAhead: ({ area, currency, }: {
        area: Area;
        currency: Currency;
    }) => Promise<MultiAreaEntry[]>;
};

export { nordpool };
