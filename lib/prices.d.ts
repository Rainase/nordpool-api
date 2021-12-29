interface PricesProps {
    area: Array<string>;
    vat: number;
    currency?: string;
}
export declare const DayAheadPricesHourly: (options: PricesProps) => Promise<{
    region: any;
    date: string;
    hour: string;
    price: number;
    priceWithVAT: string | number;
    unit: string;
}[] | undefined>;
export {};
