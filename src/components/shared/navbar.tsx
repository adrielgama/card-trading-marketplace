import React from 'react'

import { useLocation } from 'react-router-dom'

// import { useAuthContext } from '@/context/AuthContext'
import {
  navItemsAuthenticated,
  // navItemsUnauthenticated,
} from '@/helpers/navItems'

import { Logo } from './logo'
import DesktopNavItem from './navbar/desktopNavItem'
import DropdownLink from './navbar/dropdownLink'
import MobileNavItem from './navbar/mobileNavItem'
import SubMenuItem from './navbar/subMenuItem'

export const Navbar: React.FC = () => {
  // const { isAuthenticated } = useAuthContext()
  const { pathname } = useLocation()
  // const navItems = isAuthenticated
  //   ? navItemsAuthenticated
  //   : navItemsUnauthenticated
  const navItems = navItemsAuthenticated

  return (
    <div
      className={`${pathname === '/' ? 'bg-in-green-900/80' : 'bg-in-green-900'}
        fixed bottom-0 z-50 h-16 w-full p-4 text-white shadow-md lg:top-0 lg:h-20`}
    >
      <div className="mx-auto md:container">
        <nav className="flex w-full justify-between space-x-4 lg:justify-evenly">
          <Logo type="logo_inline_text" className="hidden h-12 lg:block" />
          <ul className="flex w-full items-center justify-between space-x-8 lg:items-center lg:justify-end">
            {navItems.map(({ name, route, icon: Icon, subMenu }) => (
              <li key={name} className="relative">
                {subMenu ? (
                  <>
                    <div className="lg:hidden">
                      <DropdownLink
                        name={name!}
                        icon={Icon!}
                        subMenu={subMenu!}
                      />
                    </div>
                    <div className="hidden space-y-1 lg:flex lg:flex-row lg:gap-8 lg:space-y-0">
                      {name && (
                        <span className="text-xs lg:hidden">{name}</span>
                      )}
                      {subMenu.map((subItem) => (
                        <SubMenuItem
                          key={subItem.name}
                          name={subItem.name!}
                          route={subItem.route!}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <MobileNavItem name={name!} route={route!} Icon={Icon!} />
                )}
                {!subMenu && <DesktopNavItem name={name!} route={route!} />}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
