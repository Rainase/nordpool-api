import { DayAheadPricesHourly } from './prices';
import { PricesProps, ReturnedValues } from './prices';

const hourly = ({
  area,
  vat,
  currency,
  endDate
}: PricesProps): Promise<ReturnedValues> => {
  return DayAheadPricesHourly({ area, vat, currency, endDate });
};

export const nordpool = {
  hourly,
};
