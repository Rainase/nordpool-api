import { DayAheadPricesHourly } from './prices';
import { PricesProps, ReturnedValues } from './prices';

const hourly = ({
  area,
  vat,
  currency,
}: PricesProps): Promise<ReturnedValues> => {
  return DayAheadPricesHourly({ area, vat, currency });
};

export const nordpool = {
  hourly,
};
