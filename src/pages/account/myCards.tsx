import React from 'react'

import { SingleCardBox } from '@/components/shared/cards/singleCardBox'
import { Card } from '@/helpers/types'

interface CardsProps {
  cards: Card[]
}

export const MyCardsSection: React.FC<CardsProps> = ({ cards }) => {
  return cards.map((card) => <SingleCardBox key={card.id} card={card} />)
}
