import { useInfiniteQuery } from '@tanstack/react-query'

import { useUserContext } from '@/context/UserContext'
import { Card } from '@/helpers/types'

export const useCardsToBuy = () => {
  const { fetchAllCards } = useUserContext()

  return useInfiniteQuery<Card[], Error>({
    queryKey: ['cards-to-buy'],
    queryFn: ({ pageParam = 1 }) => fetchAllCards(10, pageParam as number),
    getNextPageParam: (_lastPage, allPages) => {
      const maxPages = 3
      const nextPage =
        allPages.length < maxPages ? allPages.length + 1 : undefined
      return nextPage
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    retry: false,
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

// export const useCardsToBuy = () => {
//   const { fetchAllCards } = useUserContext()

//   return useQuery<Card[], Error>({
//     queryKey: ['cards-to-buy'],
//     queryFn: () => fetchAllCards(20, 1),
//     refetchOnWindowFocus: false,
//     retry: false,
//     staleTime: 60 * 60 * 1000, // 1 hour
//   })
// }
