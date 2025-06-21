import React from 'react';
import { PeriodOption, SelectContainer } from '../AssessmentDashboard/styles';

interface PeriodSelectorProps {
  periodType: 'bimester' | 'trimester' | 'semester';
  onChange: (type: 'bimester' | 'trimester' | 'semester') => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ periodType, onChange }) => {
  return (
    <SelectContainer>
      <PeriodOption 
        $active={periodType === 'bimester'} 
        onClick={() => onChange('bimester')}
      >
        Bimestre
      </PeriodOption>
      <PeriodOption 
        $active={periodType === 'trimester'} 
        onClick={() => onChange('trimester')}
      >
        Trimestre
      </PeriodOption>
      <PeriodOption 
        $active={periodType === 'semester'} 
        onClick={() => onChange('semester')}
      >
        Semestre
      </PeriodOption>
    </SelectContainer>
  );
};

export default PeriodSelector;