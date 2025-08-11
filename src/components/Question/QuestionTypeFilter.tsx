import React from 'react';
import { QuestionType } from '../../utils/types/Question';
import styled from 'styled-components';

interface QuestionTypeFilterProps {
  currentType: QuestionType | 'all';
  onTypeChange: (type: QuestionType | 'all') => void;
}

const QuestionTypeFilter: React.FC<QuestionTypeFilterProps> = ({
  currentType,
  onTypeChange
}) => {
  const typeOptions = [
    { value: 'all', label: 'Todos os Tipos' },
    { value: 'multiple_choice', label: 'Múltipla Escolha' },
    { value: 'true_false', label: 'Verdadeiro/Falso' },
    { value: 'short_answer', label: 'Resposta Curta' },
    { value: 'essay', label: 'Dissertativa' },
    { value: 'matching', label: 'Correspondência' },
    { value: 'fill_in', label: 'Preenchimento' },
    { value: 'composite', label: 'Composta' }
  ];

  return (
    <Content>
      <Select
        value={currentType}
        onChange={(e) => onTypeChange(e.target.value as QuestionType | 'all')}
        className="type-filter-select"
      >
        {typeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Content>
  );
};

const Content = styled.div`
  margin-left: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: var(--color-background-secondary);
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
  outline: none;
  border-color: #3f51b5;
  }
`

export default QuestionTypeFilter;