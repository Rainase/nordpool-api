export declare type PricesProps = {
    area: Array<string> | string;
    vat: number;
    currency?: string;
};
export declare type ReturnedValues = {
    region: string;
    date: string;
    hour: string;
    price: number;
    priceWithVAT: number | string;
    consumerUnit: string;
    marketUnit: string;
}[];
export declare const DayAheadPricesHourly: ({ currency, area, vat }: PricesProps) => Promise<ReturnedValues>;
