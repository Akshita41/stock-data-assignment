import { Container, Text, YStack, Avatar, Button } from 'tamagui'
import { useAuth } from '../../contexts/AuthContext'

export default function ProfileScreen() {
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
      <YStack space="$4" alignItems="center">
        {user?.photo && (
          <Avatar circular size="$8">
            <Avatar.Image src={user.photo} />
            <Avatar.Fallback backgroundColor="$gray5" />
          </Avatar>
        )}
        <Text fontSize="$6" fontWeight="bold">
          {user?.name}
        </Text>
        <Text fontSize="$4" color="$gray10">
          {user?.email}
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