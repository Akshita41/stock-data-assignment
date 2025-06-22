import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { AuthProvider } from '../contexts/AuthContext'
import config from '../tamagui.config'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </TamaguiProvider>
  )
} 