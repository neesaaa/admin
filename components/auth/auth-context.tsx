"use client"

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string, remember: boolean) => void
  logout: () => void
  clearError: () => void
}

// Mock admin users - in a real app, this would come from an API
const adminUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "nassar@gmail.com",
    password: "123", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: 2,
    name: "Test User",
    email: "test@example.com",
    password: "test123", // In a real app, this would be hashed
    role: "manager",
  },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have a stored user in localStorage
        const storedUser = localStorage.getItem("astrcloud_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to restore auth state:", error)
      } finally {
        setIsInitialized(true)
      }
    }

    checkAuth()
  }, [])

  const login = (email: string, password: string, remember: boolean) => {
    setIsLoading(true)
    setError(null)

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Find user by email
        const foundUser = adminUsers.find((u) => u.email === email)

        // Check if user exists and password matches
        if (!foundUser || foundUser.password !== password) {
          throw new Error("Invalid email or password")
        }

        // Create a user object without the password
        const { password: _, ...userWithoutPassword } = foundUser

        // Set the user in state
        setUser(userWithoutPassword)

        // Store user in localStorage if remember is checked
        if (remember) {
          localStorage.setItem("astrcloud_user", JSON.stringify(userWithoutPassword))
        }

        // Redirect to dashboard
        router.push("/pages/dashboard")
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }, 1000) // Simulate network delay
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("astrcloud_user")
    router.push("/login")
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, clearError }}>
      {isInitialized ? children : <div className="h-screen w-screen bg-[#0a2a3f]"></div>}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
