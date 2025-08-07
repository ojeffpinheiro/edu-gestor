import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownTrigger = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

export const DropdownContent = styled.div<{
  position: 'left' | 'right';
  align: 'start' | 'center' | 'end';
}>`
  position: absolute;
  ${({ position }) => (position === 'right' ? 'right: 0' : 'left: 0')};
  top: 100%;
  min-width: 160px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  margin-top: 0.5rem;
  display: none;
  overflow: hidden;
  text-align: ${({ align }) => align};

  ${DropdownContainer}:hover & {
    display: block;
  }
`;

export const DropdownItemContainer = styled.div<{ disabled?: boolean }>`
  padding: 0.75rem 1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) =>
    disabled ? 'var(--color-text-disabled)' : 'var(--color-text)'};
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? 'transparent' : 'var(--color-background-secondary)'};
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background-color: var(--color-border);
  margin: 0.25rem 0;
`;