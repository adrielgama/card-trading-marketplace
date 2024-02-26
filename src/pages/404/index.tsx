import { useNavigate } from 'react-router-dom'

import BackgroundImage from '@/assets/bg-green-smoke.webp'
import { Button } from '@/components/ui/button'
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <h1 className="text-[9rem] font-bold text-green-300 mix-blend-hard-light lg:text-[14rem]">
        404
      </h1>
      <p className="text-xl font-bold text-in-green-50 mix-blend-color-dodge">
        Página não encontrada.
      </p>
      <Button
        className="mt-10 bg-in-green-100/90 text-white hover:bg-in-green-300/90"
        onClick={() => navigate('/')}
      >
        Voltar para o início
      </Button>
    </div>
  )
}

export default NotFound
