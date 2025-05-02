import styled from "styled-components";
import { BaseCard, BaseInput } from "../../../styles/baseComponents";

export const ManagerContainer = styled.div`
  width: 100%;
`;

export const FiltersContainer = styled(BaseCard)`
  margin-bottom: var(--space-lg);
  padding: var(--space-lg);
`;

export const FiltersTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text);
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  
  @media (min-width: var(--breakpoint-md)) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FilterGroup = styled.div`
  margin-bottom: var(--space-sm);
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-bottom: var(--space-sm);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const FilterInput = styled(BaseInput)`
  width: 100%;
  font-size: var(--font-size-sm);
  
  &:focus {
    box-shadow: var(--shadow-focus);
  }
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-sm) center;
  background-size: 16px 12px;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
`;

export const SelectedTopics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
`;

export const TopicTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: 500;
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
`;

export const FiltersFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-md);
`;

export const QuestionCount = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

export const QuestionsList = styled.div`
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  max-height: 24rem;
  overflow-y: auto;
`;

export const QuestionItem = styled.div<{ selected: boolean; clickable: boolean }>`
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border);
  background-color: ${props => props.selected ? 'var(--color-primary-light)' : 'white'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${props => props.selected 
      ? 'var(--color-primary-light)' 
      : 'var(--color-background)'};
  }
`;

export const QuestionContent = styled.div<{ onClick?: () => void }>`
  display: flex;
  align-items: flex-start;
`;

export const QuestionCheckbox = styled.input`
  margin-top: var(--space-xs);
  margin-right: var(--space-md);
  cursor: pointer;
`;

export const QuestionText = styled.div`
  flex: 1;
`;

export const QuestionTitle = styled.div`
  margin-bottom: var(--space-sm);
  font-weight: 500;
  color: var(--color-text);
`;

export const OptionList = styled.div`
  margin-left: var(--space-lg);
  margin-top: var(--space-sm);
`;

export const OptionItem = styled.div<{ isCorrect: boolean }>`
  margin-bottom: var(--space-xs);
  ${props => props.isCorrect && `
    font-weight: 600;
    color: var(--color-success);
    background-color: var(--color-success-light);
    border-radius: var(--border-radius-sm);
    padding: var(--space-xs);
  `}
`;

export const OptionLetter = styled.span`
  display: inline-block;
  width: 1.25rem;
`;

export const CorrectAnswerBadge = styled.span`
  margin-left: var(--space-sm);
  font-size: var(--font-size-xs);
  color: var(--color-success);
`;

export const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-md);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
`;

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
`;

export const SelectionSummary = styled.div`
  margin-top: var(--space-md);
  text-align: right;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
`;