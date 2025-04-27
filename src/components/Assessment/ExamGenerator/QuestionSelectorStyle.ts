import styled from "styled-components";
import { cardHoverEffect } from "../../../styles/mixins";
import { flexRow, spaceBetween, gap } from "../../../styles/layoutUtils";
import { Button } from "../../../styles/buttons";
import { Card } from "../../../styles/card";

export const QuestionItem = styled(Card).attrs({ as: 'li' })`
  padding: var(--space-md);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-sm);
  background-color: var(--color-background-secondary);
  position: relative;

  ${cardHoverEffect}
  
  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  p {
    margin-bottom: var(--space-sm);
    color: var(--color-text);
    font-size: var(--font-size-md);
    line-height: 1.4;
  }
  
  .question-meta {
    ${flexRow}
    ${spaceBetween}
    margin-bottom: var(--space-sm);
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    flex-wrap: wrap;
    ${gap('xs')}   
    
    span {
      padding: var(--space-xs) var(--space-sm);
      background-color: var(--color-background-third);
      border-radius: var(--border-radius-sm);
      white-space: nowrap;
    }
  }
`;

export const QuestionList = styled.ul`
  list-style: none;
  max-height: 400px;
  overflow-y: auto;
  padding-right: var(--space-sm);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-background-secondary);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 10px;
  }
`;

export const QuestionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
  
  h3 {
    font-size: var(--font-size-md);
    margin-bottom: var(--space-md);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
`;

export const AddQuestionButton = styled(Button).attrs({ variant: 'success' })`
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const RemoveQuestionButton = styled(Button).attrs({ variant: 'error' })`
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
`;

export const SelectionStatus = styled.span<{ isComplete: boolean }>`
  color: ${props => props.isComplete ? 'var(--color-success)' : 'var(--color-text-secondary)'};
  font-weight: ${props => props.isComplete ? 'bold' : 'normal'};
`;

