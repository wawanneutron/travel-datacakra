export type RegisterPayload = Register

interface AuthState {
  user: User | null
  token: string | null
}

interface AuthGetterState {
  auth: AuthState
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  jwt: string
  user: User
}

export interface User {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string | null
}

export interface LoginPayload {
  identifier: string
  password: string
}
