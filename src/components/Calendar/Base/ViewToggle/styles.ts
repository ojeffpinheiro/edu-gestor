import styled from "styled-components";

export const ToggleContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? '#3182ce' : 'transparent'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-title-card)'};
  border: 1px solid ${props => props.active ? 'var(--color-info-hover)' : 'var(--color-border-light)'};
  1px solid 
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  animation: all 0.2s;

  ${props => props.active && `font-weight: bold;`}
  
  &:hover {
    opacity: 0.8;
  }
`;