"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayAheadPricesHourly = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const DayAheadPricesHourly = ({ currency, area, vat, }) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${config_1.config.priceUrlHourly}?currency=${currency},${currency},EUR,EUR`;
    const response = yield axios_1.default.get(url);
    const { data } = yield response.data;
    const values = [];
    if (data && data.Rows && data.Rows.length) {
        for (const row of data.Rows) {
            if (row.IsExtraRow) {
                continue;
            }
            const date = new Date(row.StartTime);
            const hour = date.getHours().toString().padStart(2, '0').concat(':00');
            for (const column of row.Columns) {
                const value = parseFloat(column.Value.replace(/,/, '.').replace(/ /g, ''));
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
                        priceWithVAT: vat !== undefined
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
});
exports.DayAheadPricesHourly = DayAheadPricesHourly;
