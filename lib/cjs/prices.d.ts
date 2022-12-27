export type PricesProps = {
    area: Array<string> | string;
    vat: number;
    currency?: string;
    endDate?: string;
};
export type ReturnedValues = {
    region: string;
    date: string;
    hour: string;
    marketPrice: number;
    consumerPrice: number | string;
    consumerUnit: string;
    marketUnit: string;
}[];
export declare const DayAheadPricesHourly: ({ currency, area, vat, endDate }: PricesProps) => Promise<ReturnedValues>;
