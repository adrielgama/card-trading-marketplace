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
  signup: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const { 'inmeta.token': token } = parseCookies()
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
          maxAge: 30 * 24 * 60 * 60, // 30 dias
          path: '/',
        })
        setIsAuthenticated(true)
        setCurrentUser(user)
        navigate('/')
      } catch (error) {
        throw new Error('Falha no login. Verifique suas credenciais.')
      }
    },
    [navigate]
  )

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        await fetchData('/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        })
        navigate('/login')
      } catch (error) {
        throw new Error('Falha no cadastro. Verifique os dados inseridos.')
      }
    },
    [navigate]
  )

  const logout = useCallback(() => {
    destroyCookie(undefined, 'inmeta.token', { path: '/' })
    setIsAuthenticated(false)
    setCurrentUser(null)
    navigate('/')
  }, [navigate])

  const value = {
    isAuthenticated,
    currentUser,
    login,
    logout,
    signup,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
