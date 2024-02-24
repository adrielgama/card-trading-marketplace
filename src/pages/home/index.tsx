import React, { useEffect, useRef } from 'react'

import FantasyBG from '@/assets/fantasy-bg.webp'
import { Navbar } from '@/components/shared/navbar'

import { Content } from './content'

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    for (let i = 0; i < 30; i++) {
      const firefly = document.createElement('span')
      firefly.classList.add('firefly')
      container.appendChild(firefly)

      const blinkDuration = Math.random() * 5 + 2
      const floatDuration = Math.random() * 5 + 5
      firefly.style.animation = `blink ${blinkDuration}s infinite, float ${floatDuration}s infinite`

      firefly.style.top = Math.random() * container.clientHeight + 'px'
      firefly.style.left = Math.random() * container.clientWidth + 'px'
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-cover bg-left"
      style={{
        backgroundImage: `url(${FantasyBG})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="relative z-10">
        <Navbar />
        <Content />
      </div>
    </div>
  )
}

export default Home
