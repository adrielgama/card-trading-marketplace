import { BrowserRouter as Router } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/context/AuthContext'

import './globals.css'
import { TradesProvider } from './context/TradesContext'
import { UserProvider } from './context/UserContext'
import AppRoutes from './routes'

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        richColors
        theme="light"
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
          },
        }}
      />
      <AuthProvider>
        <UserProvider>
          <TradesProvider>
            <AppRoutes />
          </TradesProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
