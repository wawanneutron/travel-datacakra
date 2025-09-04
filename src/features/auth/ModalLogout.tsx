import { useDispatch } from 'react-redux'
import type { ModalProps } from '../../types/ui'
import Modal from '../../ui/Modal'
import { logout } from './authSlice'
import toast from 'react-hot-toast'

function ModalLogout({ isOpen, onCloseModal }: ModalProps) {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logout successful')
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <div className="py-4">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCloseModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalLogout
