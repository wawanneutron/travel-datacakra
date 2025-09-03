import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuth } from '../features/auth/authSlice'
import { fetchRegister } from '../services/apiAuth'
import type { AuthResponse, RegisterPayload } from '../types/auth'

export function useRegister() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { mutate: createAccount, isPending: isLoading } = useMutation({
    mutationFn: (payload: RegisterPayload) => fetchRegister(payload),

    onSuccess: (data: AuthResponse) => {
      toast.success('Register successful')

      console.log('data register: ', data)

      // dispatch to redux
      dispatch(setAuth({ user: data.user, token: data.jwt }))

      // save to localStorage
      localStorage.setItem('token', data.jwt)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/dashboard')
    },

    onError: (error: Error) => toast.error(`Register failed: ${error.message}`)
  })

  return { createAccount, isLoading }
}
