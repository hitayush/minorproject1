import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Moon, Sun, LogOut, User, MessageSquare, Home } from 'lucide-react'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Careerly AI</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 hover:text-primary">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link to="/chatbot" className="flex items-center space-x-1 hover:text-primary">
              <MessageSquare className="h-4 w-4" />
              <span>Chatbot</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-1 hover:text-primary">
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-500 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-primary">Login</Link>
                <Link 
                  to="/signup" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}














