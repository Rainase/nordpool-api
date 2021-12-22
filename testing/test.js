const { hourly } = require('@offrain/nordpool')

const test = async () => {
  const data = await hourly('EE', 20)
  console.log('data', data);
}

test()