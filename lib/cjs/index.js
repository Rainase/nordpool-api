"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nordpool = void 0;
const prices_1 = require("./prices");
exports.nordpool = {
    hourly: (region, VAT, currency) => (0, prices_1.DayAheadPricesHourly)({ area: region, vat: VAT, currency: currency }),
};
