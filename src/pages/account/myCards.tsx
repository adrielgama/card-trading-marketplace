import React from 'react'

import { Card } from '@/helpers/types'

interface CardsProps {
  cards: Card[]
}

export const MyCardsSection: React.FC<CardsProps> = ({ cards }) => {
  // TODO Ajustar a visualização dos cards, remover o cards[0]
  const { name, description, imageUrl } = cards[0]
  return (
    <div className="mt-4 flex flex-col items-center justify-center space-y-4">
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <img src={imageUrl} alt={name} className="w-32" />
      </div>
    </div>
  )
}
