import { useInfiniteQuery } from '@tanstack/react-query'

import { useTradesContext } from '@/context/TradesContext'
import { Trade } from '@/helpers/types'

export const useTrades = (size?: number) => {
  const { getTrades } = useTradesContext()

  return useInfiniteQuery<Trade[], Error>({
    queryKey: ['trades'],
    queryFn: ({ pageParam = 1 }) => getTrades(size ?? 10, pageParam as number),
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
