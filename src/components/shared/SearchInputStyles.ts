import styled from 'styled-components';

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const DropdownButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: var(--color-background-secondary);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 250px;
  z-index: 10;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

export const DropdownHeader = styled.div`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e1e4e8;
  font-weight: 500;
  font-size: 0.875rem;
`;

export const DropdownContent = styled.div`
  padding: 1rem;
`;

export const FilterGroup = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-text);
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: var(--color-background-secondary);
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &.primary {
    background-color: #3498db;
    color: white;
    border: none;
    
    &:hover {
      background-color: #2980b9;
    }
  }
  
  &.secondary {
    background-color: var(--color-background-secondary);
    color: var(--color-text);
    border: 1px solid #e1e4e8;
    
    &:hover {
      background-color: var(--color-secondary-hover);
      }
    }
  }
`;