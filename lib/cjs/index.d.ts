import { PricesProps, ReturnedValues } from './prices';
export declare const nordpool: {
    hourly: ({ area, vat, currency, }: PricesProps) => Promise<ReturnedValues>;
};
