// src/prices.ts
import axios from "axios";

// src/config.ts
var baseUrl = "http://www.nordpoolspot.com/api";
var config = {
  baseUrl,
  priceUrlHourly: baseUrl + "/marketdata/page/10",
  apiUrl: "https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices"
};

// src/prices.ts
var DayAheadPricesHourly = async ({
  currency,
  area,
  vat,
  endDate
}) => {
  const today = /* @__PURE__ */ new Date();
  const fallbackDate = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
  const finalDate = endDate ? endDate : fallbackDate;
  const url = `${config.priceUrlHourly}?currency=${currency},${currency},EUR,EUR&endDate=${finalDate}`;
  const response = await axios.get(url);
  const { data } = await response.data;
  const values = [];
  if (data && data.Rows && data.Rows.length) {
    for (const row of data.Rows) {
      if (row.IsExtraRow) {
        continue;
      }
      const date = new Date(row.StartTime);
      const hour = date.getHours().toString().padStart(2, "0").concat(":00");
      for (const column of row.Columns) {
        const value = parseFloat(
          column.Value.replace(/,/, ".").replace(/ /g, "")
        );
        const valueWithVat = value * ((100 + vat) / 1e3);
        if (isNaN(value)) {
          continue;
        }
        const region = column.Name;
        if (!area || area.indexOf(region) >= 0) {
          values.push({
            region,
            date: date.toISOString(),
            hour,
            marketPrice: value,
            consumerPrice: vat !== void 0 ? Number(valueWithVat.toFixed(2)) : "VAT nr. not provided",
            consumerUnit: "snt/kWh",
            marketUnit: "EUR/mWh"
          });
        }
      }
    }
  }
  return values;
};
var DayAheadHourly = async ({ area, currency }) => {
  const today = `${(/* @__PURE__ */ new Date()).getFullYear()}-${(/* @__PURE__ */ new Date()).getMonth()}-${(/* @__PURE__ */ new Date()).getDate()}`;
  const apiUrl = `${config.apiUrl}?date=${today}&market=DayAhead&deliveryArea=${area}&currency=${currency ? currency : "EUR"}`;
  const result = (await axios(apiUrl)).data;
  const prices = result.multiAreaEntries;
  return prices;
};

// src/index.ts
var hourly = ({
  area,
  vat,
  currency,
  endDate
}) => {
  return DayAheadPricesHourly({ area, vat, currency, endDate });
};
var dayAhead = ({
  area,
  currency
}) => {
  return DayAheadHourly({ area, currency });
};
var nordpool = {
  hourly,
  dayAhead
};
export {
  nordpool
};
