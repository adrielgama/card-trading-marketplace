import { Suspense, lazy } from 'react'

import { Route, Navigate, Routes } from 'react-router-dom'

import { Spinner } from '@/components/shared/spinner'
import { useAuthContext } from '@/context/AuthContext'

import LayoutWrapper from './LayoutWrapper'
import ProtectedWrapper from './ProtectedWrapper'

const LazyLoginPage = lazy(() => import('@/pages/login'))
const LazySignupPage = lazy(() => import('@/pages/signup'))
const LazyHomePage = lazy(() => import('@/pages/home'))
const LazyTradePage = lazy(() => import('@/pages/trade'))
const LazyMyTradesPage = lazy(() => import('@/pages/my-trades'))
const LazyAccountPage = lazy(() => import('@/pages/account'))
const LazyNotFoundPage = lazy(() => import('@/pages/404'))

const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext()

  return (
    <Routes>
      <Route
        path="/home"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={
          <LayoutWrapper className="items-center justify-center">
            <Suspense fallback={<Spinner />}>
              <LazyLoginPage />
            </Suspense>
          </LayoutWrapper>
        }
      />
      <Route
        path="/signup"
        element={
          <LayoutWrapper className="items-center justify-center">
            <Suspense fallback={<Spinner />}>
              <LazySignupPage />
            </Suspense>
          </LayoutWrapper>
        }
      />
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <LazyHomePage />
          </Suspense>
        }
      />
      <Route
        path="/trades"
        element={
          <Suspense fallback={<Spinner />}>
            <LazyTradePage />
          </Suspense>
        }
      />
      <Route
        path="/my-trades"
        element={
          <Suspense fallback={<Spinner />}>
            <ProtectedWrapper>
              <LazyMyTradesPage />
            </ProtectedWrapper>
          </Suspense>
        }
      />
      <Route
        path="/my-account"
        element={
          <Suspense fallback={<Spinner />}>
            <ProtectedWrapper>
              <LazyAccountPage />
            </ProtectedWrapper>
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <Suspense fallback={<Spinner />}>
            <LazyNotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default AppRoutes
