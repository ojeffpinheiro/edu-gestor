import styled from "styled-components";
import { BaseCard, ListContainer, ListItem, ModalActions } from "../../../styles/baseComponents";
import { Badge } from "../../../styles/indicators";

// Estilização dos componentes
export const ExamContent = styled.div`
  padding: 10px 0;
`;

export const ExamInfo = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  
  p {
    margin: 8px 0;
    font-size: 14px;
  }
`;

export const QuestionsContainer = styled.div`
  h3 {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
`;

export const QuestionCard = styled(BaseCard)`
  border: 1px solid #e0e0e0;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const QuestionNumber = styled.div`
  background-color: #3498db;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
`;

export const QuestionMeta = styled.div`
  display: flex;
  gap: 8px;
`;

export const TopicBadge = styled.span`
  background-color: #e0e0e0;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

export const DifficultyBadge = styled(Badge).attrs<{ difficulty: string }>(props => ({
  variant: props.difficulty === 'easy' ? 'success' : 
          props.difficulty === 'medium' ? 'warning' : 'error'
}))``;

export const QuestionText = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 1.5;
`;

export const OptionsList = styled(ListContainer)`
  flex-direction: column;
  gap: var(--space-sm);
`;

export const OptionItem = styled(ListItem)<{ isCorrect: boolean }>`
  ${({ isCorrect }) => isCorrect && `
    font-weight: 600;
    color: var(--color-success);
  `}
`;

export const OptionLetter = styled.div`
  background-color: #f1f1f1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
  flex-shrink: 0;
`;

export const OptionText = styled.div`
  font-size: 14px;
  line-height: 1.4;
`;

export const ModalFooter = styled(ModalActions)`
  justify-content: space-between;
  gap: var(--space-sm);
`;