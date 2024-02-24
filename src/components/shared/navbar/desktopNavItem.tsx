import React from 'react'

import { Link, useLocation } from 'react-router-dom'

type DesktopNavItemProps = {
  name: string
  route: string
}

const DesktopNavItem: React.FC<DesktopNavItemProps> = ({ name, route }) => {
  const { pathname } = useLocation()
  return (
    <Link
      to={route}
      className={`hidden lg:flex lg:items-center lg:justify-center lg:space-x-4 ${
        pathname === route
          ? 'text-in-gold-200 font-bold hover:text-in-green-100'
          : 'text-white hover:text-in-green-100'
      }`}
    >
      {name}
    </Link>
  )
}

export default React.memo(DesktopNavItem)
