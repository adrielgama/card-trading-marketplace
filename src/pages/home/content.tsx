import React, { useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom'

import Card from '@/assets/card.webp'
import { Button } from '@/components/ui/button'

export const Content: React.FC = () => {
  const navigate = useNavigate()

  const cardRef = useRef<HTMLImageElement>(null)
  const maxRotate = 20

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top, width, height } =
          cardRef.current.getBoundingClientRect()
        const x = ((e.clientX - (left + width / 2)) / width) * maxRotate
        const y = ((e.clientY - (top + height / 2)) / height) * maxRotate
        const rotateX = Math.max(Math.min(y, maxRotate), -maxRotate)
        const rotateY = Math.max(Math.min(x, maxRotate), -maxRotate)
        cardRef.current.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleClick = () => {
    navigate('/trades')
  }

  return (
    <div className="container grid min-h-screen grid-cols-1 text-white lg:grid-cols-2">
      <div className="mt-10 flex flex-col justify-start space-y-16 p-8 md:mt-0 md:max-w-xl md:justify-center md:space-y-4">
        <h1 className="text-4xl font-bold drop-shadow-md">
          Seu mundo virtual de troca de cartas
        </h1>
        <p className="text-lg drop-shadow-md">
          Acompanhe as nossas últimas solcitações de troca.
        </p>
        <Button
          onClick={handleClick}
          className="max-w-40 rounded bg-in-green-100 px-6 py-3 text-white drop-shadow-sm transition duration-300 hover:bg-in-green-900"
        >
          Explore
        </Button>
      </div>

      <div className="hidden items-center justify-center lg:flex">
        <img
          ref={cardRef}
          src={Card}
          alt="Card image"
          className="max-h-96 drop-shadow-xl transition-transform duration-100 ease-linear"
        />
      </div>
    </div>
  )
}
