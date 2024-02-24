import {
  LucideIcon,
  Home,
  Handshake,
  LogIn,
  SquareDashedBottom,
  Library,
  LogOut,
  Grip,
} from 'lucide-react'

export interface NavItem {
  name?: string
  route?: string
  icon?: LucideIcon
  subMenu?: NavItem[]
}

export const navItemsUnauthenticated: NavItem[] = [
  {
    name: 'Início',
    route: '/',
    icon: Home,
  },
  {
    name: 'Trocas',
    route: '/trades',
    icon: Handshake,
  },
  {
    name: 'Entrar',
    route: '/login',
    icon: LogIn,
  },
]

export const navItemsAuthenticated: NavItem[] = [
  ...navItemsUnauthenticated.filter((item) => item.name !== 'Entrar'),
  {
    name: 'Mais',
    icon: Grip,
    subMenu: [
      {
        name: 'Minhas Trocas',
        route: '/my-trades',
        icon: SquareDashedBottom,
      },
      {
        name: 'Minhas Cartas',
        route: '/my-cards',
        icon: Library,
      },
    ],
  },
  {
    name: 'Sair',
    icon: LogOut,
  },
]
