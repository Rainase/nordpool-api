import axios from 'axios';
import { config } from './config';
interface PricesProps {
  area: Array<string>;
  vat: number;
  currency?: string;
}
export const DayAheadPricesHourly = async (options: PricesProps) => {
  const url = `${config.priceUrlHourly}?currency=${options.currency},${options.currency},EUR,EUR`;
  const response = await axios.get(url);
  const { data } = await response.data;

  if (data && data.Rows && data.Rows.length) {
    const values = [];
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
        const valueWithVat = value * ((100 + options.vat) / 1000);
        if (isNaN(value)) {
          continue;
        }
        const region = column.Name;
        if (!options.area || options.area.indexOf(region) >= 0) {
          values.push({
            region: region,
            date: date.toISOString(),
            hour,
            price: value,
            priceWithVAT:
              options.vat !== undefined
                ? Number(valueWithVat.toFixed(2))
                : 'VAT nr not provided',
            consumerUnit: 'snt/kWh',
            marketUnit: 'snt/mWh',
          });
        }
      }
    }
    return values;
  }
};
