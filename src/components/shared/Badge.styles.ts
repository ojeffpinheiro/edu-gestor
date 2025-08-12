import styled, { css } from 'styled-components';

export const Badge = styled.span<{
  $type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  $size?: 'sm' | 'md';
}>`
  display: inline-flex;
  align-items: center;
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-medium);
  padding: ${({ $size }) => $size === 'sm' ? 'var(--space-xs) var(--space-sm)' : 'var(--space-sm) var(--space-md)'};
  font-size: ${({ $size }) => $size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-sm)'};

  ${({ $type }) => {
    const typeMap = {
      primary: {
        light: 'var(--color-primary-light)',
        dark: 'var(--color-primary-dark)',
        main: 'var(--color-primary)'
      },
      success: {
        light: 'var(--color-success-bg)',
        dark: 'var(--color-success)',
        main: 'var(--color-success)'
      },
      warning: {
        light: 'var(--color-warning-bg)',
        dark: 'var(--color-warning)',
        main: 'var(--color-warning)'
      },
      error: {
        light: 'var(--color-error-bg)',
        dark: 'var(--color-error)',
        main: 'var(--color-error)'
      },
      info: {
        light: 'var(--color-info-bg)',
        dark: 'var(--color-info)',
        main: 'var(--color-info)'
      },
      default: {
        light: 'var(--color-background-secondary)',
        dark: 'var(--color-text-secondary)',
        main: 'var(--color-border)'
      }
    };
    
    const colors = typeMap[$type || 'default'];
    return css`
      background: ${colors.light};
      color: ${colors.dark};
      border: 1px solid ${colors.main};
    `;
  }}
`;