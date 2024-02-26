import React, { useState } from 'react'

import { SingleCardBox } from '@/components/shared/cards/singleCardBox'
import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTradesContext } from '@/context/TradesContext'
import { useUserContext } from '@/context/UserContext'
import { Card } from '@/helpers/types'

interface MyCardsOfferingProps {
  goToNextStep: () => void
}

const CardsOffering: React.FC<MyCardsOfferingProps> = ({ goToNextStep }) => {
  const { userCards } = useUserContext()
  const { setSelectedOfferingCards } = useTradesContext()
  const [selectedCards, setSelectedCards] = useState<Card[]>([])

  const toggleCardSelection = (card: Card) => {
    setSelectedCards((prevSelected) =>
      prevSelected.find((selectedCard) => selectedCard.id === card.id)
        ? prevSelected.filter((selectedCard) => selectedCard.id !== card.id)
        : [...prevSelected, card]
    )
  }

  const handleSave = () => {
    setSelectedOfferingCards(selectedCards)
    goToNextStep()
  }

  return (
    <DialogContent className="h-[85vh] max-w-[80vw] bg-white lg:max-w-[60vw]">
      <DialogHeader className="text-left">
        <DialogTitle>Escolha as cartas que deseja trocar</DialogTitle>
        <DialogDescription>
          Basta clicar e selecionar quais cartas você deseja oferecer na troca.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="rounded-md border p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {userCards?.map((card) => (
            <div
              key={card.id}
              className={`relative cursor-pointer hover:opacity-100 ${selectedCards.includes(card) ? 'relative opacity-100' : 'opacity-70'}`}
              onClick={() => toggleCardSelection(card)}
            >
              <SingleCardBox card={card} />
            </div>
          ))}
        </div>
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

export default CardsOffering
