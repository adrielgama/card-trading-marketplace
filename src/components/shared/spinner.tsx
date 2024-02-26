import { Loader } from 'lucide-react'

import BackgroundImage from '@/assets/bg-green-smoke.webp'

import { Logo } from './logo'

interface SpinnerProps {
  coverText?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  coverText = 'Carregando...',
}) => {
  return (
    <div
      className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})`, opacity: 0.9 }}
    >
      <div className="flex flex-col items-center space-y-2">
        <Logo />
        <div className="flex animate-pulse items-center space-x-2">
          <div aria-label="Loading..." role="status">
            <div className="animate-spin text-in-green-50">
              <Loader size={16} />
            </div>
          </div>
          <span className="text-sm font-medium text-in-green-50">
            {coverText}
          </span>
        </div>
      </div>
    </div>
  )
}
