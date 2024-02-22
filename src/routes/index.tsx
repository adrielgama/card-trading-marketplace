import { Suspense, lazy } from 'react'

import { Route, Navigate, Routes } from 'react-router-dom'

import { Spinner } from '@/components/shared/spinner'
import { useAuthContext } from '@/context/AuthContext'

import ProtectedWrapper from './ProtectedWrapper'

const LazyLoginPage = lazy(() => import('@/pages/login'))
// const LazyHomePage = lazy(() => import('@/pages/home'))

const RedirectToLoginOrHome = () => {
  const { isAuthenticated } = useAuthContext()
  return isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RedirectToLoginOrHome />} />
    <Route
      path="/login"
      element={
        <Suspense fallback={<Spinner />}>
          <ProtectedWrapper>
            <LazyLoginPage />
          </ProtectedWrapper>
        </Suspense>
      }
    />
    {/* <Route
      path="/home"
      element={
        <Suspense fallback={<Spinner />}>
          <ProtectedWrapper>
            <LazyHomePage />
          </ProtectedWrapper>
        </Suspense>
      }
    /> */}
  </Routes>
)

export default AppRoutes
