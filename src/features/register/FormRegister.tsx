import { Link } from 'react-router-dom'

function FormRegister() {
  return (
    <form action="">
      <div className="mb-2 space-y-1">
        <label htmlFor="email" className="font-medium block">
          Email
        </label>
        <input type="email" className="input w-96" />
      </div>

      <div className="mb-2 space-y-1">
        <label htmlFor="username" className="font-medium block">
          Username
        </label>
        <input type="text" className="input w-96" />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="font-medium block">
          Password
        </label>
        <input type="password" className="input w-96" />
      </div>

      <button className="bg-accent-500 rounded-full px-8 py-4 mt-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all w-full">
        Sign Up
      </button>

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
