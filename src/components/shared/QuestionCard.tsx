import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

const MetaData = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

interface QuestionCardProps {
  statement: string;
  discipline: string;
  questionType: string;
  onClick?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  statement,
  discipline,
  questionType,
  onClick
}) => (
  <CardContainer onClick={onClick}>
    <h4>{statement}</h4>
    <MetaData>
      <span>Disciplina: {discipline}</span>
      <span>Tipo: {questionType}</span>
    </MetaData>
  </CardContainer>
);