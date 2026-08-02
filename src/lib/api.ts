import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
})

// Interceptador de Requisição (Request)
api.interceptors.request.use((config) => {
  // Pega o token salvo no localStorage (ou na sua store Zustand)
  const token = localStorage.getItem('token') // ex: '@lojinha:token'

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// Interceptador de Resposta (Response) - Opcional, mas muito útil
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se a API retornar 401 (Não autorizado), redireciona para o login
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)