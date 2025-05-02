import styled from 'styled-components';
import { Grid } from '../../../../styles/layoutUtils';

export const Card = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 1rem;
`;

export const Content = styled(Grid)`
    grid-template-columns: 2fr 3fr;
`;

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-title-card, #333);
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--border-radius-sm); 
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-input);
`;

export const Checkbox = styled.div<{ checked: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--border-radius-sm);
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.checked
    ? 'var(--color-primary, #4a6fa5)'
    : 'transparent'};
  border: 1px solid ${props => props.checked
    ? 'var(--color-primary, #4a6fa5)'
    : 'var(--color-border, #ccc)'};
`;

export const CheckboxLabel = styled.span<{ checked: boolean }>`
  font-size: 0.9375rem;
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  color: ${props => props.checked ? 'var(--color-text-secondary, #888)' : 'var(--color-text, #333)'};
  transition: all 0.2s ease-in-out;
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DayCard = styled.div`
  background-color: var(--color-secondary, #f9f9f9);
  border-radius: var(--border-radius-md, 1rem);
  padding: 0.75rem;
`;

export const DayTitle = styled.h4`
  font-weight: 600;
  text-align: center;

    margin: 0 0 var(--space-xs, 0.25rem) 0;
    font-size: 0.9rem;
    color: var(--color-primary, #4a6fa5);
    border-bottom: 1px solid var(--color-border-light, #eee);
    padding-bottom: var(--space-xs, 0.25rem);
`;

export const ClassItem = styled.div`
  margin-bottom: var(--space-xs, 0.25rem);
  padding: var(--space-xs, 0.25rem);
  border-left: 3px solid var(--color-accent, #6a8ec8);
  background-color: var(--color-background, white);
  border-radius: 0 var(--border-radius-sm, 2px) var(--border-radius-sm, 2px) 0;
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.1));
`;

export const ClassTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const ClassTime = styled.div`
  font-size: 0.75rem;
    color: var(--color-text-secondary, #888);
  margin-bottom: 0.25rem;
`;

export const ClassInfo = styled.div`
    color: var(--color-text-secondary, #888);
    
    font-size: 0.8rem;
    margin-top: var(--space-xs, 0.25rem);
`;