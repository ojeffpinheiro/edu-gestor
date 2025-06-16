import styled from "styled-components";

export const CheckboxContainer = styled.div`
  transition: var(--transition-all);
  &:hover {
    transform: scale(1.02);
    background-color: var(--color-input);
  }
`;

export const CardTitle = styled.h3`
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.025em;
  margin-bottom: 1.5rem;
  color: var(--color-title-card);
`;


export const Checkbox = styled.div<{ checked: boolean }>`
  background: ${props => props.checked 
    ? 'var(--gradient-primary)' 
    : 'transparent'};
  
  transition: var(--transition-bounce);
  &:active {
    transform: scale(0.95);
  }
`;


export const CheckboxLabel = styled.span<{ checked: boolean }>`
  font-size: 0.9375rem;
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  color: ${props => props.checked ? 'var(--color-text-secondary, #888)' : 'var(--color-text, #333)'};
  transition: all 0.2s ease-in-out;
`;