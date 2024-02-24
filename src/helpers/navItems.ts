import { LucideIcon, Home, Handshake, LogIn, LogOut, Grip } from 'lucide-react'

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
      },
      {
        name: 'Minha conta',
        route: '/my-account',
      },
    ],
  },
  {
    name: 'Sair',
    icon: LogOut,
  },
]
