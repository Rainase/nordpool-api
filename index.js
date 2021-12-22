const DayAheadPricesHourly = require("./lib/prices");

const nordpool = { hourly: (region, VAT) => DayAheadPricesHourly(region, VAT) };

module.exports = nordpool;
