import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const FilterButton = styled.button<{ active: boolean; color: string }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? `${props.color}20` : 'transparent'};
  color: ${props => props.active ? props.color : '#4a5568'};
  border: 1px solid ${props => props.active ? props.color : '#e2e8f0'};
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => `${props.color}10`};
  }
`;