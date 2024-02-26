import React from 'react'

import { Card, CardType } from '@/helpers/types'
import { cn } from '@/lib/utils'

interface SingleCardBoxProps {
  card: Card
  type?: CardType
  className?: string
}

export const SingleCardBox: React.FC<SingleCardBoxProps> = ({
  card,
  type,
  className,
}) => {
  const { name, imageUrl } = card

  const holographicClass = type
    ? type === 'OFFERING'
      ? 'red-holographic'
      : 'green-holographic'
    : 'holographic'
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
          className={cn(
            'w-44 rounded-sm border-2',
            borderColorClass,
            className
          )}
        />
        {type && (
          <span className={`text-sm font-medium ${textColorClass}`}>
            {textShown}
          </span>
        )}
      </div>
    </div>
  )
}
