import { Container, Text, YStack, Button } from 'tamagui'
import { useAuth } from '../../contexts/AuthContext'

export default function HomeScreen() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return (
    <Container flex={1} padding="$4">
      <YStack space="$4">
        <Text fontSize="$8" fontWeight="bold">
          Welcome, {user?.name}!
        </Text>
        <Text fontSize="$4" color="$gray10">
          Your stock data dashboard is ready.
        </Text>
        <Button
          onPress={handleSignOut}
          backgroundColor="$red10"
          color="white"
          marginTop="$4"
        >
          Sign Out
        </Button>
      </YStack>
    </Container>
  )
} 