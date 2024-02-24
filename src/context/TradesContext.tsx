import React, { createContext, useContext, useCallback, ReactNode } from 'react'

import { fetchData } from '@/api/fetchData'
import { Trade, TradeCard } from '@/helpers/types'

interface TradesProviderProps {
  children: ReactNode
}
interface TradesContextType {
  createTrade: (cards: TradeCard[]) => Promise<void>
  getTrades: (rpp: number, page: number) => Promise<Trade[]>
  deleteTrade: (tradeId: string) => Promise<void>
}

const TradesContext = createContext<TradesContextType>(null!)

export const useTradesContext = () => useContext(TradesContext)

// Provedor do contexto
export const TradesProvider: React.FC<TradesProviderProps> = ({ children }) => {
  const createTrade = useCallback(async (cards: TradeCard[]): Promise<void> => {
    await fetchData('/trades', {
      method: 'POST',
      body: JSON.stringify({ cards }),
    })
  }, [])

  const getTrades = useCallback(
    async (rpp: number, page: number): Promise<Trade[]> => {
      const queryParams = new URLSearchParams({
        rpp: rpp.toString(),
        page: page.toString(),
      }).toString()
      const data = await fetchData(`/trades?${queryParams}`, {
        method: 'GET',
      })
      return data.list
    },
    []
  )

  const deleteTrade = useCallback(async (tradeId: string): Promise<void> => {
    await fetchData(`/trades/${tradeId}`, {
      method: 'DELETE',
    })
  }, [])

  return (
    <TradesContext.Provider value={{ createTrade, getTrades, deleteTrade }}>
      {children}
    </TradesContext.Provider>
  )
}
