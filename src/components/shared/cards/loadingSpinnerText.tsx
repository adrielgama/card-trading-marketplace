import { Loader } from 'lucide-react'

export const LoadingSpinnerText = () => {
  return (
    <div className="flex animate-pulse items-center space-x-2">
      <div aria-label="Loading..." role="status">
        <div className="text-in-gold-200 animate-spin">
          <Loader size={16} />
        </div>
      </div>
      <span className="text-in-gold-300 text-xs">Carregando mais cards...</span>
    </div>
  )
}
