import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState } from 'react'

interface WatchlistItem {
  symbol: string
  addedAt: number
}

interface WatchlistContextType {
  watchlist: WatchlistItem[]
  addToWatchlist: (symbol: string) => Promise<void>
  removeFromWatchlist: (symbol: string) => Promise<void>
  isInWatchlist: (symbol: string) => boolean
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

const WATCHLIST_STORAGE_KEY = 'stock_watchlist'

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])

  useEffect(() => {
    loadWatchlist()
  }, [])

  const loadWatchlist = async () => {
    try {
      const stored = await AsyncStorage.getItem(WATCHLIST_STORAGE_KEY)
      if (stored) {
        setWatchlist(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading watchlist:', error)
    }
  }

  const saveWatchlist = async (newWatchlist: WatchlistItem[]) => {
    try {
      await AsyncStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(newWatchlist))
    } catch (error) {
      console.error('Error saving watchlist:', error)
    }
  }

  const addToWatchlist = async (symbol: string) => {
    const upperSymbol = symbol.toUpperCase()
    if (!isInWatchlist(upperSymbol)) {
      const newItem: WatchlistItem = {
        symbol: upperSymbol,
        addedAt: Date.now(),
      }
      const newWatchlist = [...watchlist, newItem]
      setWatchlist(newWatchlist)
      await saveWatchlist(newWatchlist)
    }
  }

  const removeFromWatchlist = async (symbol: string) => {
    const upperSymbol = symbol.toUpperCase()
    const newWatchlist = watchlist.filter(item => item.symbol !== upperSymbol)
    setWatchlist(newWatchlist)
    await saveWatchlist(newWatchlist)
  }

  const isInWatchlist = (symbol: string) => {
    return watchlist.some(item => item.symbol === symbol.toUpperCase())
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider')
  }
  return context
} 