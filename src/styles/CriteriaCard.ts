// src/components/CriteriaCard.tsx
import styled from 'styled-components';
import { Input } from './inputs';

// Interface para as propriedades do CriteriaHeader
interface CriteriaHeaderProps {
  isExpanded: boolean;
}

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
  background-color: (--color-primary);
  color: var(--color-text);
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CriteriaCard = styled.div`
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: var(--color-background-card);
  overflow: hidden;
`;

const CriteriaHeader = styled.div<CriteriaHeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.isExpanded 
    ? 'var(--color-primary-light)' 
    : 'var(--color-background-header)'};
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary-lighter);
  }
  
  .criteria-title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .criterion-name {
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
  
  .criteria-controls {
    display: flex;
    align-items: center;
  }

  h4 {
    margin: 0;
    font-size: 18px;
    color: var(--color-text-secondary);
  }
`;

const CriteriaBody = styled.div<{ isExpanded: boolean }>`
  padding: ${(props) => (props.isExpanded ? '1rem' : '0')};
  max-height: ${(props) => (props.isExpanded ? '1000px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.isExpanded ? '1' : '0')};
`;

const CriteriaOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const CriteriaOptionItem = styled.label`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
  
  .option-numbering {
    flex: 0 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    font-weight: 600;
    color: var(--color-text-secondary);
  }
  
  .option-content {
    flex: 1;
  }
  
  .delete-option-button {
    background: none;
    border: none;
    color: var(--color-error);
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 1;
    }
    
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
`;

const WeightInput = styled(Input)`
  width: 4rem;
  text-align: center;
`;

export { CriteriaCard, CriteriaHeader, Badge, CriteriaBody, WeightInput, CriteriaOptions, CriteriaOptionItem };