import React from 'react';
import styled from 'styled-components';

const WEEKDAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
`;

const WeekdayCell = styled.div<{ isWeekend: boolean }>`
  padding: var(--space-md) var(--space-xs);
  text-align: center;
  font-weight: 500;
`;
/**
 * Componente que renderiza o cabeçalho com os dias da semana
 * @returns {JSX.Element} Linha com os nomes dos dias da semana
 */
export const WeekdayHeader: React.FC = () => {
  return (
    <WeekHeader>
      {WEEKDAY_NAMES.map((dayName, index) => {
        const isWeekendDay = index === 0 || index === 6;
        return (
          <WeekdayCell
            key={index}
            isWeekend={isWeekendDay}
            aria-label={dayName}
          >
            {dayName}
          </WeekdayCell>
        );
      })}
    </WeekHeader>
  );
};