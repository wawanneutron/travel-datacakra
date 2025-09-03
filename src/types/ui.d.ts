type ButtonSize = 'small' | 'medium' | 'large'
type ButtonVariation = 'primary' | 'secondary' | 'danger'

export interface ButtonProps {
  size?: ButtonSize
  variation?: ButtonVariation
}
