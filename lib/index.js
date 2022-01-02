"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nordpool = void 0;
const prices_1 = require("./prices");
const hourly = ({ area, vat, currency }) => {
    return (0, prices_1.DayAheadPricesHourly)({ area, vat, currency });
};
hourly({ area: 'EE', vat: 20, currency: '' });
exports.nordpool = {
    hourly
};
