import styled from 'styled-components';

export const TabsContainer = styled.div<{ orientation: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ orientation }) => 
    orientation === 'vertical' ? 'row' : 'column'};
  gap: 1rem;
`;

export const TabsList = styled.div<{ 
  variant: string;
  orientation: 'horizontal' | 'vertical' 
}>`
  display: flex;
  flex-direction: ${({ orientation }) => 
    orientation === 'vertical' ? 'column' : 'row'};
  gap: 0.5rem;
  border-bottom: ${({ variant }) => 
    variant === 'underline' ? '1px solid var(--color-border)' : 'none'};
  padding-bottom: ${({ variant }) => 
    variant === 'underline' ? '0.5rem' : '0'};
`;

export const TabTrigger = styled.button<{
  active: boolean;
  variant: string;
  disabled?: boolean;
}>`
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  color: ${({ active }) => 
    active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  ${({ variant, active }) => 
    variant === 'underline' &&
    active &&
    `
      &::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        right: 0;
        height: 2px;
        background-color: var(--color-primary);
      }
    `}

  ${({ variant, active }) =>
    variant === 'pills' &&
    `
      border-radius: 9999px;
      background-color: ${active ? 'var(--color-primary)' : 'transparent'};
      color: ${active ? 'white' : 'var(--color-text-secondary)'};
      &:hover {
        background-color: ${active ? 'var(--color-primary-dark)' : 'var(--color-background-secondary)'};
      }
    `}
`;

export const TabContent = styled.div`
  padding: 1.5rem 0;
  flex-grow: 1;
`;