import React from 'react'

import { cn } from '@/lib/utils'

interface HeaderTitleProps {
  className?: string
  title: string
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  className,
}) => {
  return (
    <div className="flex w-full flex-row items-center justify-between bg-gradient-to-r from-in-green-100 to-transparent">
      <h1
        className={cn(
          'px-4 py-2 text-3xl font-bold text-white lg:pt-4',
          className
        )}
      >
        {title}
      </h1>
      <div className="absolute right-[10%] z-50 flex animate-pulse items-center space-x-2 px-4 transition-all">
        <span className="bg-in-gold-300 h-2 w-2" />
        <span className="h-2 w-2 bg-in-green-100" />
        <span className="h-2 w-2 bg-white" />
      </div>
    </div>
  )
}
