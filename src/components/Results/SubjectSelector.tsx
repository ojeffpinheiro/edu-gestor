import React from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiBook } from 'react-icons/fi';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
`;

const SelectorLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  font-size: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #d1d5db;
  }
`;

const ChevronIcon = styled(FiChevronDown)`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
`;

interface SubjectSelectorProps {
  subjects: string[];
  selectedSubject: string | null;
  onSelect: (subject: string | null) => void;
  className?: string;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  subjects,
  selectedSubject,
  onSelect,
  className = ''
}) => {
  return (
    <SelectorContainer className={className}>
      <SelectorLabel>
        <FiBook size={16} />
        Disciplina
      </SelectorLabel>
      <SelectWrapper>
        <StyledSelect
          value={selectedSubject || ''}
          onChange={(e) => onSelect(e.target.value || null)}
        >
          <option value="">Todas as disciplinas</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </StyledSelect>
        <ChevronIcon size={18} />
      </SelectWrapper>
    </SelectorContainer>
  );
};

export default SubjectSelector;