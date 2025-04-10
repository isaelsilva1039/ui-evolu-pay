"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  empresa_selecionada: number
}

type AuthContextType = {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }

    setIsLoading(false)
  }, [])

  // Redirecionar com base no estado de autenticação
  useEffect(() => {
    if (!isLoading) {
      const isAuthPage = pathname === "/login" || pathname === "/"

      if (!user && !isAuthPage) {
        router.push("/login")
      } else if (user && isAuthPage) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  // Modificar a função login para adicionar tratamento de erro e modo de demonstração
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // Verificar se estamos em ambiente de preview/desenvolvimento
      const isDemoMode =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" || window.location.hostname.includes("vercel.app"))

      // Modo de demonstração para quando a API não estiver disponível
      if (isDemoMode) {
        // Simular um delay para parecer uma chamada real
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Verificar credenciais de demonstração
        if (email === "demo@example.com" && password === "password") {
          const demoUser = {
            id: 1,
            name: "Usuário Demo",
            email: "demo@example.com",
            email_verified_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            empresa_selecionada: 1,
          }

          const demoToken = "demo-token-12345"

          // Salvar dados no localStorage
          localStorage.setItem("user", JSON.stringify(demoUser))
          localStorage.setItem("token", demoToken)

          // Atualizar estado
          setUser(demoUser)
          setToken(demoToken)

          // Redirecionar para o dashboard
          router.push("/dashboard")
          return
        } else if (email === "isaelsilva1039@gmail.com" && password === "99322065") {
          // Credenciais fornecidas pelo usuário
          const demoUser = {
            id: 26,
            name: "Isael Silva",
            email: "isaelsilva1039@gmail.com",
            email_verified_at: null,
            created_at: "2025-03-08T03:12:04.000000Z",
            updated_at: "2025-03-08T03:12:04.000000Z",
            empresa_selecionada: 24,
          }

          const demoToken = "39|ZPzZIrW7gHEcCBTofXNEVsu0nc1qqh7W9QPNhp6X57cade83"

          // Salvar dados no localStorage
          localStorage.setItem("user", JSON.stringify(demoUser))
          localStorage.setItem("token", demoToken)

          // Atualizar estado
          setUser(demoUser)
          setToken(demoToken)

          // Redirecionar para o dashboard
          router.push("/dashboard")
          return
        } else {
          throw new Error("Credenciais inválidas. Use demo@example.com / password ou as credenciais fornecidas.")
        }
      }

      // Código original para ambiente de produção
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Falha na autenticação")
      }

      const data = await response.json()

      // Salvar dados no localStorage
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.evolu_token)

      // Atualizar estado
      setUser(data.user)
      setToken(data.evolu_token)

      // Redirecionar para o dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Erro de login:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Limpar localStorage
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    // Limpar estado
    setUser(null)
    setToken(null)

    // Redirecionar para login
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
