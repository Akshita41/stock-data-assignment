import { Button, Container, Text, YStack } from 'tamagui'
import { useAuth } from '../../contexts/AuthContext'

export default function AuthScreen() {
  const { signIn, isLoading } = useAuth()

  const handleSignIn = async () => {
    try {
      await signIn()
    } catch (error) {
      console.error('Authentication failed:', error)
    }
  }

  return (
    <Container flex={1} justifyContent="center" alignItems="center" padding="$4">
      <YStack space="$4" alignItems="center" maxWidth={300}>
        <Text fontSize="$8" fontWeight="bold" textAlign="center">
          Welcome to Stock Data App
        </Text>
        <Text fontSize="$4" textAlign="center" color="$gray10">
          Sign in to access your personalized stock data
        </Text>
        <Button
          size="$4"
          onPress={handleSignIn}
          disabled={isLoading}
          backgroundColor="$blue10"
          color="white"
          width="100%"
        >
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </YStack>
    </Container>
  )
} 