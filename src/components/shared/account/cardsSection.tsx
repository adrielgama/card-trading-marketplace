import React, { useEffect } from 'react'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useUserCards } from '@/hooks/useUserCards'
import { MyCardsSection } from '@/pages/account/myCards'

import { Spinner } from '../spinner'

const CardsSelectionDialog = React.lazy(
  () => import('@/components/shared/account/cardSelectionDialog')
)

const CardsSection: React.FC = () => {
  const { data: userCardsData, isLoading, error } = useUserCards()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const openDialog = () => setIsDialogOpen(true)

  useEffect(() => {
    if (error) {
      toast(`Error: ${error.message}`)
    }
  }, [error])

  if (isLoading) {
    return <Spinner />
  }

  const ButtonDialog = (
    <Dialog>
      <div className="my-2 flex h-[75vh] flex-col items-center justify-center space-y-4 bg-in-green-50/80 p-4 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-in-green-300 lg:text-3xl">
          Você ainda não tem cartas.
        </h1>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="bg-in-green-300 text-white hover:bg-in-green-100"
            onClick={openDialog}
          >
            Adicionar cartas
          </Button>
        </DialogTrigger>
      </div>
      <CardsSelectionDialog />
    </Dialog>
  )

  if (error || !userCardsData?.length) {
    return ButtonDialog
  }

  return (
    <Dialog>
      <div className="h-[75vh] space-y-4 bg-in-green-50/80 p-4 backdrop-blur-md">
        <DialogTrigger asChild>
          <Button
            type="button"
            className="relative w-full bg-in-green-300 text-white hover:bg-in-green-100"
            onClick={openDialog}
          >
            Adicionar mais cartas
          </Button>
        </DialogTrigger>
        <ScrollArea className="h-[60vh] rounded-md border bg-white p-4">
          <div className="flex flex-wrap justify-center gap-4">
            <MyCardsSection cards={userCardsData!} />
          </div>
        </ScrollArea>
      </div>
      {isDialogOpen && (
        <React.Suspense fallback={<Spinner />}>
          <CardsSelectionDialog />
        </React.Suspense>
      )}
    </Dialog>
  )
}

export default CardsSection
