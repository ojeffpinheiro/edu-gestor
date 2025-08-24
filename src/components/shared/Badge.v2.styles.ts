import styled, { css } from 'styled-components';

const badgeVariants = {
  default: css`
    background: var(--color-primary);
    color: var(--color-text-on-primary);
  `,
  secondary: css`
    background: var(--color-secondary);
    color: var(--color-text-on-secondary);
  `,
  destructive: css`
    background: var(--color-error);
    color: var(--color-text-on-error);
  `,
  success: css`
    background: var(--color-success);
    color: var(--color-text-on-success);
  `,
  warning: css`
    background: var(--color-warning);
    color: var(--color-text-on-warning);
  `,
  outline: css`
    background: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-border);
  `
};

export const Badge = styled.span<{ $variant?: keyof typeof badgeVariants }>`
  display: inline-flex;
  align-items: center;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  
  ${({ $variant = 'default' }) => badgeVariants[$variant]}
`;