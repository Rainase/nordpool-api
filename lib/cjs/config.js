'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const baseUrl = 'http://www.nordpoolspot.com/api';
exports.config = {
    baseUrl: baseUrl,
    priceUrlHourly: baseUrl + '/marketdata/page/10',
    priceUrlDaily: baseUrl + '/marketdata/page/11',
    priceUrlWeekly: baseUrl + '/marketdata/page/12',
    priceUrlMonthly: baseUrl + '/marketdata/page/13',
    priceUrlYearly: baseUrl + '/marketdata/page/14',
};
