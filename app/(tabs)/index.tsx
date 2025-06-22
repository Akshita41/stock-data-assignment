import { useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { Container, Text, YStack, Tabs, Button, Spinner } from 'tamagui'
import { useAuth } from '../../contexts/AuthContext'
import { useGainers, useLosers, usePopularStocks } from '../../hooks/useStocks'
import { StockCard } from '../../components/StockCard'
import { router } from 'expo-router'

type TabType = 'popular' | 'gainers' | 'losers'

export default function HomeScreen() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('popular')

  const popularStocks = usePopularStocks()
  const gainers = useGainers()
  const losers = useLosers()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  const handleStockPress = (symbol: string) => {
    router.push(`/stock/${symbol}`)
  }

  const renderStockItem = ({ item }: any) => {
    const stock = item.quoteSummary?.result?.[0] || item
    const quote = stock.regularMarketPrice
    const change = stock.regularMarketChange
    const changePercent = stock.regularMarketChangePercent

    return (
      <StockCard
        symbol={stock.symbol}
        name={stock.shortname || stock.longname}
        price={quote}
        change={change}
        changePercent={changePercent}
        onPress={() => handleStockPress(stock.symbol)}
      />
    )
  }

  const getCurrentData = () => {
    switch (activeTab) {
      case 'popular':
        return popularStocks.data?.quoteResponse?.result || []
      case 'gainers':
        return gainers.data?.finance?.result || []
      case 'losers':
        return losers.data?.finance?.result || []
      default:
        return []
    }
  }

  const getCurrentQuery = () => {
    switch (activeTab) {
      case 'popular':
        return popularStocks
      case 'gainers':
        return gainers
      case 'losers':
        return losers
      default:
        return popularStocks
    }
  }

  const currentQuery = getCurrentQuery()
  const currentData = getCurrentData()

  return (
    <Container flex={1} padding="$4">
      <YStack space="$4">
        <Text fontSize="$8" fontWeight="bold">
          Welcome, {user?.name}!
        </Text>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
          flexDirection="column"
          flex={1}
        >
          <Tabs.List>
            <Tabs.Tab value="popular" flex={1}>
              <Text>Popular</Text>
            </Tabs.Tab>
            <Tabs.Tab value="gainers" flex={1}>
              <Text>Gainers</Text>
            </Tabs.Tab>
            <Tabs.Tab value="losers" flex={1}>
              <Text>Losers</Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Content value={activeTab} flex={1}>
            {currentQuery.isLoading ? (
              <YStack flex={1} justifyContent="center" alignItems="center">
                <Spinner size="large" />
                <Text marginTop="$2">Loading stocks...</Text>
              </YStack>
            ) : currentQuery.isError ? (
              <YStack flex={1} justifyContent="center" alignItems="center">
                <Text color="$red10">Error loading data</Text>
                <Button
                  onPress={() => currentQuery.refetch()}
                  marginTop="$2"
                  backgroundColor="$blue10"
                  color="white"
                >
                  Retry
                </Button>
              </YStack>
            ) : (
              <FlatList
                data={currentData}
                renderItem={renderStockItem}
                keyExtractor={(item) => item.symbol}
                refreshControl={
                  <RefreshControl
                    refreshing={currentQuery.isRefetching}
                    onRefresh={() => currentQuery.refetch()}
                  />
                }
                showsVerticalScrollIndicator={false}
              />
            )}
          </Tabs.Content>
        </Tabs>

        <Button
          onPress={handleSignOut}
          backgroundColor="$red10"
          color="white"
        >
          Sign Out
        </Button>
      </YStack>
    </Container>
  )
} 