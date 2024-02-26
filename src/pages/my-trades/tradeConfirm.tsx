import React from 'react'

import { SingleCardBox } from '@/components/shared/cards/singleCardBox'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useTradesContext } from '@/context/TradesContext'

interface TradeConfirmationProps {
  onConfirm: () => void
  onGoBack?: () => void
}

const TradeConfirmation: React.FC<TradeConfirmationProps> = ({ onConfirm }) => {
  const { offering, receiving } = useTradesContext()
  const dialogClose = () => {
    document.getElementById('closeDialog')?.click()
  }

  const handleConfirm = async () => {
    await onConfirm()
    dialogClose()
  }

  return (
    <DialogContent className="h-[90vh] max-w-[80vw] bg-white lg:h-[85vh] lg:max-w-[60vw]">
      <DialogHeader className="text-left">
        <DialogTitle>Confirmar Troca</DialogTitle>
        <DialogDescription>
          Verifique as cartas que deseja trocar e receber.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold">Cartas Oferecidas</h2>
          <div className="flex w-[70vw] flex-row gap-4 overflow-auto lg:w-auto lg:flex-wrap">
            {offering.map((card) => (
              <SingleCardBox
                key={card.id}
                card={card}
                className="max-w-[5.5rem] lg:max-w-[6rem]"
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Cartas Recebidas</h2>
          <div className="flex w-[70vw] flex-row gap-4 overflow-auto lg:w-auto lg:flex-wrap">
            {receiving.map((card) => (
              <SingleCardBox
                key={card.id}
                card={card}
                className="max-w-[5.5rem] lg:max-w-[6rem]"
              />
            ))}
          </div>
        </div>
      </div>
      <DialogFooter>
        <div className="flex w-full items-center justify-between">
          <Button
            type="button"
            onClick={handleConfirm}
            className="w-full bg-green-500 text-white hover:bg-green-600"
          >
            Confirmar Troca
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

export default TradeConfirmation
