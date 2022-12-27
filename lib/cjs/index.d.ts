import { PricesProps, ReturnedValues } from './prices';
export declare const nordpool: {
    hourly: ({ area, vat, currency, endDate }: PricesProps) => Promise<ReturnedValues>;
};
