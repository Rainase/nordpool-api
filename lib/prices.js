const axios = require('axios');
const config = require('./config');

const DayAheadPricesHourly = async (area, vat) => {
  const response = await axios.get(`${config.priceUrlHourly}`);
  const { data } = await response.data;

  if (data && data.Rows && data.Rows.length) {
    const values = [];
    for (const row of data.Rows) {
      if (row.IsExtraRow) {
        continue;
      }
      const date = new Date(row.StartTime);
      const hour = date
        .getHours()
        .toString()
        .padStart(2, '0')
        .concat(':00');
      for (const column of row.Columns) {
        const value = parseFloat(
          column.Value.replace(/,/, '.').replace(/ /g, '')
        );
        const valueWithVat = value * ((100 + vat) / 100);
        if (isNaN(value)) {
          continue;
        }
        const region = column.Name;
        if (!area || area.indexOf(region) >= 0) {
          values.push({
            region: region,
            date: date.toISOString(),
            hour,
            price: value,
            priceWithVAT: Number(valueWithVat.toFixed(3)),
            unit: 'snt/kWh',
          });
        }
      }
    }
    return values;
  }
};
module.exports = DayAheadPricesHourly;
