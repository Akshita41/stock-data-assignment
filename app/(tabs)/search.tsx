import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container, Text, YStack, Input, Spinner, Button } from 'tamagui'
import { Search } from '@tamagui/lucide-icons'
import { useStockSearch } from '../../hooks/useStocks'
import { StockCard } from '../../components/StockCard'
import { router } from 'expo-router'

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchResults = useStockSearch(searchQuery)

  const handleStockPress = (symbol: string) => {
    router.push(`/stock/${symbol}`)
  }

  const renderSearchResult = ({ item }: any) => {
    return (
      <StockCard
        symbol={item.symbol}
        name={item.shortname || item.longname}
        price={item.regularMarketPrice}
        change={item.regularMarketChange}
        changePercent={item.regularMarketChangePercent}
        onPress={() => handleStockPress(item.symbol)}
      />
    )
  }

  return (
    <Container flex={1} padding="$4">
      <YStack space="$4">
        <Text fontSize="$8" fontWeight="bold">
          Search Stocks
        </Text>

        <YStack space="$2">
          <Input
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            size="$4"
            borderColor="$borderColor"
            focusStyle={{ borderColor: '$blue10' }}
          />
          <Text fontSize="$3" color="$gray10">
            Type at least 3 characters to search
          </Text>
        </YStack>

        {searchQuery.length > 0 && (
          <YStack flex={1}>
            {searchResults.isLoading ? (
              <YStack flex={1} justifyContent="center" alignItems="center">
                <Spinner size="large" />
                <Text marginTop="$2">Searching...</Text>
              </YStack>
            ) : searchResults.isError ? (
              <YStack flex={1} justifyContent="center" alignItems="center">
                <Text color="$red10">Error searching stocks</Text>
                <Button
                  onPress={() => searchResults.refetch()}
                  marginTop="$2"
                  backgroundColor="$blue10"
                  color="white"
                >
                  Retry
                </Button>
              </YStack>
            ) : searchResults.data?.quotes?.length === 0 ? (
              <YStack flex={1} justifyContent="center" alignItems="center">
                <Search size={48} color="$gray10" />
                <Text marginTop="$2" color="$gray10">
                  No stocks found for "{searchQuery}"
                </Text>
              </YStack>
            ) : (
              <FlatList
                data={searchResults.data?.quotes || []}
                renderItem={renderSearchResult}
                keyExtractor={(item) => item.symbol}
                showsVerticalScrollIndicator={false}
              />
            )}
          </YStack>
        )}

        {searchQuery.length === 0 && (
          <YStack flex={1} justifyContent="center" alignItems="center">
            <Search size={64} color="$gray10" />
            <Text fontSize="$5" color="$gray10" textAlign="center" marginTop="$4">
              Search for stocks by symbol
            </Text>
            <Text fontSize="$3" color="$gray8" textAlign="center" marginTop="$2">
              Try searching for popular stocks like AAPL, MSFT, or GOOGL
            </Text>
          </YStack>
        )}
      </YStack>
    </Container>
  )
} 