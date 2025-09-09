import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getToken } from '../features/auth/authSlice'

import FormRegister from '../features/auth/FormRegister'
import Logo from '../ui/Logo'

export default function Login() {
  const isLogin = useSelector(getToken)

  if (isLogin) return <Navigate to="/dashboard" />

  return (
    <section className="h-[80vh] m-auto flex flex-col items-center justify-center">
      <div className="bg-primary-900 w-full max-w-md rounded-lg shadow-lg px-6 pb-6">
        <div className="flex flex-col items-center gap-2 mb-4 border-b py-4 border-primary-800">
          <Logo label={false} />
          <h3 className="font-mono text-3xl">Sign Up</h3>
        </div>
        <FormRegister />
      </div>
    </section>
  )
}
