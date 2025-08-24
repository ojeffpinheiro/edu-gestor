import styled, { css } from 'styled-components';
import { buttonVariants, sizeVariants } from '../../styles/variants';

export interface ButtonProps {
  $variant?: keyof typeof buttonVariants;
  $size?: keyof typeof sizeVariants;
  $fullWidth?: boolean;
  $active?: boolean
}

export const Button = styled.button<ButtonProps>`
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-all);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  cursor: pointer;
  border: none;
  line-height: 1.5;

  ${({ $variant = 'primary' }) => buttonVariants[$variant]}
  ${({ $size = 'md' }) => sizeVariants[$size]}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const IconButton = styled(Button)`
  padding: var(--space-xs);
  border-radius: var(--border-radius-full);
  aspect-ratio: 1/1;
`;