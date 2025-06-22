import axios from 'axios'
import { env } from '../utils/env'

const client = axios.create({
  baseURL: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com',
  headers: { 
    'X-RapidAPI-Key': env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  },
})

export interface StockQuote {
  symbol: string
  shortname?: string
  longname?: string
  regularMarketPrice: number
  regularMarketChange: number
  regularMarketChangePercent: number
  regularMarketOpen: number
  regularMarketPreviousClose: number
  marketCap: number
  volume: number
}

export interface ChartData {
  timestamp: number[]
  indicators: {
    quote: Array<{
      close: number[]
      high: number[]
      low: number[]
      open: number[]
      volume: number[]
    }>
  }
}

export const getGainers = () =>
  client.get('/market/v2/get-movers', { 
    params: { region: 'US', start: 0, count: 10, lang: 'en-US' } 
  })

export const getLosers = () =>
  client.get('/market/v2/get-movers', { 
    params: { region: 'US', start: 0, count: 10, lang: 'en-US' } 
  })

export const getPopularStocks = () =>
  client.get('/market/v2/get-quotes', {
    params: {
      region: 'US',
      symbols: 'AAPL,MSFT,GOOGL,AMZN,TSLA,NVDA,META,BRK-B,JPM,V'
    }
  })

export const getQuote = (symbol: string) =>
  client.get('/market/v2/get-quotes', {
    params: { region: 'US', symbols: symbol }
  })

export const getQuoteHistory = (symbol: string, range: '1d' | '5d' | '1mo' | '1y' | 'max') =>
  client.get('/market/v8/get-chart', { 
    params: { symbol, range, interval: '1d' } 
  })

export const searchStocks = (query: string) =>
  client.get('/auto-complete', {
    params: { query, lang: 'en-US' }
  }) 