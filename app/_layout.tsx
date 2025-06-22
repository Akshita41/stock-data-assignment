import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../contexts/AuthContext'
import { WatchlistProvider } from '../contexts/WatchlistContext'
import config from '../tamagui.config'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
})

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <AuthProvider>
          <WatchlistProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="stock" options={{ headerShown: false }} />
            </Stack>
          </WatchlistProvider>
        </AuthProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
} 