import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'

import { setCookie, destroyCookie, parseCookies } from 'nookies'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { fetchData } from '@/api/fetchData'

interface IUser {
  id: string
  name: string
  email: string
}

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContextData {
  isAuthenticated: boolean
  currentUser: IUser | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const { token } = parseCookies()
    setIsAuthenticated(!!token)
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const data = await fetchData('/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        })

        const { token, user } = data
        setCookie(undefined, 'inmeta.token', token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        setIsAuthenticated(true)
        setCurrentUser(user)
        toast.success('Login efetuado com sucesso!')
        navigate('/')
      } catch (error) {
        toast.error('Falha no login. Verifique suas credenciais.')
      }
    },
    [navigate]
  )

  const logout = useCallback(() => {
    destroyCookie(undefined, 'inmeta.token', { path: '/' })
    setIsAuthenticated(false)
    setCurrentUser(null)
    navigate('/login')
  }, [navigate])

  const value = {
    isAuthenticated,
    currentUser,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
