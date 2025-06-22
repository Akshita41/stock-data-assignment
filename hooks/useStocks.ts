import { useQuery } from '@tanstack/react-query'
import { getGainers, getLosers, getPopularStocks, getQuote, getQuoteHistory, searchStocks } from '../api/yahoo'

export function useGainers() {
  return useQuery({
    queryKey: ['gainers'],
    queryFn: () => getGainers().then(r => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

export function useLosers() {
  return useQuery({
    queryKey: ['losers'],
    queryFn: () => getLosers().then(r => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

export function usePopularStocks() {
  return useQuery({
    queryKey: ['popular'],
    queryFn: () => getPopularStocks().then(r => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

export function useQuote(symbol: string) {
  return useQuery({
    queryKey: ['quote', symbol],
    queryFn: () => getQuote(symbol).then(r => r.data),
    enabled: !!symbol,
    staleTime: 1 * 60 * 1000,
  })
}

export function useQuoteHistory(symbol: string, range: '1d' | '5d' | '1mo' | '1y' | 'max') {
  return useQuery({
    queryKey: ['quoteHistory', symbol, range],
    queryFn: () => getQuoteHistory(symbol, range).then(r => r.data),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000,
  })
}

export function useStockSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchStocks(query).then(r => r.data),
    enabled: query.length > 2,
    staleTime: 10 * 60 * 1000,
  })
} 