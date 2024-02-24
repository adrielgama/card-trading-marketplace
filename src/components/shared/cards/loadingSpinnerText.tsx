import { Loader } from 'lucide-react'

export const LoadingSpinnerText = () => {
  return (
    <div className="flex animate-pulse items-center space-x-2">
      <div aria-label="Loading..." role="status">
        <div className="animate-spin text-in-gold-200">
          <Loader size={16} />
        </div>
      </div>
      <span className="text-xs text-in-gold-300">Carregando mais cards...</span>
    </div>
  )
}
