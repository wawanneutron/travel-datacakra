import type { ButtonProps } from '../types/ui'

function Button({ children, disabled = false }: ButtonProps) {
  return (
    <button
      className="bg-accent-500 disabled:bg-accent-800 rounded-full px-8 py-4 mt-6 text-primary-700 font-mono text-lg disabled:text-primary-400 font-semibold hover:bg-accent-600 transition-all w-full flex items-center justify-center gap-4"
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
