import React from 'react'
import styled from 'styled-components';

import { QUESTION_TYPE_LABELS, QuestionType } from '../../types/evaluation/Question'

interface QuestionTypeIndicatorProps {
    type: QuestionType | 'all';
}

const QuestionTypeIndicator: React.FC<QuestionTypeIndicatorProps> = ({ type }) => {
    const getTypeColor = () => {
        switch (type) {
            case 'multiple_choice': return 'var(--color-primary)';
            case 'true_false': return 'var(--color-success)';
            case 'essay': return 'var(--color-warning)';
            case 'fill_in_the_blank': return 'var(--color-info)';
            default: return 'var(--color-text)';
        }
    };

    return (
        <TypeIndicatorContainer style={{ color: getTypeColor() }}>
            {type === 'all' ? '📊 Todos os Tipos' : `📝 ${QUESTION_TYPE_LABELS[type]}`}
        </TypeIndicatorContainer>
    );
};

const TypeIndicatorContainer = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--color-background-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  margin-right: 1rem;
`

export default QuestionTypeIndicator;