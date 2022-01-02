import axios from 'axios';
import { config } from './config';
export type PricesProps = {
  area: Array<string> | string;
  vat: number;
  currency?: string;
};
export type ReturnedValues = {
  region: string;
  date: string;
  hour: string;
  marketPrice: number;
  priceWithVAT: number | string;
  consumerUnit: string;
  marketUnit: string;
}[];
export const DayAheadPricesHourly = async ({
  currency,
  area,
  vat,
}: PricesProps): Promise<ReturnedValues> => {
  const url = `${config.priceUrlHourly}?currency=${currency},${currency},EUR,EUR`;
  const response = await axios.get(url);
  const { data } = await response.data;
  const values = [];
  if (data && data.Rows && data.Rows.length) {
    for (const row of data.Rows) {
      if (row.IsExtraRow) {
        continue;
      }
      const date = new Date(row.StartTime);
      const hour = date.getHours().toString().padStart(2, '0').concat(':00');
      for (const column of row.Columns) {
        const value = parseFloat(
          column.Value.replace(/,/, '.').replace(/ /g, '')
        );
        const valueWithVat = value * ((100 + vat) / 1000);
        if (isNaN(value)) {
          continue;
        }
        const region = column.Name;
        if (!area || area.indexOf(region) >= 0) {
          values.push({
            region: region,
            date: date.toISOString(),
            hour,
            marketPrice: value,
            priceWithVAT:
              vat !== undefined
                ? Number(valueWithVat.toFixed(2))
                : 'VAT nr. not provided',
            consumerUnit: 'snt/kWh',
            marketUnit: 'EUR/mWh',
          });
        }
      }
    }
  }
  return values;
};
