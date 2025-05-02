import React from 'react';
import styled from 'styled-components';
import { useCalendar } from '../../contexts/CalendarContext';
import { formatDate } from '../../utils/dateFormatter';

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const PeriodSelector: React.FC = () => {
  const { calendar, currentPeriod, setCurrentPeriod } = useCalendar();

  return (
    <Select
      value={currentPeriod?.id || ''}
      onChange={(e) => setCurrentPeriod(e.target.value)}
    >
      <option value="">Todos os Períodos</option>
      {calendar.periods.map(period => (
        <option key={period.id} value={period.id}>
          {period.name} ({formatDate(period.start, 'dd/MM')} - {formatDate(period.end, 'dd/MM/yyyy')})
        </option>
      ))}
    </Select>
  );
};

export default PeriodSelector;