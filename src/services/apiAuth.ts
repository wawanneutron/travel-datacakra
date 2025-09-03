import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth'

const BASE_API = import.meta.env.VITE_API_URL

export const fetchRegister = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_API}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.error?.message || 'Failed to register')
  }

  return res.json()
}

export const fetchLogin = async (payload: LoginPayload) => {
  const res = await fetch(`${BASE_API}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.error?.message || 'Failed to login')
  }

  return res.json()
}
