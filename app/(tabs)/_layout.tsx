import { Tabs } from 'expo-router'
import { useAuth } from '../../contexts/AuthContext'
import { redirect } from 'expo-router'
import { Home, Search, Heart, User } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const { user } = useAuth()

  if (!user) {
    redirect('/auth')
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof TabBarIcon>['name']
  color: string
}) {
  return <TabBarIcon {...props} />
} 