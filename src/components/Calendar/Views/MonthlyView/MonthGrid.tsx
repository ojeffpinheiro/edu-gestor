// components/Calendar/MonthlyView/MonthGrid.tsx
import React, { useMemo } from 'react';
import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import { getDayEvents, getDaysInMonthGrid } from '../../../../utils/calendarUtils';
import { DayCell } from '../../Base/DayCell';
import { MonthGridContainer } from './styles';

interface MonthGridProps {
  date: Date;
  today: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onShowMoreEvents: (day: Date, count: number) => void;
}
/**
 * Props do componente MonthGrid
 * @typedef {Object} MonthGridProps
 * @property {Date} date - Data de referência para o mês
 * @property {Date} today - Data atual para highlight
 * @property {CalendarEvent[]} events - Lista de eventos para o mês
 * @property {function} onSelectEvent - Callback quando um evento é selecionado
 * @property {function} onShowMoreEvents - Callback quando há mais eventos que o exibido
 */

/**
 * Componente que renderiza a grade de dias do mês
 * @param {MonthGridProps} props - Props do componente
 * @returns {JSX.Element} Grade de dias com eventos
 */
export const MonthGrid: React.FC<MonthGridProps> = ({
  date,
  today,
  events,
  onSelectEvent,
  onShowMoreEvents
}) => {
  /**
   * Dias do mês formatados em grade (inclui dias dos meses anterior/próximo para completar a semana)
   * @type {Date[]}
   */
  const daysInRange = useMemo(() => getDaysInMonthGrid(date), [date]);
  
  return (
    <MonthGridContainer>
      {daysInRange.map((day) => (
        <DayCell
          key={day.toString()}
          day={day}
          date={date}
          today={today}
          events={getDayEvents(day, events)}
          onSelectEvent={onSelectEvent}
          onShowMoreEvents={onShowMoreEvents}
        />
      ))}
    </MonthGridContainer>
  );
};