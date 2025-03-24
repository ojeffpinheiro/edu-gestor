import styled from "styled-components";
import { Input } from "../../styles/inputs";

interface CriteriaProps {
    isExpanded: boolean;
}

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-text-on-primary);
  background-color: var(--color-primary);
  border-radius: var(--border-radius-md);
  margin-left: var(--space-sm);
`;

export const CriteriaCard = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-md);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

export const CriteriaHeader = styled.div<CriteriaProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  cursor: pointer;
  background-color: ${({ isExpanded }) =>
        isExpanded ? 'var(--color-background-third)' : 'var(--color-card)'};
  transition: background-color 0.2s ease;
  border-bottom: ${({ isExpanded }) =>
        isExpanded ? '1px solid var(--color-border-light)' : 'none'};
  
  .criteria-title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .criterion-name {
    font-weight: 600;
    font-size: var(--font-size-md);
    color: var(--color-title-card);
    margin-right: var(--space-sm);
  }
  
  .criteria-controls {
    display: flex;
    align-items: center;
  }
`;

export const CriteriaBody = styled.div<CriteriaProps>`
  padding: ${({ isExpanded }) => (isExpanded ? 'var(--space-md)' : '0')};
  max-height: ${({ isExpanded }) => (isExpanded ? '2000px' : '0')};
  opacity: ${({ isExpanded }) => (isExpanded ? '1' : '0')};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

export const CriteriaOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
`;

export const CriteriaOptionItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-sm);
  align-items: center;
  padding: var(--space-sm);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-sm);
  
  .option-numbering {
    font-weight: 600;
    color: var(--color-text-secondary);
    padding: var(--space-sm);
  }
  
  .option-content {
    flex-grow: 1;
  }
  
  .delete-option-button {
    background-color: transparent;
    color: var(--color-text-third);
    border: none;
    transition: color 0.2s;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover:not(:disabled) {
      color: var(--color-error);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const WeightInput = styled(Input)`
  width: 80px;
  text-align: center;
`;

export const StatusBanner = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-md);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  
  &.warning {
    background-color: rgba(250, 173, 20, 0.1);
    border: 1px solid var(--color-warning);
    color: var(--color-warning);
  }
  
  &.success {
    background-color: rgba(82, 196, 26, 0.1);
    border: 1px solid var(--color-success);
    color: var(--color-success);
  }
`;

export const EmptyCriteriaState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  border: 2px dashed var(--color-border);
  margin-bottom: var(--space-md);
  
  svg {
    font-size: var(--font-size-3xl);
    color: var(--color-text-third);
    margin-bottom: var(--space-md);
  }
  
  p {
    text-align: center;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-md);
  }
`;

export const ErrorMessage = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-flex;
  margin-left: var(--space-xs);
  
  .tooltip-icon {
    color: var(--color-text-third);
    cursor: help;
  }
  
  .tooltip-text {
    visibility: hidden;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-background-third);
    color: var(--color-text);
    border-radius: var(--border-radius-sm);
    padding: var(--space-sm);
    box-shadow: var(--shadow-md);
    width: 200px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: var(--font-size-xs);
    pointer-events: none;
    
    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: var(--color-background-third) transparent transparent transparent;
    }
  }
  
  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border-light);
`;

export const AddCriterionContainer = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  margin-top: var(--space-lg);
  box-shadow: var(--shadow-sm);
  
  h4 {
    margin-bottom: var(--space-md);
    display: flex;
    align-items: center;
    color: var(--color-text-secondary);
    font-size: var(--font-size-md);
    
    svg {
      margin-right: var(--space-xs);
    }
  }
`;

export const DragHandle = styled.div`
  cursor: grab;
  color: var(--color-text-third);
  display: flex;
  align-items: center;
  margin-right: var(--space-sm);
  
  &:hover {
    color: var(--color-text-secondary);
  }
`;