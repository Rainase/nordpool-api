import { DayAheadPricesHourly, DayAheadHourly } from "./prices";
import { PricesProps, ReturnedValues } from "./prices";
import { Area, Currency, MultiAreaEntry } from "./types";

const hourly = ({
  area,
  vat,
  currency,
  endDate,
}: PricesProps): Promise<ReturnedValues> => {
  return DayAheadPricesHourly({ area, vat, currency, endDate });
};

const dayAhead = ({
  area,
  currency,
}: {
  area: Area;
  currency: Currency;
}): Promise<MultiAreaEntry[]> => {
  return DayAheadHourly({ area, currency });
};

export const nordpool = {
  hourly,
  dayAhead,
};
