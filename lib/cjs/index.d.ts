export declare const nordpool: {
    hourly: (region: Array<string>, VAT: number, currency: string) => Promise<{
        region: any;
        date: string;
        hour: string;
        price: number;
        priceWithVAT: string | number;
        unit: string;
    }[] | undefined>;
};
