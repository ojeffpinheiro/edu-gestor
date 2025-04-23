import styled from "styled-components";
import { cardAppear } from "../../styles/animations";


export const Header = styled.header`
  margin-bottom: var(--space-xl);
`;

export const Title = styled.h1`
  color: var(--color-text);
  margin-bottom: var(--space-md);
`;

export const ControlsWrapper = styled.div`
  display: flex;
  gap: var(--space-md);
  align-items: center;
  flex-wrap: wrap;
  margin-top: var(--space-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const TagFilter = styled.div`
  width: 200px;
  
  select {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-md);
    
    &:focus {
      border-color: var(--color-primary);
      outline: none;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AddButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-md);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const EquationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-lg);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const EquationCard = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${cardAppear} 0.5s ease-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

export const EquationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-background-third);
  border-bottom: 1px solid var(--color-border-light);
  
  h3 {
    margin: 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: var(--font-size-lg);
  display: flex;
  padding: var(--space-xs);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  
  &:hover {
    color: var(--color-primary);
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const EquationContent = styled.div`
  padding: var(--space-lg);
`;

export const EquationDisplay = styled.div`
  font-size: var(--font-size-xl);
  padding: var(--space-md);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-md);
  text-align: center;
  font-family: 'Times New Roman', serif;
  overflow-x: auto;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  align-items: center;
`;

export const TagIcon = styled.span`
  color: var(--color-text-third);
  margin-right: var(--space-xs);
`;

export const Tag = styled.span`
  background-color: var(--color-background-third);
  color: var(--color-text-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
  }
  
  &.active {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-third);
  font-style: italic;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
`;

export const FilterSection = styled.div`
  margin: var(--space-md) 0;
`;

export const FilterContainer = styled.div`
  display: grid;
  gap: var(--space-md);
  margin-top: var(--space-sm);
  grid-template-columns: 4fr 4fr;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }

  summary{
    cursor: pointer;
  }

  .filter-options{
      display: grid;
      grid-template-columns: 2fr 2fr 2fr 2fr;
  }
`;

export const FilterTag = styled.span<{ isActive: boolean }>`
  background-color: ${props => props.isActive ? 'var(--color-primary)' : 'var(--color-background-third)'};
  color: ${props => props.isActive ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)'};
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  margin: var(--space-xs);
  
  &:hover {
    background-color: ${props => props.isActive ? 'var(--color-primary-hover)' : 'var(--color-primary-light)'};
  }
`;

export const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-md);
  
  span {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
`;

export const ClearFiltersButton = styled.button`
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  border-radius: var(--border-radius-sm);
  padding: calc(var(--space-xs) / 2) var(--space-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-background-secondary);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;