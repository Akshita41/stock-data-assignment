import Constants from 'expo-constants'

interface EnvironmentConfig {
  GOOGLE_WEB_CLIENT_ID: string
  GOOGLE_IOS_CLIENT_ID: string
  GOOGLE_ANDROID_CLIENT_ID: string
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  const extra = Constants.expoConfig?.extra

  return {
    GOOGLE_WEB_CLIENT_ID: extra?.GOOGLE_WEB_CLIENT_ID || process.env.GOOGLE_WEB_CLIENT_ID || '',
    GOOGLE_IOS_CLIENT_ID: extra?.GOOGLE_IOS_CLIENT_ID || process.env.GOOGLE_IOS_CLIENT_ID || '',
    GOOGLE_ANDROID_CLIENT_ID: extra?.GOOGLE_ANDROID_CLIENT_ID || process.env.GOOGLE_ANDROID_CLIENT_ID || '',
  }
}

export const env = getEnvironmentConfig()

export const validateEnvironment = (): boolean => {
  const config = getEnvironmentConfig()
  
  const requiredFields = [
    'GOOGLE_WEB_CLIENT_ID',
    'GOOGLE_IOS_CLIENT_ID', 
    'GOOGLE_ANDROID_CLIENT_ID'
  ]

  const missingFields = requiredFields.filter(field => !config[field as keyof EnvironmentConfig])

  if (missingFields.length > 0) {
    console.warn('Missing environment variables:', missingFields)
    return false
  }

  return true
} 