import { View } from 'react-native'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native'
import { Text, YStack } from 'tamagui'

interface StockChartProps {
  data: Array<{ x: number; y: number }>
  symbol: string
  range: string
}

export function StockChart({ data, symbol, range }: StockChartProps) {
  if (!data || data.length === 0) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="$gray10">No chart data available</Text>
      </YStack>
    )
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString()
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  return (
    <View style={{ height: 300, padding: 16 }}>
      <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
        {symbol} - {range}
      </Text>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        height={250}
        padding={{ top: 20, bottom: 40, left: 60, right: 20 }}
      >
        <VictoryAxis
          dependentAxis
          tickFormat={formatPrice}
          style={{
            axis: { stroke: '#c0c0c0' },
            grid: { stroke: '#e0e0e0', strokeDasharray: '5,5' },
            tickLabels: { fontSize: 10, fill: '#666' },
          }}
        />
        <VictoryAxis
          tickFormat={formatDate}
          style={{
            axis: { stroke: '#c0c0c0' },
            tickLabels: { fontSize: 10, fill: '#666', angle: -45 },
          }}
        />
        <VictoryLine
          data={data}
          style={{
            data: { stroke: '#007AFF', strokeWidth: 2 },
          }}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 },
          }}
        />
      </VictoryChart>
    </View>
  )
} 