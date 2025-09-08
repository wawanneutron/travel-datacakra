import type { IconType } from 'react-icons/lib'
import type { ChildrenProps } from '.'
import type { CategoryItem } from './category'
import type { TravelItem } from './travel'
import type { Comment } from './comment'

type PurposeType = 'create' | 'edit'
type TypeDelete = 'category' | 'article' | 'comment'

export interface ButtonProps extends ChildrenProps {
  disabled?: boolean
  onClick?: () => void
}

export interface ModalComponentProps {
  children: ReactNode
  isOpen: boolean
  title?: string
  width?: string
  onClose: () => void
}

export interface ModalProps {
  isOpen: boolean
  purpose?: PurposeType
  item?: TravelItem
  itemCategory?: (category: CategoryItem) => void
  onCloseModal: () => void
}

export interface ModalCategoryProps {
  isOpen: boolean
  purpose?: PurposeType
  item?: CategoryItem
  onCloseModal: () => void
}

export interface ModalCommentProps {
  isOpen: boolean
  purpose?: PurposeType
  item?: Comment
  onCloseModal: () => void
}

export interface ModalDeleteProps {
  isOpen: boolean
  documentId?: string
  TypeDelete: TypeDelete
  onCloseModal: () => void
}

export interface NavLink {
  name: string
  href: string
  icon: IconType
}
