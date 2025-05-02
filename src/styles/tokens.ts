// src/styles/tokens.ts

// Esta exportação permite usar os tokens de modo tipado no TypeScript
export const Spacing = {
  xs: 'var(--space-xs)',
  sm: 'var(--space-sm)',
  md: 'var(--space-md)',
  lg: 'var(--space-lg)',
  xl: 'var(--space-xl)',
  '2xl': 'var(--space-2xl)'
};

export const Colors = {
  primary: 'var(--color-primary)',
  primaryHover: 'var(--color-primary-hover)',
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--color-info)',
  text: 'var(--color-text)',
  textSecondary: 'var(--color-text-secondary)',
  textThird: 'var(--color-text-third)',
  border: 'var(--color-border)',
  borderLight: 'var(--color-border-light)'
};

export const Sizes = {
  inputHeight: '40px',
  buttonHeight: '40px',
  headerHeight: '64px',
  borderRadius: {
    sm: 'var(--border-radius-sm)',
    md: 'var(--border-radius-md)',
    lg: 'var(--border-radius-lg)'
  }
};