import styled, { css } from 'styled-components';

interface BadgeProps {
  $variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${({ $variant = 'default' }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background: var(--color-secondary);
          color: var(--color-secondary-foreground);
        `;
      case 'destructive':
        return css`
          background: var(--color-destructive);
          color: var(--color-destructive-foreground);
        `;
      case 'outline':
        return css`
          background: transparent;
          border-color: var(--color-border);
          color: var(--color-foreground);
        `;
      default:
        return css`
          background: var(--color-primary);
          color: var(--color-primary-foreground);
        `;
    }
  }}
`;