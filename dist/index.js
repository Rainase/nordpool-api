"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  nordpool: () => nordpool
});
module.exports = __toCommonJS(src_exports);

// src/prices.ts
var import_axios = __toESM(require("axios"));

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
  const response = await import_axios.default.get(url);
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
  const result = (await (0, import_axios.default)(apiUrl)).data;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nordpool
});
