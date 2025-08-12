import React from 'react';
import styled from 'styled-components';

const CorrectIndicator = styled.span`
  color: var(--color-success);
  margin-left: 0.25rem;
`;

interface BooleanAnswerProps {
  value: boolean;
  isCorrect: boolean;
}

export const BooleanAnswer: React.FC<BooleanAnswerProps> = ({
  value,
  isCorrect
}) => (
  <div>
    {value ? 'Verdadeiro' : 'Falso'}
    {isCorrect && <CorrectIndicator>✓</CorrectIndicator>}
  </div>
);