import { useQuery } from '@tanstack/react-query'

import { useUserContext } from '@/context/UserContext'
import { Card } from '@/helpers/types'

export const useUserCards = () => {
  const { fetchUserCards } = useUserContext()

  return useQuery<Card[], Error>({
    queryKey: ['my-cards'],
    queryFn: fetchUserCards,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}
