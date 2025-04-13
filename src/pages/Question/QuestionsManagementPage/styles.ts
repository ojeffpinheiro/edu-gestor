import styled from "styled-components";
import { Container, Flex } from "../../../styles/layoutUtils";

export const QuestionsManagementContainer = styled(Container)`
  max-width: 95vw;
`

export const QuestionsHeader = styled(Flex)`
  margin-bottom: var(--space-lg);
`;

export const Title = styled.h1`
  margin: 0;
`;

export const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  margin-left: var(--space-md);
  
  input {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    padding-left: 2.5rem;
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-input);
  }
  
  svg {
    position: absolute;
    left: var(--space-sm);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-third);
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-lg);
`;

export const PaginationInfo = styled.div`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-full);
  border: 1px solid var(--color-border);
  background-color: var(--color-background-secondary);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
  }
  
  &.active {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    border-color: var(--color-primary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--color-background-third);
  }
`;

export const DifficultyBadge = styled.span<{ level: 'easy' | 'medium' | 'hard' }>`
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 500;
  text-transform: uppercase;
  
  ${({ level }) => {
    switch (level) {
      case 'easy':
        return `
          background-color: #e6f7e6;
          color: #52c41a;
        `;
      case 'medium':
        return `
          background-color: #fff7e6;
          color: #fa8c16;
        `;
      case 'hard':
        return `
          background-color: #fff1f0;
          color: #f5222d;
        `;
      default:
        return '';
    }
  }}
`;

export const TypeBadge = styled.span<{ type: 'multiple_choice' | 'true_false' | 'essay' }>`
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 500;
  
  ${({ type }) => {
    switch (type) {
      case 'multiple_choice':
        return `
          background-color: #e6f7ff;
          color: #1890ff;
        `;
      case 'true_false':
        return `
          background-color: #f6ffed;
          color: #52c41a;
        `;
      case 'essay':
        return `
          background-color: #f9f0ff;
          color: #722ed1;
        `;
      default:
        return '';
    }
  }}
`;

export const ActionColumn = styled.div`
  display: flex;
  gap: var(--space-xs);
  justify-content: center;
`;

export const QuestionStatement = styled.div`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;