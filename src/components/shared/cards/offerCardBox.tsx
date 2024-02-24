import React from 'react'

import { Trade } from '@/helpers/types'

import { SingleCardBox } from './singleCardBox'

interface OfferCardBoxProps {
  trade: Trade
}

export const OfferCardBox: React.FC<OfferCardBoxProps> = ({ trade }) => {
  return (
    <div className="cursor-pointer space-y-2 rounded-md bg-white/10 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/40">
      <div className="bg-in-green-900 rounded-sm px-4 py-1">
        <p className="text-in-gold-300 font-bold">{trade.user.name}</p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        {trade.tradeCards.map((tradeCard) => (
          <SingleCardBox key={tradeCard.cardId} tradeCard={tradeCard} />
        ))}
      </div>
    </div>
  )
}
