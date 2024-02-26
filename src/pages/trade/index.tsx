import React, { useCallback, useEffect, useRef } from 'react'

import { toast } from 'sonner'

import backgroundImage from '@/assets/bg-3.jpg'
import { LoadingSpinnerText } from '@/components/shared/cards/loadingSpinnerText'
import { OfferCardBox } from '@/components/shared/cards/offerCardBox'
import { HeaderTitle } from '@/components/shared/headerTitle'
import { Navbar } from '@/components/shared/navbar'
import { Spinner } from '@/components/shared/spinner'
import { Trade as TradeType } from '@/helpers/types'
import { useTrades } from '@/hooks/useTrades'

const Trade: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTrades()

  const observer = useRef<IntersectionObserver>()
  const atBottomRef = useRef(null)

  const loadMore = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      if (observer.current) observer.current.disconnect()
      return
    }

    const observerInstance = new IntersectionObserver(loadMore)
    observer.current = observerInstance

    if (atBottomRef.current) observerInstance.observe(atBottomRef.current)

    return () => observerInstance.disconnect()
  }, [loadMore, hasNextPage, isFetchingNextPage])

  if (isLoading) return <Spinner />
  if (error) toast.error('Erro ao carregar as trocas.')

  return (
    <div
      className="relative h-screen w-screen overflow-auto bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="relative z-10">
        <Navbar />
        <div className="container mb-20 space-y-1 pt-4 lg:mt-20">
          <HeaderTitle title="Trocas" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:pt-4">
            {data?.pages.map((group, index) => (
              <React.Fragment key={index}>
                {group.map((trade: TradeType) => (
                  <OfferCardBox key={trade.id} trade={trade} />
                ))}
              </React.Fragment>
            ))}
            <div ref={atBottomRef} className="h-10"></div>
          </div>
          {isFetchingNextPage && hasNextPage && <LoadingSpinnerText />}
        </div>
      </div>
    </div>
  )
}

export default Trade
