import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

export const AgendaContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

export const Header = styled.div`
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background);
`;

export const Title = styled.h2`
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--color-text);
  font-weight: 600;
`;

export const Controls = styled.div`
  display: flex;
  gap: var(--space-md);
  align-items: center;
`;

export const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: var(--space-sm) var(--space-md) var(--space-sm) calc(var(--space-lg) + var(--space-xs));
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  width: 200px;
  transition: all var(--transition-fast);
  background-color: var(--color-input);
  color: var(--color-text);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    width: 250px;
    box-shadow: var(--shadow-focus);
  }

  &::placeholder {
    color: var(--color-text-third);
    opacity: 0.7;
  }
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: var(--space-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-background-third);
    border-color: var(--color-primary);
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

export const ViewButton = styled.button<{ active: boolean }>`
  padding: var(--space-sm) var(--space-md);
  background-color: ${({ active }) => 
    active ? 'var(--color-primary)' : 'var(--color-background)'};
  color: ${({ active }) => 
    active ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);

  &:hover {
    background-color: ${({ active }) => 
      active ? 'var(--color-primary-hover)' : 'var(--color-background-secondary)'};
  }
`;

export const FilterPanel = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + var(--space-xs));
  right: 0;
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-md);
  z-index: var(--z-index-dropdown);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  min-width: 250px;
`;

export const FilterSection = styled.div`
  margin-bottom: var(--space-md);
`;

export const FilterTitle = styled.h4`
  margin: 0 0 var(--space-sm) 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
`;

export const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  color: var(--color-text);
`;

export const EventsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md);
  background-color: var(--color-background-secondary);
`;

export const DayHeader = styled.div`
  display: flex;
  align-items: center;
  margin: var(--space-md) 0;
`;

export const NoEvents = styled.div`
  padding: var(--space-lg);
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
`;

export const DayGroup = styled.div`
  margin-bottom: var(--space-xl);
`;

export const DayDate = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  min-width: 44px;
  text-align: right;
  margin-right: var(--space-md);
  
  span {
    display: block;
    &:first-child {
      font-weight: 500;
      color: var(--color-text);
    }
  }
`;
export const DayLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: var(--color-border-light);
`;

export const EventsList = styled.div`
  margin-left: 60px;
`;