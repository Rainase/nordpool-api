import { DayAheadPricesHourly } from './prices';

export const nordpool = {
  hourly: (region: Array<string>, VAT: number, currency: string) =>
    DayAheadPricesHourly({ area: region, vat: VAT, currency: currency }),
};
