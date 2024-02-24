import React from 'react'

import { LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

type MobileNavItemProps = {
  name: string
  route: string
  Icon: LucideIcon
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ name, route, Icon }) => {
  const { pathname } = useLocation()
  return (
    <Link
      to={route}
      className={`flex flex-col items-center justify-center space-y-1 text-xs lg:text-sm ${
        pathname === route
          ? 'font-bold text-in-gold-200 hover:text-in-green-100'
          : 'text-white hover:text-in-green-100'
      } lg:hidden`}
    >
      {Icon && <Icon size="20" />}
      <span>{name}</span>
    </Link>
  )
}

export default React.memo(MobileNavItem)
