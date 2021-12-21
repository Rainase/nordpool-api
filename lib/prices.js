import axios from 'axios'
import { config } from './config'
const DayAheadPricesHourly = async (area) => {
  const data = await axios.get(`${config.priceUrlHourly}`)
  return data.data
}
export { DayAheadPricesHourly }

