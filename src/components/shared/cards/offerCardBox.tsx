import React, { useCallback, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { Trash2, BadgeCheck, BadgeXIcon } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

import { useTradesContext } from '@/context/TradesContext'
import { Trade } from '@/helpers/types'

import { SingleCardBox } from './singleCardBox'

interface OfferCardBoxProps {
  trade: Trade
}

export const OfferCardBox: React.FC<OfferCardBoxProps> = ({ trade }) => {
  const { deleteTrade } = useTradesContext()
  const queryClient = useQueryClient()
  const [isDeleting, setIsDeleting] = useState(false)
  const { pathname } = useLocation()
  const myTradesPath = pathname === '/my-trades'

  const shouldRenderInline = trade.tradeCards.length === 2
  const offeringCards = trade.tradeCards.filter(
    (card) => card.type === 'OFFERING'
  )
  const receivingCards = trade.tradeCards.filter(
    (card) => card.type === 'RECEIVING'
  )

  const refetchCards = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['my-account'] })
    queryClient.invalidateQueries({ queryKey: ['trades'] })
  }, [queryClient])

  const handleDelete = async () => {
    try {
      await deleteTrade(trade.id)
      await refetchCards()
      toast.success('Troca deletada com sucesso!')
    } catch (error) {
      toast.error('Erro ao deletar troca!')
    } finally {
      setIsDeleting(false)
    }
  }

  const confirmIcon = () => setIsDeleting(true)

  return (
    <div
      className={`cursor-pointer rounded-md bg-white/10 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/40 ${shouldRenderInline ? '' : 'space-y-2'}`}
    >
      <div className="flex items-center justify-between rounded-sm bg-in-green-900 px-4 py-1">
        <p className="font-bold text-in-gold-300">{trade.user.name}</p>
        {myTradesPath && (
          <>
            {!isDeleting ? (
              <Trash2
                className="text-red-500 hover:text-orange-400"
                size={20}
                onClick={confirmIcon}
              />
            ) : (
              <div className="flex items-center space-x-2">
                <BadgeCheck
                  className="text-green-300 hover:text-green-500"
                  size={24}
                  onClick={handleDelete}
                />
                <BadgeXIcon
                  className="text-red-300 hover:text-red-500"
                  size={24}
                  onClick={() => setIsDeleting(false)}
                />
              </div>
            )}
          </>
        )}
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
