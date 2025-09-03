import type React from 'react'
import { Link } from 'react-router-dom'
import { useRegister } from '../../hooks/useRegister'
import SpinnerMini from '../../ui/SpinnerMini'
import Button from '../../ui/Button'

function FormRegister() {
  const { createAccount, isLoading } = useRegister()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    createAccount({
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2 space-y-1">
        <label htmlFor="username" className="font-medium block">
          Username
        </label>
        <input name="username" type="text" className="input w-96" />
      </div>

      <div className="mb-2 space-y-1">
        <label htmlFor="email" className="font-medium block">
          Email
        </label>
        <input name="email" type="email" className="input w-96" />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="font-medium block">
          Password
        </label>
        <input name="password" type="password" className="input w-96" />
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
