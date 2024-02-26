import React, { useCallback, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import BackgroundImage from '@/assets/bg-smoke.webp'
import { OfferCardBox } from '@/components/shared/cards/offerCardBox'
import { HeaderTitle } from '@/components/shared/headerTitle'
import { Navbar } from '@/components/shared/navbar'
import { Spinner } from '@/components/shared/spinner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useTradesContext } from '@/context/TradesContext'
import { TradeCard, Trade as TradeType } from '@/helpers/types'
import { useTrades } from '@/hooks/useTrades'
import { useUserData } from '@/hooks/useUserData'

import CardsReceiving from './cardsReceiving'
import MyCardsOffering from './myCardsOffering'
import TradeConfirmation from './tradeConfirm'

const MyTrades: React.FC = () => {
  const { offering, receiving, resetSelectedCards, createTrade } =
    useTradesContext()
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useTrades(30)
  const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [modalStep, setModalStep] = useState(1)

  const openDialog = () => setIsDialogOpen(true)
  const goToNextStep = () => setModalStep((prev) => prev + 1)
  const resetModal = () => {
    resetSelectedCards()
    setModalStep(1)
    setIsDialogOpen(false)
  }

  const {
    data: userCardsData,
    isLoading: isLoadingCards,
    error: errorCards,
  } = useUserData()

  const refetchCards = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['trades'] })
  }, [queryClient])

  const confirmTrade = async () => {
    const cardsPayload = [
      ...offering.map((card) => ({ cardId: card.id, type: 'OFFERING' })),
      ...receiving.map((card) => ({ cardId: card.id, type: 'RECEIVING' })),
    ]

    await createTrade(cardsPayload as unknown as TradeCard[])

    await refetchCards()
    resetModal()
  }

  const myTrades = data?.pages.flatMap((items) =>
    items.filter((trade) => trade.userId === userCardsData?.id)
  )

  if (isLoading || isLoadingCards) return <Spinner />
  if (error) toast.error('Erro ao carregar as trocas.')
  if (errorCards) toast.error('Erro ao carregar cartas do usuário.')

  const renderModalContent = () => {
    switch (modalStep) {
      case 1:
        return <MyCardsOffering goToNextStep={goToNextStep} />
      case 2:
        return <CardsReceiving goToNextStep={goToNextStep} />
      case 3:
        return <TradeConfirmation onConfirm={confirmTrade} />
      default:
        return null
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div
        className="relative h-screen w-screen overflow-auto bg-cover"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <div className="relative z-10">
          <Navbar />
          <div className="container mb-20 space-y-1 pt-4 lg:mt-20">
            <HeaderTitle title="Minhas trocas" />
            {userCardsData?.cards.length === 0 ? (
              <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 bg-white">
                <h1 className="text-center text-xl font-bold text-in-green-300 lg:text-2xl">
                  Ainda não existem cartas adicionadas à sua conta
                </h1>
                <Button
                  className="bg-in-green-300 text-white hover:bg-in-green-100"
                  onClick={() => navigate('/my-account')}
                >
                  Adicionar cartas
                </Button>
              </div>
            ) : (
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="w-full bg-white"
                  onClick={openDialog}
                >
                  Criar uma nova troca
                </Button>
              </DialogTrigger>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:pt-4">
              {myTrades?.map((trade: TradeType) => (
                <OfferCardBox key={trade.id} trade={trade} />
              ))}
            </div>
          </div>
          {isDialogOpen && (
            <React.Suspense fallback={<Spinner />}>
              {renderModalContent()}
            </React.Suspense>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default MyTrades
