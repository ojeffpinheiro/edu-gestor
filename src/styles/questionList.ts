import styled from 'styled-components';

export const QuestionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const QuestionCard = styled.div`
  background-color: var(--color-background-third);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const QuestionTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const QuestionBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
  
  &.easy {
    background-color: #e6f7e6;
    color: #52c41a;
  }
  
  &.medium {
    background-color: #fff7e6;
    color: #fa8c16;
  }
  
  &.hard {
    background-color: #fff1f0;
    color: #f5222d;
  }
  
  &.multiple-choice {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  &.essay {
    background-color: #f9f0ff;
    color: #722ed1;
  }
  
  &.true-false {
    background-color: #f6ffed;
    color: #52c41a;
  }
`;

export const QuestionContent = styled.p`
  margin: 0 0 1rem;
  color: var(--color-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const QuestionMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
`;

export const QuestionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const QuestionTag = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.75rem;
`;

export const QuestionActions = styled.div`
  position: relative;
`;

export const MoreActionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 0.25rem;
  
  &:hover {
    color: var(--color-text);
  }
`;

export const ActionsDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: var(--color-background-secondary);
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 4px;
  padding: 0.5rem 0;
  display: none;
  
  ${QuestionActions}:hover & {
    display: block;
  }
`;

export const ActionItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-text);
  
  &:hover {
    opacity: 0.8;
  }
  
  &.delete {
    color: var(--color-error);
  }
`;