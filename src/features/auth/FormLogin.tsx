import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import Button from '../../ui/Button'
import SpinnerMini from '../../ui/SpinnerMini'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { LoginPayload } from '../../types/auth'

function FormLogin() {
  const { authLogin, isLoading } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginPayload>()

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    const payload: LoginPayload = {
      identifier: data.identifier.trim(),
      password: data.password.trim()
    }

    authLogin(payload)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 space-y-1">
        <label htmlFor="identifier" className="font-medium block">
          Username
        </label>

        <input
          type="text"
          className="input w-full"
          {...register('identifier', { required: 'Username is required' })}
        />

        {errors.identifier && (
          <p className="text-red-500 text-sm">{errors.identifier.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="font-medium block">
          Password
        </label>

        <input
          type="password"
          className="input w-full"
          {...register('password', { required: 'Password is required' })}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <Button disabled={isLoading}>
        <span>{isLoading ? 'Loading...' : 'Sign In'}</span>
        {isLoading && <SpinnerMini />}
      </Button>

      <div className="flex justify-end gap-4 mt-6">
        <span>Don't have an account?</span>
        <Link to="/register" className="underline">
          Sign up
        </Link>
      </div>
    </form>
  )
}

export default FormLogin
