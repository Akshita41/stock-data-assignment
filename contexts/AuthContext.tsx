import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { createContext, useContext, useEffect, useState } from 'react'
import { env, validateEnvironment } from '../utils/env'

interface User {
  id: string
  email: string
  name: string
  photo?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    configureGoogleSignIn()
    checkUserState()
  }, [])

  const configureGoogleSignIn = () => {
    if (!validateEnvironment()) {
      console.error('Google Sign-In configuration is incomplete')
      return
    }

    GoogleSignin.configure({
      webClientId: env.GOOGLE_WEB_CLIENT_ID,
      iosClientId: env.GOOGLE_IOS_CLIENT_ID,
      androidClientId: env.GOOGLE_ANDROID_CLIENT_ID,
      offlineAccess: true,
    })
  }

  const checkUserState = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn()
      if (isSignedIn) {
        const userInfo = await GoogleSignin.getCurrentUser()
        if (userInfo) {
          setUser({
            id: userInfo.user.id,
            email: userInfo.user.email,
            name: userInfo.user.name,
            photo: userInfo.user.photo,
          })
        }
      }
    } catch (error) {
      console.error('Error checking user state:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async () => {
    try {
      setIsLoading(true)
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      
      const userData = {
        id: userInfo.user.id,
        email: userInfo.user.email,
        name: userInfo.user.name,
        photo: userInfo.user.photo,
      }
      
      setUser(userData)
      await AsyncStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      await GoogleSignin.signOut()
      setUser(null)
      await AsyncStorage.removeItem('user')
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 