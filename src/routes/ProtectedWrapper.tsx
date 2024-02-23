import React, { ReactNode, useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { Spinner } from '@/components/shared/spinner'
import { useAuthContext } from '@/context/AuthContext'

interface ProtectedWrapperProps {
  children: ReactNode
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const authPages = ['/login', '/signup']

    if (isAuthenticated && authPages.includes(location.pathname)) {
      navigate('/')
    } else if (!isAuthenticated && !authPages.includes(location.pathname)) {
      navigate('/login')
    }
  }, [isAuthenticated, location.pathname, navigate])

  if (!isAuthenticated && !['/login', '/signup'].includes(location.pathname)) {
    return <Spinner />
  }

  return <>{children}</>
}

export default ProtectedWrapper
