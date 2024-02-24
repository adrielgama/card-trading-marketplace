import React from 'react'

import { Link, useLocation } from 'react-router-dom'

type SubMenuItemProps = {
  name: string
  route: string
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ name, route }) => {
  const { pathname } = useLocation()
  return (
    <Link
      to={route}
      className={`p-2 text-xs lg:p-0 lg:text-base ${
        pathname === route ? 'font-bold text-in-gold-200' : 'text-white'
      } hover:bg-in-green-700 lg:hover:text-in-green-100`}
    >
      {name}
    </Link>
  )
}

export default React.memo(SubMenuItem)
