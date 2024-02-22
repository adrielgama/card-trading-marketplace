import axios from 'axios'
import { parseCookies } from 'nookies'
import { toast } from 'sonner'

const { VITE_API_URL } = import.meta.env

export async function fetchData(
  endpoint: string,
  { method = 'GET', body = null }: { method?: string; body?: string | null }
) {
  const { token } = parseCookies()
  const config = {
    method,
    url: `${VITE_API_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: body ? JSON.parse(body) : null,
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    let errorMessage = 'Ocorreu um erro inesperado.'
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Erro ${error.response.status}: ${error.response.statusText}`
      } else if (error.request) {
        errorMessage = 'Nenhuma resposta recebida do servidor.'
      } else {
        errorMessage = 'Erro ao configurar a requisição.'
      }
    }
    toast.error(errorMessage)
    throw error
  }
}
