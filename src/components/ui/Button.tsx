import styled, { css } from 'styled-components';

interface ButtonProps {
  $variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success' | 'hero' | 'gradient';
  $size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Variants
  ${({ $variant = 'default' }) => {
    switch ($variant) {
      case 'destructive':
        return css`
          background: var(--color-destructive);
          color: var(--color-destructive-foreground);
          &:hover { background: var(--color-destructive-hover); }
        `;
      case 'outline':
        return css`
          border: 1px solid var(--color-border);
          background: transparent;
          &:hover { background: var(--color-accent); }
        `;
      case 'secondary':
        return css`
          background: var(--color-secondary);
          color: var(--color-secondary-foreground);
          &:hover { background: var(--color-secondary-hover); }
        `;
      case 'success':
        return css`
          background: var(--color-success);
          color: white;
          box-shadow: var(--shadow-success);
          &:hover { background: var(--color-success-hover); }
        `;
      case 'hero':
        return css`
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
          color: white;
          box-shadow: var(--shadow-elegant);
          &:hover {
            transform: scale(1.05);
            box-shadow: var(--shadow-lg);
          }
        `;
      case 'gradient':
        return css`
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: var(--shadow-elegant);
          &:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }
        `;
      default:
        return css`
          background: var(--color-primary);
          color: var(--color-primary-foreground);
          box-shadow: var(--shadow-elegant);
          &:hover { background: var(--color-primary-hover); }
        `;
    }
  }}

  // Sizes
  ${({ $size = 'default' }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 2.25rem;
          padding: 0 0.75rem;
          font-size: 0.75rem;
        `;
      case 'lg':
        return css`
          height: 2.75rem;
          padding: 0 2rem;
        `;
      case 'icon':
        return css`
          height: 2.5rem;
          width: 2.5rem;
        `;
      default:
        return css`
          height: 2.5rem;
          padding: 0 1rem;
        `;
    }
  }}
`;