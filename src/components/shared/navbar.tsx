import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useAuthContext } from '@/context/AuthContext'
import {
  navItemsAuthenticated,
  navItemsUnauthenticated,
} from '@/helpers/navItems'

import { Logo } from './logo'

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuthContext()
  const { pathname } = useLocation()
  const navItems = isAuthenticated
    ? navItemsAuthenticated
    : navItemsUnauthenticated

  return (
    <div
      className={`${pathname === '/' ? 'bg-in-green-900/80' : 'bg-in-green-900'} fixed bottom-0 z-50 h-16 w-full p-4 text-white shadow-md lg:top-0 lg:h-20`}
    >
      <div className="mx-auto md:container">
        <nav className="flex w-full justify-between space-x-4 lg:justify-evenly">
          <Logo type="logo_inline_text" className="hidden h-12 lg:block" />
          <ul className="flex w-full justify-between space-x-8 lg:items-center lg:justify-end">
            {navItems.map(({ name, route, icon: Icon }) => (
              <li key={name}>
                <Link
                  to={route}
                  className={`flex flex-col items-center space-y-1 ${pathname === route ? 'text-in-gold-200 font-bold hover:text-in-green-100' : 'text-white hover:text-in-green-100'}`}
                >
                  {Icon && <Icon size="20" className="lg:hidden" />}
                  <span
                    className={`text-xs transition-all lg:text-sm ${name === 'Entrar' ? 'lg:rounded-md lg:bg-in-green-100 lg:px-8 lg:py-2 lg:text-white lg:hover:bg-white lg:hover:text-in-green-100' : ''}`}
                  >
                    {name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
