import { FlatList, RefreshControl } from 'react-native'
import { Container, Text, YStack, Spinner, Button } from 'tamagui'
import { Heart, TrendingUp, TrendingDown } from '@tamagui/lucide-icons'
import { useWatchlist } from '../../contexts/WatchlistContext'
import { useQuote } from '../../hooks/useStocks'
import { StockCard } from '../../components/StockCard'
import { router } from 'expo-router'

export default function WatchlistScreen() {
  const { watchlist, removeFromWatchlist } = useWatchlist()

  const handleStockPress = (symbol: string) => {
    router.push(`/stock/${symbol}`)
  }

  const renderWatchlistItem = ({ item }: any) => {
    const quoteQuery = useQuote(item.symbol)
    const stock = quoteQuery.data?.quoteResponse?.result?.[0]

    if (!stock) {
      return (
        <Container
          padding="$3"
          marginVertical="$2"
          backgroundColor="$background"
          borderColor="$borderColor"
          borderWidth={1}
          borderRadius="$4"
        >
          <Text fontSize="$4" fontWeight="bold">
            {item.symbol}
          </Text>
          {quoteQuery.isLoading ? (
            <Spinner size="small" />
          ) : (
            <Text color="$gray10">Data unavailable</Text>
          )}
        </Container>
      )
    }

    const profit = stock.regularMarketPrice - stock.regularMarketOpen
    const profitPercent = (profit / stock.regularMarketOpen) * 100

    return (
      <StockCard
        symbol={stock.symbol}
        name={stock.shortname || stock.longname}
        price={stock.regularMarketPrice}
        change={profit}
        changePercent={profitPercent}
        onPress={() => handleStockPress(stock.symbol)}
      />
    )
  }

  return (
    <Container flex={1} padding="$4">
      <YStack space="$4">
        <Text fontSize="$8" fontWeight="bold">
          Watchlist
        </Text>

        {watchlist.length === 0 ? (
          <YStack flex={1} justifyContent="center" alignItems="center">
            <Heart size={64} color="$gray10" />
            <Text fontSize="$5" color="$gray10" textAlign="center" marginTop="$4">
              Your watchlist is empty
            </Text>
            <Text fontSize="$3" color="$gray8" textAlign="center" marginTop="$2">
              Add stocks to your watchlist by tapping the heart icon
            </Text>
            <Button
              onPress={() => router.push('/search')}
              marginTop="$4"
              backgroundColor="$blue10"
              color="white"
            >
              Search Stocks
            </Button>
          </YStack>
        ) : (
          <FlatList
            data={watchlist}
            renderItem={renderWatchlistItem}
            keyExtractor={(item) => item.symbol}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  // Refresh all quote queries
                }}
              />
            }
          />
        )}
      </YStack>
    </Container>
  )
} 