"use client"

import { useAuth } from "@/components/auth-provider"

const API_BASE_URL = "http://localhost:8000/api"

// Verificar se estamos em ambiente de preview/desenvolvimento
const isDemoMode =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname.includes("vercel.app"))

// Função para fazer requisições autenticadas
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Obter o token do localStorage (para uso em funções fora de componentes React)
  const token = localStorage.getItem("token")

  // Se estiver em modo de demonstração, retornar dados simulados
  if (isDemoMode) {
    console.log("Modo de demonstração: simulando chamada à API para", endpoint)

    // Simular um delay para parecer uma chamada real
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Retornar dados simulados com base no endpoint
    return getMockData(endpoint)
  }

  // Configurar headers com o token de autenticação
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  // Fazer a requisição
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // Verificar se a resposta é bem-sucedida
  if (!response.ok) {
    // Se o status for 401 (Unauthorized), podemos lidar com isso especificamente
    if (response.status === 401) {
      // Limpar o localStorage e redirecionar para login
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      window.location.href = "/login"
      throw new Error("Sessão expirada. Por favor, faça login novamente.")
    }

    // Para outros erros, tentar obter a mensagem de erro da API
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`)
  }

  // Retornar os dados da resposta
  return response.json()
}

// Hook para usar a API em componentes React
export function useApi() {
  const { token } = useAuth()

  // Função para fazer requisições autenticadas usando o token do contexto
  const fetchData = async (endpoint: string, options: RequestInit = {}) => {
    // Se estiver em modo de demonstração, retornar dados simulados
    if (isDemoMode) {
      console.log("Modo de demonstração: simulando chamada à API para", endpoint)

      // Simular um delay para parecer uma chamada real
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Retornar dados simulados com base no endpoint
      return getMockData(endpoint)
    }

    // Configurar headers com o token de autenticação
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }

    // Fazer a requisição
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    // Verificar se a resposta é bem-sucedida
    if (!response.ok) {
      // Para erros, tentar obter a mensagem de erro da API
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`)
    }

    // Retornar os dados da resposta
    return response.json()
  }

  return { fetchData }
}

// Função para gerar dados simulados com base no endpoint
function getMockData(endpoint: string) {
  // Aqui você pode adicionar mais endpoints conforme necessário
  if (endpoint.includes("/user")) {
    return {
      id: 1,
      name: "Usuário Demo",
      email: "demo@example.com",
      empresa_selecionada: 1,
    }
  }

  if (endpoint.includes("/dashboard")) {
    return {
      balance: 12543.78,
      pendingBalance: 23145.0,
      monthlyRevenue: 42368.89,
      conversionRate: 94.3,
    }
  }

  // Dados padrão para outros endpoints
  return {
    success: true,
    message: "Operação simulada concluída com sucesso",
    data: [],
  }
}
