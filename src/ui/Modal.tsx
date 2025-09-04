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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-primary-900 rounded-lg shadow-lg w-full p-6 relative ${width}`}
      >
        <button
          onClick={onClose}
          className="absolute text-2xl top-3 right-3 text-primary-300 hover:text-primary-100"
        >
          ✕
        </button>

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        <div>{children}</div>
      </div>
    </div>
  )
}
