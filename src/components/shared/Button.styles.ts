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
  white-space: nowrap;
  cursor: pointer;
  border: none;
  line-height: 1.5;
  outline: none;

  ${({ $variant = 'primary' }) => buttonVariants[$variant]}
  ${({ $size = 'md' }) => sizeVariants[$size]}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}

  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const IconButton = styled(Button)`
  padding: var(--space-xs);
  border-radius: var(--border-radius-full);
  aspect-ratio: 1/1;
`;