import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import backgroundImage from '@/assets/bg-svg-4.svg'
import { OfferCardBox } from '@/components/shared/cards/offerCardBox'
import { HeaderTitle } from '@/components/shared/headerTitle'
import { Navbar } from '@/components/shared/navbar'
import { Spinner } from '@/components/shared/spinner'
import { useTradesContext } from '@/context/TradesContext'

const Trade: React.FC = () => {
  const { getTrades } = useTradesContext()

  const {
    data: publicTrades,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['trades'],
    queryFn: () => getTrades(10, 1),
    staleTime: 60 * 60 * 1000,
    retry: false,
  })

  if (isLoading) return <Spinner />

  if (error) return toast.error('Erro ao carregar as trocas.')

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
            {publicTrades?.map((trade) => (
              <OfferCardBox key={trade.id} trade={trade} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trade
