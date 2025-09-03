import { Link } from 'react-router-dom'

function FormLogin() {
  return (
    <form action="">
      <div className="mb-2 space-y-1">
        <label htmlFor="email" className="font-medium block">
          Email
        </label>
        <input type="email" className="input w-96" />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="font-medium block">
          Password
        </label>
        <input type="password" className="input w-96" />
      </div>

      <Link
        to="/dashboard"
        className="bg-accent-500 block rounded-full px-8 py-4 mt-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all w-full"
      >
        Sign In
      </Link>

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
