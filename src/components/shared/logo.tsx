import React from 'react'

import DefaultLogo from '@/assets/logo.webp'
import LogoInlineText from '@/assets/logo_inline_text.webp'
import LogoText from '@/assets/logo_text.webp'
import { cn } from '@/lib/utils'

interface LogoProps {
  type?: 'logo' | 'logo_text' | 'logo_inline_text'
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ type = 'logo', className }) => {
  const logoMap = {
    logo: DefaultLogo,
    logo_text: LogoText,
    logo_inline_text: LogoInlineText,
  }

  const SelectedLogo = logoMap[type]

  return (
    <img
      src={SelectedLogo}
      alt="Logo INMETA Market"
      className={cn('h-28', className)}
    />
  )
}
