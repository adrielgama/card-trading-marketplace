import React from 'react'

import { Trade } from '@/helpers/types'

import { SingleCardBox } from './singleCardBox'

interface OfferCardBoxProps {
  trade: Trade
}

export const OfferCardBox: React.FC<OfferCardBoxProps> = ({ trade }) => {
  const shouldRenderInline = trade.tradeCards.length === 2
  const offeringCards = trade.tradeCards.filter(
    (card) => card.type === 'OFFERING'
  )
  const receivingCards = trade.tradeCards.filter(
    (card) => card.type === 'RECEIVING'
  )

  return (
    <div
      className={`cursor-pointer rounded-md bg-white/10 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/40 ${shouldRenderInline ? '' : 'space-y-2'}`}
    >
      <div className="rounded-sm bg-in-green-900 px-4 py-1">
        <p className="font-bold text-in-gold-300">{trade.user.name}</p>
      </div>
      <div className={`mt-2 flex items-center justify-center space-x-2`}>
        {offeringCards.map((tradeCard) => (
          <SingleCardBox
            key={tradeCard.cardId}
            card={tradeCard.card}
            type={tradeCard.type}
          />
        ))}
        {shouldRenderInline &&
          receivingCards.map((tradeCard) => (
            <SingleCardBox
              key={tradeCard.cardId}
              card={tradeCard.card}
              type={tradeCard.type}
            />
          ))}
      </div>
      {!shouldRenderInline && receivingCards.length > 0 && (
        <div className="flex items-center justify-center space-x-2">
          {receivingCards.map((tradeCard) => (
            <SingleCardBox
              key={tradeCard.cardId}
              card={tradeCard.card}
              type={tradeCard.type}
            />
          ))}
        </div>
      )}
    </div>
  )
}
