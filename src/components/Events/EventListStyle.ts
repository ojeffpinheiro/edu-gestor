import styled from 'styled-components';
import { BaseCard, BaseButton, BaseInput } from '../../styles/baseComponents';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-third);
`;

export const SearchInput = styled(BaseInput)`
  padding-left: 2.5rem;
  width: 100%;
`;

export const FilterButton = styled(BaseButton)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background-color: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)'};
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'var(--color-border)'};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? 'var(--color-primary-hover)' : 'var(--color-background-third)'};
  }
`;

export const FilterSelect = styled.select`
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background-color: var(--color-input);
  color: var(--color-text);
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
`;

export const EventCard = styled(BaseCard)<{ status: 'past' | 'today' | 'future' }>`
  padding: var(--space-md);
  margin-bottom: var(--space-md);
  border-left: 4px solid 
    ${props => props.status === 'past' 
      ? 'var(--color-text-third)' 
      : props.status === 'today' 
        ? 'var(--color-primary)' 
        : 'var(--color-success)'};
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-sm);
`;

export const EventTitle = styled.h3`
  color: var(--color-title-card);
  margin: 0;
  font-size: var(--font-size-lg);
`;

export const EventType = styled.span<{ type: string }>`
  background-color: ${props => {
    switch (props.type) {
      case 'class': return 'var(--color-primary)';
      case 'meeting': return 'var(--color-info)';
      case 'deadline': return 'var(--color-warning)';
      case 'holiday': return 'var(--color-error)';
      default: return 'var(--color-text-third)';
    }
  }};
  color: white;
  font-size: var(--font-size-xs);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-sm);
  text-transform: uppercase;
`;

export const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin: var(--space-sm) 0;
  color: var(--color-text-secondary);
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-size-sm);
`;

export const EventDescription = styled.p`
  color: var(--color-text-secondary);
  margin: var(--space-sm) 0;
  font-size: var(--font-size-md);
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-top: var(--space-md);
`;

export const ActionButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
`;

export const NoEventsMessage = styled.div`
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-secondary);
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-lg);
`;

export const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: var(--color-text-third);
  margin-bottom: var(--space-md);
`;