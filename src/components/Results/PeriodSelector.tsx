import React from 'react';
import styled from 'styled-components';


interface PeriodSelectorProps {
  periods: string[];
  selectedPeriod: string | null;
  onSelect: (period: string | null) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ periods, selectedPeriod, onSelect }) => {
  return (
    <div className="period-selector">
      <Select
        value={selectedPeriod || ''}
        onChange={(e) => onSelect(e.target.value || null)}
      >
        <option value="">Todos os Períodos</option>
        {periods.map(period => (
          <option key={period} value={period}>{period}</option>
        ))}
      </Select>
    </div>
  );
};

export const Select = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-bottom: 16px;
`;
export default PeriodSelector;