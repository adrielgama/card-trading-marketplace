import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'

import { fetchData } from '@/api/fetchData'
import { Card, IUser } from '@/helpers/types'

interface UserProviderProps {
  children: ReactNode
}

interface UserContextData {
  user: IUser | null
  fetchUser: () => Promise<IUser>
  fetchUserCards: () => Promise<Card[]>
  userCards: Card[] | null
  fetchAllCards: (rpp: number, page: number) => Promise<Card[]>
  addUserCard: (cardIds: string[]) => Promise<void>
}

const UserContext = createContext<UserContextData>({} as UserContextData)

export const useUserContext = () => useContext(UserContext)

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [userCards, setUserCards] = useState<Card[] | null>(null)

  const fetchUser = useCallback(async () => {
    try {
      const userData = await fetchData('/me', { method: 'GET' })
      setUser(userData)
      return userData
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }, [])

  const fetchUserCards = useCallback(async () => {
    try {
      const cardsData = await fetchData('/me/cards', { method: 'GET' })
      setUserCards(cardsData)
      return cardsData
    } catch (error) {
      console.error('Error fetching user cards:', error)
    }
  }, [])

  const fetchAllCards = useCallback(
    async (rpp: number, page: number): Promise<Card[]> => {
      const queryParams = new URLSearchParams({
        rpp: rpp.toString(),
        page: page.toString(),
      }).toString()
      try {
        const { list } = await fetchData(`/cards${queryParams}`, {
          method: 'GET',
        })
        return list
      } catch (error) {
        console.error('Error fetching all cards:', error)
        return []
      }
    },
    []
  )

  const addUserCard = useCallback(
    async (cardIds: string[]) => {
      try {
        await fetchData('/me/cards', {
          method: 'POST',
          body: JSON.stringify({ cardIds }),
        })
        await fetchUserCards()
      } catch (error) {
        console.error('Error adding user card:', error)
      }
    },
    [fetchUserCards]
  )

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const value = {
    user,
    fetchUser,
    fetchUserCards,
    userCards,
    fetchAllCards,
    addUserCard,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
