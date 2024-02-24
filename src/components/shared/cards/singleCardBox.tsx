import React from 'react'

import { TradeCard } from '@/helpers/types'

interface SingleCardBoxProps {
  tradeCard: TradeCard
}

export const SingleCardBox: React.FC<SingleCardBoxProps> = ({ tradeCard }) => {
  const {
    card: { name, imageUrl },
    type,
  } = tradeCard

  const holographicClass =
    type === 'OFFERING' ? 'red-holographic' : 'green-holographic'
  const borderColorClass =
    type === 'OFFERING' ? 'border-in-gold-400' : 'border-green-300'
  const textColorClass =
    type === 'OFFERING' ? 'text-in-green-50' : 'text-in-green-900'
  const textShown = type === 'OFFERING' ? 'Oferece' : 'Recebe'

  return (
    <div className="text-center">
      <div
        className={`rounded-md shadow-lg ring-2 ring-black/5 ${holographicClass} p-2`}
      >
        <img
          src={imageUrl}
          alt={`Card ${name}`}
          className={`rounded-sm border-2 ${borderColorClass} w-44`}
        />
        <span className={`text-sm font-medium ${textColorClass}`}>
          {textShown}
        </span>
      </div>
    </div>
  )
}
