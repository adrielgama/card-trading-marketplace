import { BrowserRouter as Router } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/context/AuthContext'

import './globals.css'
import AppRoutes from './routes'

function App() {
  return (
    <Router>
      <Toaster
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
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
