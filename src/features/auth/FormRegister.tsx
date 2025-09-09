import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useRegister } from '../../hooks/useRegister'
import type { RegisterPayload } from '../../types/auth'
import Button from '../../ui/Button'
import SpinnerMini from '../../ui/SpinnerMini'

function FormRegister() {
  const { createAccount, isLoading } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterPayload>()

  const onSubmit: SubmitHandler<RegisterPayload> = (data) => {
    const payload: RegisterPayload = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim()
    }

    createAccount(payload)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 space-y-1">
        <label htmlFor="username" className="font-medium block">
          Username
        </label>

        <input
          type="text"
          className="input w-full"
          {...register('username', { required: 'Username is required' })}
        />

        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-2 space-y-1">
        <label htmlFor="email" className="font-medium block">
          Email
        </label>

        <input
          type="email"
          className="input w-full"
          {...register('email', { required: 'Email is required' })}
        />

        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
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
        <span>{isLoading ? 'Loading...' : 'Sign Up'}</span>
        {isLoading && <SpinnerMini />}
      </Button>

      <div className="flex justify-end gap-4 mt-6">
        <span>back to sign in</span>
        <Link to="/login" className="underline">
          Sign in
        </Link>
      </div>
    </form>
  )
}

export default FormRegister
