import React, {
  createContext,
  useContext,
  useCallback,
  ReactNode,
  useState,
} from 'react'

import { fetchData } from '@/api/fetchData'
import { Card, Trade, TradeCard, TradeCardPayload } from '@/helpers/types'

interface TradesProviderProps {
  children: ReactNode
}

interface SelectedCards {
  offering: Card[]
  receiving: Card[]
}

interface TradesContextType extends SelectedCards {
  createTrade: (cards: TradeCard[]) => Promise<void>
  getTrades: (rpp: number, page: number) => Promise<Trade[]>
  deleteTrade: (tradeId: string) => Promise<void>
  setSelectedOfferingCards: (cards: Card[]) => void
  setSelectedReceivingCards: (cards: Card[]) => void
  resetSelectedCards: () => void
  offering: Card[]
  receiving: Card[]
}

const TradesContext = createContext<TradesContextType>(null!)

export const useTradesContext = () => useContext(TradesContext)

export const TradesProvider: React.FC<TradesProviderProps> = ({ children }) => {
  const [offering, setOffering] = useState<Card[]>([])
  const [receiving, setReceiving] = useState<Card[]>([])

  const createTrade = useCallback(
    async (cards: TradeCardPayload[]): Promise<void> => {
      await fetchData('/trades', {
        method: 'POST',
        body: JSON.stringify({ cards }),
      })
    },
    []
  )

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

  const setSelectedOfferingCards = useCallback((cards: Card[]) => {
    setOffering(cards)
  }, [])

  const setSelectedReceivingCards = useCallback((cards: Card[]) => {
    setReceiving(cards)
  }, [])

  const resetSelectedCards = useCallback(() => {
    setOffering([])
    setReceiving([])
  }, [])

  return (
    <TradesContext.Provider
      value={{
        createTrade,
        getTrades,
        deleteTrade,
        offering,
        receiving,
        setSelectedOfferingCards,
        setSelectedReceivingCards,
        resetSelectedCards,
      }}
    >
      {children}
    </TradesContext.Provider>
  )
}
