import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useAuthContext } from '@/context/AuthContext'

type DesktopNavItemProps = {
  name: string
  route: string
}

const DesktopNavItem: React.FC<DesktopNavItemProps> = ({ name, route }) => {
  const { pathname } = useLocation()
  const { logout } = useAuthContext()

  const handleLogout = () => {
    if (name === 'Sair') return logout()
  }
  return (
    <Link
      to={route}
      className={`hidden lg:flex lg:items-center lg:justify-center lg:space-x-4 ${
        pathname === route
          ? 'font-bold text-in-gold-200 hover:text-in-green-100'
          : 'text-white hover:text-in-green-100'
      }`}
      onClick={name === 'Sair' ? handleLogout : undefined}
    >
      {name}
    </Link>
  )
}

export default React.memo(DesktopNavItem)
