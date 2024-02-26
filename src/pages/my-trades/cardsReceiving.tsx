import React, { useEffect, useRef, useState } from 'react'

import { BadgeCheck, Badge } from 'lucide-react'
import { toast } from 'sonner'

import { LoadingSpinnerText } from '@/components/shared/cards/loadingSpinnerText'
import { SingleCardBox } from '@/components/shared/cards/singleCardBox'
import { Spinner } from '@/components/shared/spinner'
import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useTradesContext } from '@/context/TradesContext'
import { Card } from '@/helpers/types'
import { useCardsToBuy } from '@/hooks/useCardsToBuy'

interface CardsReceivingProps {
  goToNextStep: () => void
}

const CardsReceiving: React.FC<CardsReceivingProps> = ({ goToNextStep }) => {
  const { setSelectedReceivingCards } = useTradesContext()
  const {
    data: cardsToBuy,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCardsToBuy()
  const [selectedCards, setSelectedCards] = useState<Card[]>([])

  const toggleCardSelection = (card: Card) => {
    setSelectedCards((prevSelected) =>
      prevSelected.find((selectedCard) => selectedCard.id === card.id)
        ? prevSelected.filter((selectedCard) => selectedCard.id !== card.id)
        : [...prevSelected, card]
    )
  }

  const handleSave = () => {
    setSelectedReceivingCards(selectedCards)
    goToNextStep()
  }

  const atBottomRef = useRef(null)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    if (atBottomRef.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        },
        { threshold: 0 }
      )
      observer.current.observe(atBottomRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, observer])

  if (isLoading) return <Spinner />
  if (error) return toast(`Error: ${error.message}}`)

  return (
    <DialogContent className="h-[85vh] max-w-[80vw] bg-white lg:max-w-[60vw]">
      <DialogHeader className="text-left">
        <DialogTitle>Escolha as cartas que deseja receber na troca</DialogTitle>
        <DialogDescription>
          Selecione as cartas da lista abaixo.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="rounded-md border p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {cardsToBuy?.pages.map((page) =>
            page.map((card: Card) => (
              <div
                key={card.id}
                className={`relative cursor-pointer hover:opacity-100 ${selectedCards.includes(card) ? 'opacity-100' : 'opacity-70'}`}
                onClick={() => toggleCardSelection(card)}
              >
                <SingleCardBox card={card} />
                <div className="absolute right-0 top-0 p-1">
                  {selectedCards.includes(card) ? (
                    <BadgeCheck className="h-6 w-6 fill-white text-green-500 drop-shadow-sm" />
                  ) : (
                    <Badge className="h-6 w-6 fill-white text-in-gold-200 drop-shadow-sm" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div ref={atBottomRef} style={{ height: '20px' }} />
        {isFetchingNextPage && <LoadingSpinnerText />}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <DialogFooter>
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-in-green-100">
            {selectedCards.length} cartas selecionadas
          </span>
          <Button
            type="button"
            onClick={handleSave}
            disabled={selectedCards.length === 0}
            className="bg-in-green-300 text-white hover:bg-in-green-100"
          >
            Próximo
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

export default CardsReceiving
