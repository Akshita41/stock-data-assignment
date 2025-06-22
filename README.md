# Stock Data App

A professional React Native Expo application with Google authentication, real-time stock data, charts, and watchlist functionality built with Tamagui UI components.

## 🚀 Features

- **Google Sign-In Authentication** - Secure OAuth 2.0 authentication
- **Real-time Stock Data** - Live quotes from Yahoo Finance via RapidAPI
- **Interactive Charts** - Price history charts using Victory Native
- **Stock Search** - Autocomplete search functionality
- **Watchlist Management** - Save and track favorite stocks
- **Cross-platform** - iOS, Android, and Web support
- **Modern UI** - Beautiful Tamagui components with dark/light themes
- **TypeScript** - Full type safety throughout the app
- **State Management** - React Query for server state, Context for client state
- **Persistence** - AsyncStorage for watchlist and user preferences

## 📱 App Screens

### Authentication
- **Login Screen** - Google Sign-In with secure token management

### Main App (Tab Navigation)
- **Home Tab** - Popular stocks, top gainers, and losers with real-time data
- **Search Tab** - Stock search with autocomplete and instant results
- **Watchlist Tab** - Personal stock watchlist with profit/loss tracking
- **Profile Tab** - User profile and logout functionality

### Stock Details
- **Stock Detail Screen** - Comprehensive stock information with interactive charts
- **Time Range Selection** - 1D, 5D, 1M, 1Y, Max chart periods
- **Watchlist Integration** - Add/remove stocks from watchlist

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 50
- **UI Library**: Tamagui (modern, performant components)
- **Navigation**: Expo Router with tab navigation
- **Authentication**: Google Sign-In with Expo Auth Session
- **Data Fetching**: React Query (TanStack Query) with Axios
- **Charts**: Victory Native for interactive stock charts
- **State Management**: React Context + React Query
- **Storage**: AsyncStorage for local data persistence
- **API**: Yahoo Finance via RapidAPI
- **Icons**: Lucide Icons (Tamagui integration)

## 📋 Prerequisites

- Node.js (v18 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Google Cloud Console project
- RapidAPI account with Yahoo Finance subscription
- Firebase project (optional, for enhanced Google services)

## 🚀 Quick Start

1. **Clone and Setup**:
   ```bash
   git clone <your-repo>
   cd stock-data-app
   ./setup.sh
   ```

2. **Configure Environment**:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   # Google Authentication
   GOOGLE_WEB_CLIENT_ID=your_google_web_client_id
   GOOGLE_IOS_CLIENT_ID=your_google_ios_client_id
   GOOGLE_ANDROID_CLIENT_ID=your_google_android_client_id
   
   # Yahoo Finance API
   RAPIDAPI_KEY=your_rapidapi_key
   ```

3. **Add Google Services**:
   - Place `google-services.json` in `google-services/` for Android
   - Place `GoogleService-Info.plist` in `google-services/` for iOS

4. **Start Development**:
   ```bash
   npm start
   ```

## 🔐 Authentication Setup

### Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sign-In API
4. Create OAuth 2.0 Client IDs for:
   - Web application
   - iOS application (bundle ID: `com.stockdata.app`)
   - Android application (package: `com.stockdata.app`)

### Firebase (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add Android and iOS apps with the same bundle IDs
4. Download configuration files to `google-services/` directory

## 📊 API Setup

### RapidAPI Yahoo Finance
1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to [Yahoo Finance API](https://rapidapi.com/apidojo/api/yahoo-finance1)
3. Get your API key and add it to `.env` as `RAPIDAPI_KEY`

## 🏗 Project Structure

```
stock-data-app/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx    # Tab layout with icons
│   │   ├── index.tsx      # Home screen (popular/gainers/losers)
│   │   ├── search.tsx     # Stock search with autocomplete
│   │   ├── watchlist.tsx  # User's watchlist
│   │   └── profile.tsx    # User profile
│   ├── auth/              # Authentication screens
│   │   └── index.tsx      # Google Sign-In screen
│   ├── stock/             # Stock detail screens
│   │   └── [symbol].tsx   # Dynamic stock detail page
│   └── _layout.tsx        # Root layout with providers
├── components/            # Reusable UI components
│   ├── StockCard.tsx      # Stock information card
│   └── StockChart.tsx     # Victory Native chart component
├── contexts/              # React contexts
│   ├── AuthContext.tsx    # Google authentication state
│   └── WatchlistContext.tsx # Watchlist management
├── hooks/                 # Custom React hooks
│   └── useStocks.ts       # React Query hooks for stock data
├── api/                   # API layer
│   └── yahoo.ts          # Yahoo Finance API client
├── utils/                 # Utility functions
│   └── env.ts            # Environment configuration
├── assets/                # Static assets
├── google-services/       # Google service files
├── tamagui.config.ts      # Tamagui UI configuration
├── app.config.ts         # Expo configuration
└── package.json          # Dependencies
```

## 🔧 Development

### Available Scripts
```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on Web
npm run build:android  # Build for Android production
npm run build:ios      # Build for iOS production
```

### Key Dependencies
- **@tanstack/react-query**: Server state management
- **victory-native**: Interactive charts
- **@tamagui/lucide-icons**: Beautiful icons
- **axios**: HTTP client for API calls
- **expo-auth-session**: OAuth authentication

## 📊 Data Flow

1. **Authentication**: Google Sign-In → Secure token storage
2. **Stock Data**: RapidAPI → React Query → UI components
3. **Watchlist**: Local storage → Context → UI updates
4. **Charts**: Historical data → Victory Native → Interactive charts

## 🎨 UI/UX Features

- **Responsive Design**: Works on all screen sizes
- **Dark/Light Themes**: Automatic theme switching
- **Pull-to-Refresh**: Real-time data updates
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Animations**: Smooth transitions and chart animations

## 🔒 Security

- **Environment Variables**: All sensitive data in `.env`
- **Secure Storage**: Authentication tokens in secure storage
- **API Keys**: RapidAPI key properly configured
- **OAuth 2.0**: Industry-standard authentication

## 🚀 Deployment

### EAS Build
```bash
npm run build:android  # Build Android APK/AAB
npm run build:ios      # Build iOS IPA
```

### App Store Deployment
1. Configure app signing certificates
2. Update app metadata in `app.config.ts`
3. Submit builds to App Store Connect

## 📈 Performance

- **React Query**: Intelligent caching and background updates
- **Tamagui**: Optimized component rendering
- **Victory Native**: Hardware-accelerated charts
- **AsyncStorage**: Efficient local data persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Resources

- [Tamagui Documentation](https://tamagui.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Query Documentation](https://tanstack.com/query)
- [Victory Native Charts](https://formidable.com/open-source/victory/docs/native)
- [RapidAPI Yahoo Finance](https://rapidapi.com/apidojo/api/yahoo-finance1)

---

Built with ❤️ using React Native, Expo, and Tamagui
