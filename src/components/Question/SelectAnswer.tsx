import React from 'react';
import styled from 'styled-components';

const AnswerContainer = styled.div<{ $isCorrect: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${props => 
    props.$isCorrect ? 'var(--color-primary-light)' : 'transparent'};
`;

interface SelectAnswerProps {
  content: string;
  isCorrect: boolean;
  type: 'radio' | 'checkbox';
}

export const SelectAnswer: React.FC<SelectAnswerProps> = ({
  content,
  isCorrect,
  type
}) => (
  <AnswerContainer $isCorrect={isCorrect}>
    <input type={type} checked={isCorrect} readOnly />
    <span>{content}</span>
  </AnswerContainer>
);