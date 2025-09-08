import { useSaveComments } from '../../hooks/useComment'
import type { ModalCommentProps } from '../../types/ui'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import SpinnerMini from '../../ui/SpinnerMini'

function ModalComment({
  isOpen,
  onCloseModal,
  item,
  purpose
}: ModalCommentProps) {
  const { saveComment, isLoading } = useSaveComments()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const content = (formData.get('content') as string)?.trim()

    if (!content) return

    const data = {
      content: formData.get('content') as string
    }

    saveComment(
      { payload: data, id: item?.documentId },
      {
        onSuccess: () => {
          form.reset()
          onCloseModal()
        }
      }
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <h2 className="text-lg font-semibold mb-4 border-b border-primary-800 pb-2">
        {purpose === 'create' ? 'Add New' : 'Edit'} Comment Article
      </h2>

      <form
        onSubmit={handleSubmit}
        className="py-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="mb-2 space-y-1">
          <label htmlFor="title" className="font-medium block">
            Content
          </label>
          <textarea
            defaultValue={item?.content}
            name="content"
            className="w-full h-24 input mb-2"
            placeholder="Write comment..."
          />
        </div>

        <Button disabled={isLoading}>
          <span>
            {isLoading
              ? 'Loading...'
              : purpose === 'create'
              ? 'Submit'
              : 'Update'}
          </span>
          {isLoading && <SpinnerMini />}
        </Button>
      </form>
    </Modal>
  )
}

export default ModalComment
