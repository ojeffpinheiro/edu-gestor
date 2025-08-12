import { css } from 'styled-components';

export const buttonVariants = {
  primary: css`
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    &:hover {
      background-color: var(--color-primary-hover);
    }
    &:active {
      background-color: var(--color-primary-active);
    }
  `,
  secondary: css`
    background-color: var(--color-secondary);
    color: var(--color-text-on-primary);
    &:hover {
      background-color: var(--color-secondary-hover);
    }
    &:active {
      background-color: var(--color-secondary-active);
    }
  `,
  danger: css`
    background-color: var(--color-error);
    color: var(--color-text-on-primary);
    &:hover {
      background-color: var(--color-error-hover);
    }
    &:active {
      background-color: var(--color-error-active);
    }
  `,
  text: css`
    background-color: transparent;
    color: var(--color-primary);
    &:hover {
      background-color: var(--color-action-hover);
    }
  `,
  outline: css`
    background-color: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    &:hover {
      background-color: var(--color-primary-light);
    }
  `
};

export const badgeVariants = {
  primary: css`
    background-color: var(--color-primary-light);
    color: var(--color-primary-dark);
    border: 1px solid var(--color-primary);
  `,
  success: css`
    background-color: var(--color-success-bg);
    color: var(--color-success);
    border: 1px solid var(--color-success);
  `,
  warning: css`
    background-color: var(--color-warning-bg);
    color: var(--color-warning);
    border: 1px solid var(--color-warning);
  `,
  error: css`
    background-color: var(--color-error-bg);
    color: var(--color-error);
    border: 1px solid var(--color-error);
  `,
  info: css`
    background-color: var(--color-info-bg);
    color: var(--color-info);
    border: 1px solid var(--color-info);
  `,
  default: css`
    background-color: var(--color-background-secondary);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
  `
};

export const cardVariants = {
  default: css`
    background: var(--color-background-paper);
    border: 1px solid transparent;
  `,
  elevated: css`
    background: var(--color-background-paper);
    box-shadow: var(--shadow-sm);
  `,
  outlined: css`
    background: var(--color-background-paper);
    border: 1px solid var(--color-border);
  `,
  selected: css`
    background: var(--color-primary-light);
    border-left: 4px solid var(--color-primary);
  `
};

export const sizeVariants = {
  sm: css`
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-sm);
  `,
  md: css`
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-md);
  `,
  lg: css`
    padding: var(--space-md) var(--space-lg);
    font-size: var(--font-size-lg);
  `
};

export const sortButtonVariants = {
  base: `
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  `,
  variants: {
    active: {
      true: `
        background-color: var(--color-primary);
        color: white;

        &:hover {
          background-color: var(--color-primary-dark);
        }
      `,
      false: `
        background-color: white;
        color: var(--color-text);

        &:hover {
          background-color: var(--color-background-secondary);
        }
      `,
    },
  },
  defaultVariants: {
    active: false,
  },
} as const;
