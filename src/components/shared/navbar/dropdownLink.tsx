import React from 'react'

import { Link } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { NavItem } from '@/helpers/navItems'

type DropdownLinkProps = {
  name: string
  icon: React.ElementType
  subMenu: NavItem[]
}

const DropdownLink: React.FC<DropdownLinkProps> = ({
  name,
  icon: Icon,
  subMenu,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex flex-col items-center justify-center space-y-1">
        {Icon && <Icon size="20" />}
        <span className="text-xs">{name}</span>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-in-green-900">
      {subMenu.map((subItem) => (
        <DropdownMenuItem key={subItem.name} asChild>
          <Link
            to={subItem.route!}
            className="hover:bg-in-green-700 p-2 text-white"
          >
            {subItem.name}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

export default React.memo(DropdownLink)
