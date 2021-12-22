'use strict'
const baseUrl = 'http://www.nordpoolspot.com/api'

const config = {
  baseUrl: baseUrl,
  priceUrlHourly: baseUrl + '/marketdata/page/10?currency=,,EUR,EUR',
  priceUrlDaily: baseUrl + '/marketdata/page/11?currency=,,EUR,EUR',
  priceUrlWeekly: baseUrl + '/marketdata/page/12?currency=,,EUR,EUR',
  priceUrlMonthly: baseUrl + '/marketdata/page/13?currency=,,EUR,EUR',
  priceUrlYearly: baseUrl + '/marketdata/page/14?currency=,,EUR,EUR',
}

module.exports = config
