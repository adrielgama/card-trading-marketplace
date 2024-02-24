import {
  Home,
  Handshake,
  LogIn,
  SquareDashedBottom,
  Library,
  LucideIcon,
} from 'lucide-react'

interface NavItem {
  name: string
  route: string
  icon: LucideIcon
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
    name: 'Minhas Trocas',
    route: '/my-trades',
    icon: SquareDashedBottom,
  },
  {
    name: 'Minhas Cartas',
    route: '/my-cards',
    icon: Library,
  },
]
