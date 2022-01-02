# Nordpool API

### Unofficial nordpool-api

When you decide to use this make sure you read
[Nordpool T&Cs](https://www.nordpoolgroup.com/About-us/Terms-and-conditions-for-use/)

# About

This API is a tool to fetch `DayAhead` Prices from NordPool Market

# Install

## Install using npm

`npm i @offrain/nordpool`

# Usage

```js
// ES module
import { nordpool } from '@offrain/nordpool';
const getHourlyRates = async () => {
  const data = await nordpool.hourly('AT', 20, 'EUR');
  console.log("Today's hourly prices:", data);
};

getHourlyRates();
```

```js
// COMMONJS
const { nordpool } = require('@offrain/nordpool');
const getHourlyRates = async () => {
  const data = await nordpool.hourly({ area: 'FI', vat: 20, currency: 'EUR' });
  console.log("Today's hourly prices:", data);
};

getHourlyRates();
```

### Options

- `area`: Energy market area.
  - String or an array of strings, case sensitive. Currently available areas are `EE, LV, LT, AT, DK1,DK2, FI, OSLO, SE1, SE2, SE3`
- `VAT`: Number, pass in local vat % that will return `priceWithVAT` property. If not provided then` VAT nr not provided` will be returned for that prop.
- `currency`: `DKK`, `EUR`, `NOK` or `SEK` _optional, default `EUR`_.

# Returned values

```js
[
  {
    "region": "FI",
    "date": "2021-12-22T22:00:00.000Z", // Local Server Time
    "hour": "00:00", // Local Server Time
    "marketPrice": 181.9,
    "priceWithVAT": 218.28,
    "consumerUnit": "snt/kWh"
    "marketUnit": "EUR/mWh"
  }
]
```
