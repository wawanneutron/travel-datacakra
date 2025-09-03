import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import Button from '../../ui/Button'
import SpinnerMini from '../../ui/SpinnerMini'

function FormLogin() {
  const { authLogin, isLoading } = useLogin()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    authLogin({
      identifier: formData.get('identifier') as string,
      password: formData.get('password') as string
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2 space-y-1">
        <label htmlFor="identifier" className="font-medium block">
          Username
        </label>
        <input name="identifier" type="text" className="input w-96" />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="font-medium block">
          Password
        </label>
        <input name="password" type="password" className="input w-96" />
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
