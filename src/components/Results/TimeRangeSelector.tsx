import React from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RangeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: ${({ $active }) => 
    $active ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.3);
  }
`;

interface TimeRangeSelectorProps {
  value: string;
  onChange: (range: 'month' | 'semester' | 'year') => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ value, onChange }) => {
  return (
    <SelectorContainer>
      <RangeButton 
        $active={value === 'month'}
        onClick={() => onChange('month')}
      >
        Mensal
      </RangeButton>
      <RangeButton 
        $active={value === 'semester'}
        onClick={() => onChange('semester')}
      >
        Semestral
      </RangeButton>
      <RangeButton 
        $active={value === 'year'}
        onClick={() => onChange('year')}
      >
        Anual
      </RangeButton>
    </SelectorContainer>
  );
};

export default TimeRangeSelector;