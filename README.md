# Stock Data App

A React Native Expo application with Google authentication integration and Tamagui UI components.

## Features

- Google Sign-In authentication
- Cross-platform (iOS, Android, Web)
- Modern UI with Tamagui components
- TypeScript support
- Environment variable configuration

## Prerequisites

- Node.js (v18 or higher)
- Expo CLI
- Google Cloud Console project
- Firebase project (optional)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp env.example .env
```

Edit `.env` file with your Google authentication credentials:
```
GOOGLE_WEB_CLIENT_ID=your_google_web_client_id_here
GOOGLE_IOS_CLIENT_ID=your_google_ios_client_id_here
GOOGLE_ANDROID_CLIENT_ID=your_google_android_client_id_here
```

3. Configure Google Services:
   - Place `google-services.json` in `google-services/` for Android
   - Place `GoogleService-Info.plist` in `google-services/` for iOS

## Google Authentication Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sign-In API

### 2. Configure OAuth 2.0

1. Go to APIs & Services > Credentials
2. Create OAuth 2.0 Client IDs for:
   - Web application
   - iOS application
   - Android application

### 3. Firebase Setup (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add Android and iOS apps
4. Download configuration files:
   - `google-services.json` for Android
   - `GoogleService-Info.plist` for iOS

## Development

Start the development server:
```bash
npm start
```

Run on specific platforms:
```bash
npm run android
npm run ios
npm run web
```

## Building

Build for production:
```bash
npm run build:android
npm run build:ios
```

## Project Structure

```
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   ├── auth/              # Authentication screens
│   └── _layout.tsx        # Root layout
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
├── assets/                # Static assets
├── google-services/       # Google service files
├── tamagui.config.ts      # Tamagui configuration
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

## Environment Variables

- `GOOGLE_WEB_CLIENT_ID`: Web OAuth client ID
- `GOOGLE_IOS_CLIENT_ID`: iOS OAuth client ID  
- `GOOGLE_ANDROID_CLIENT_ID`: Android OAuth client ID

## Dependencies

- Expo SDK 50
- React Native 0.73.2
- Tamagui UI library
- Google Sign-In library
- AsyncStorage for data persistence

## License

MIT
