import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { ChildrenProps } from '../../types'
import { getToken } from './authSlice'

export default function ProtectedRoute({ children }: ChildrenProps) {
  const isLogin = useSelector(getToken)

  if (!isLogin) return <Navigate to="/login" replace />

  return <>{children}</>
}
