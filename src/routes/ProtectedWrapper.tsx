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
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login')
    } else if (isAuthenticated && location.pathname === '/login') {
      navigate('/')
    }
  }, [isAuthenticated, location.pathname, navigate])

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Spinner />
  }

  return <>{children}</>
}

export default ProtectedWrapper
