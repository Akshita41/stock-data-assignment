import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'
import { Container, Text, YStack, XStack, Button, Spinner, Card } from 'tamagui'
import { ArrowLeft, Heart } from '@tamagui/lucide-icons'
import { useQuote, useQuoteHistory } from '../../hooks/useStocks'
import { useWatchlist } from '../../contexts/WatchlistContext'
import { StockChart } from '../../components/StockChart'
import { router } from 'expo-router'

type TimeRange = '1d' | '5d' | '1mo' | '1y' | 'max'

export default function StockDetailScreen() {
  const { symbol } = useLocalSearchParams<{ symbol: string }>()
  const [timeRange, setTimeRange] = useState<TimeRange>('1mo')
  
  const quoteQuery = useQuote(symbol)
  const historyQuery = useQuoteHistory(symbol, timeRange)
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()

  const stock = quoteQuery.data?.quoteResponse?.result?.[0]
  const isWatched = isInWatchlist(symbol)

  const handleBack = () => {
    router.back()
  }

  const handleWatchlistToggle = async () => {
    if (isWatched) {
      await removeFromWatchlist(symbol)
    } else {
      await addToWatchlist(symbol)
    }
  }

  const formatChartData = () => {
    const data = historyQuery.data?.chart?.result?.[0]
    if (!data) return []

    const timestamps = data.timestamp
    const quotes = data.indicators.quote[0]
    const closes = quotes.close

    return timestamps.map((timestamp, index) => ({
      x: timestamp,
      y: closes[index] || 0,
    })).filter(point => point.y > 0)
  }

  if (quoteQuery.isLoading) {
    return (
      <Container flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
        <Text marginTop="$2">Loading stock data...</Text>
      </Container>
    )
  }

  if (quoteQuery.isError || !stock) {
    return (
      <Container flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="$red10" fontSize="$5" textAlign="center">
          Error loading stock data
        </Text>
        <Button
          onPress={() => quoteQuery.refetch()}
          marginTop="$4"
          backgroundColor="$blue10"
          color="white"
        >
          Retry
        </Button>
      </Container>
    )
  }

  const chartData = formatChartData()

  return (
    <Container flex={1} backgroundColor="$background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack space="$4" padding="$4">
          <XStack alignItems="center" space="$3">
            <Button
              size="$2"
              circular
              backgroundColor="transparent"
              onPress={handleBack}
            >
              <ArrowLeft size={20} />
            </Button>
            <YStack flex={1}>
              <Text fontSize="$6" fontWeight="bold">
                {stock.symbol}
              </Text>
              <Text fontSize="$4" color="$gray10">
                {stock.shortname || stock.longname}
              </Text>
            </YStack>
            <Button
              size="$2"
              circular
              backgroundColor="transparent"
              onPress={handleWatchlistToggle}
            >
              <Heart
                size={20}
                fill={isWatched ? '$red10' : 'transparent'}
                color={isWatched ? '$red10' : '$gray10'}
              />
            </Button>
          </XStack>

          <Card padding="$4" backgroundColor="$background" borderColor="$borderColor" borderWidth={1}>
            <YStack space="$3">
              <Text fontSize="$8" fontWeight="bold">
                ${stock.regularMarketPrice.toFixed(2)}
              </Text>
              <XStack alignItems="center" space="$2">
                <Text
                  fontSize="$4"
                  color={stock.regularMarketChange >= 0 ? '$green10' : '$red10'}
                  fontWeight="500"
                >
                  {stock.regularMarketChange >= 0 ? '+' : ''}{stock.regularMarketChange.toFixed(2)}
                </Text>
                <Text
                  fontSize="$4"
                  color={stock.regularMarketChange >= 0 ? '$green10' : '$red10'}
                  fontWeight="500"
                >
                  ({stock.regularMarketChange >= 0 ? '+' : ''}{stock.regularMarketChangePercent.toFixed(2)}%)
                </Text>
              </XStack>
            </YStack>
          </Card>

          <YStack space="$2">
            <Text fontSize="$5" fontWeight="bold">
              Chart
            </Text>
            <XStack space="$2" flexWrap="wrap">
              {(['1d', '5d', '1mo', '1y', 'max'] as TimeRange[]).map((range) => (
                <Button
                  key={range}
                  size="$2"
                  backgroundColor={timeRange === range ? '$blue10' : '$gray5'}
                  color={timeRange === range ? 'white' : '$gray12'}
                  onPress={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </XStack>
          </YStack>

          {historyQuery.isLoading ? (
            <YStack justifyContent="center" alignItems="center" height={300}>
              <Spinner size="large" />
              <Text marginTop="$2">Loading chart...</Text>
            </YStack>
          ) : (
            <StockChart data={chartData} symbol={symbol} range={timeRange} />
          )}

          <Card padding="$4" backgroundColor="$background" borderColor="$borderColor" borderWidth={1}>
            <YStack space="$3">
              <Text fontSize="$5" fontWeight="bold">
                Stock Details
              </Text>
              <XStack justifyContent="space-between">
                <Text color="$gray10">Market Cap</Text>
                <Text>${(stock.marketCap / 1e9).toFixed(2)}B</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text color="$gray10">Volume</Text>
                <Text>{(stock.volume / 1e6).toFixed(2)}M</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text color="$gray10">Open</Text>
                <Text>${stock.regularMarketOpen.toFixed(2)}</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text color="$gray10">Previous Close</Text>
                <Text>${stock.regularMarketPreviousClose.toFixed(2)}</Text>
              </XStack>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </Container>
  )
} 