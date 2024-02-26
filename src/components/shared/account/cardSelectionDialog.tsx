import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { BadgeCheck, Badge } from 'lucide-react'
import { toast } from 'sonner'

import { SingleCardBox } from '@/components/shared/cards/singleCardBox'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useUserContext } from '@/context/UserContext'
import { Card } from '@/helpers/types'
import { useCardsToBuy } from '@/hooks/useCardsToBuy'

import { LoadingSpinnerText } from '../cards/loadingSpinnerText'
import { Spinner } from '../spinner'

const CardsSelectionDialog: React.FC = () => {
  const { addUserCard } = useUserContext()
  const queryClient = useQueryClient()
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const dialogClose = () => {
    document.getElementById('closeDialog')?.click()
  }

  const {
    data: cardsToBuy,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCardsToBuy()

  const toggleCardSelection = (cardId: string) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(cardId)
        ? prevSelected.filter((id) => id !== cardId)
        : [...prevSelected, cardId]
    )
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

  const refetchCards = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['my-cards'] })
    queryClient.invalidateQueries({ queryKey: ['my-account'] })
    queryClient.invalidateQueries({ queryKey: ['trades'] })
  }, [queryClient])

  const handleSave = async () => {
    await addUserCard(selectedCards)
    refetchCards()
    dialogClose()
  }

  if (isLoading) return <Spinner />
  if (error) return toast(`Error: ${error.message}}`)

  return (
    <DialogContent className="h-[85vh] max-w-[80vw] bg-white lg:max-w-[60vw]">
      <DialogHeader className="text-left">
        <DialogTitle>Escolha suas cartas</DialogTitle>
        <DialogDescription>
          Basta clicar e selecionar quais cartas você deseja adicionar à sua
          conta.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="rounded-md border p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {cardsToBuy?.pages.map((page) =>
            page.map((card: Card) => (
              <div
                key={card.id}
                className={`relative cursor-pointer hover:opacity-100 ${selectedCards.includes(card.id) ? 'relative opacity-100' : 'opacity-70'}`}
                onClick={() => toggleCardSelection(card.id)}
              >
                <SingleCardBox card={card} />
                <div className="absolute right-0 top-0 p-1">
                  {selectedCards.includes(card.id) ? (
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
            Salvar
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

export default CardsSelectionDialog
