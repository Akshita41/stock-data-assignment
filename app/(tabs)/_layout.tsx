import { Tabs } from 'expo-router'
import { useAuth } from '../../contexts/AuthContext'
import { redirect } from 'expo-router'

export default function TabLayout() {
  const { user } = useAuth()

  if (!user) {
    redirect('/auth')
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
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