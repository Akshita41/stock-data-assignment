import { Card, Text, XStack, YStack, Button } from 'tamagui'
import { Heart, TrendingUp, TrendingDown } from '@tamagui/lucide-icons'
import { useWatchlist } from '../contexts/WatchlistContext'

interface StockCardProps {
  symbol: string
  name?: string
  price: number
  change: number
  changePercent: number
  onPress?: () => void
}

export function StockCard({ symbol, name, price, change, changePercent, onPress }: StockCardProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const isWatched = isInWatchlist(symbol)
  const isPositive = change >= 0

  const handleWatchlistToggle = async () => {
    if (isWatched) {
      await removeFromWatchlist(symbol)
    } else {
      await addToWatchlist(symbol)
    }
  }

  return (
    <Card
      padding="$3"
      marginVertical="$2"
      backgroundColor="$background"
      borderColor="$borderColor"
      borderWidth={1}
      borderRadius="$4"
      onPress={onPress}
    >
      <XStack justifyContent="space-between" alignItems="center">
        <YStack flex={1}>
          <XStack alignItems="center" space="$2">
            <Text fontSize="$5" fontWeight="bold">
              {symbol}
            </Text>
            {isPositive ? (
              <TrendingUp size={16} color="$green10" />
            ) : (
              <TrendingDown size={16} color="$red10" />
            )}
          </XStack>
          {name && (
            <Text fontSize="$3" color="$gray10" numberOfLines={1}>
              {name}
            </Text>
          )}
        </YStack>

        <YStack alignItems="flex-end" space="$1">
          <Text fontSize="$4" fontWeight="bold">
            ${price.toFixed(2)}
          </Text>
          <XStack alignItems="center" space="$1">
            <Text
              fontSize="$3"
              color={isPositive ? '$green10' : '$red10'}
              fontWeight="500"
            >
              {isPositive ? '+' : ''}{change.toFixed(2)}
            </Text>
            <Text
              fontSize="$3"
              color={isPositive ? '$green10' : '$red10'}
              fontWeight="500"
            >
              ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </Text>
          </XStack>
        </YStack>

        <Button
          size="$2"
          circular
          backgroundColor="transparent"
          onPress={handleWatchlistToggle}
          marginLeft="$2"
        >
          <Heart
            size={20}
            fill={isWatched ? '$red10' : 'transparent'}
            color={isWatched ? '$red10' : '$gray10'}
          />
        </Button>
      </XStack>
    </Card>
  )
} 