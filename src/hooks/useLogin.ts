import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuth } from '../features/auth/authSlice'
import { fetchLogin } from '../services/apiAuth'
import type { AuthResponse, LoginPayload } from '../types/auth'

export function useLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { mutate: authLogin, isPending: isLoading } = useMutation({
    mutationFn: (payload: LoginPayload) => fetchLogin(payload),

    onSuccess: (data: AuthResponse) => {
      toast.success('Login successful')

      // dispatch to redux
      dispatch(setAuth({ user: data.user, token: data.jwt }))

      // save to localStorage
      localStorage.setItem('token', data.jwt)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/dashboard')
    },

    onError: (error: Error) => toast.error(`Login failed: ${error.message}`)
  })

  return { authLogin, isLoading }
}
