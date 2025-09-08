import type { ModalComponentProps } from '../types/ui'

export default function Modal({
  isOpen,
  onClose,
  title,
  width = 'max-w-lg',
  children
}: ModalComponentProps) {
  if (!isOpen) return null

  return (
    <div className="px-4 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-primary-900 rounded-lg shadow-lg w-full p-6 relative ${width}`}
      >
        <button
          onClick={onClose}
          className="absolute text-2xl top-3 right-6 text-primary-300 hover:text-primary-100"
        >
          ✕
        </button>

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        <div className="max-h-[70vh] sm:max-h-svh overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
