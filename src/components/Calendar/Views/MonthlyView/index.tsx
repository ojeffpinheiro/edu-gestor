import React, { useMemo } from 'react';
import { ptBR } from 'date-fns/locale';
import { format, formatDate } from 'date-fns';

import { useCalendar } from '../../../../contexts/CalendarContext';

import { CalendarEvent } from '../../../../utils/types/CalendarEvent';

import CalendarBase from '../../Base/CalendarBase';
import { WeekdayHeader } from './WeekdayHeader';
import { MonthGrid } from './MonthGrid';
import { ErrorBoundary } from '../../../shared/ErrorBoundary';

import { MonthViewContainer } from '../../styles';

interface MonthlyViewProps {
  onSelectEvent: (event: CalendarEvent) => void;
}

/**
 * Componente que exibe a visualização mensal do calendário
 * @param {Object} props - Props do componente
 * @param {function} props.onSelectEvent - Callback quando um evento é selecionado
 * @returns {JSX.Element} Visualização mensal do calendário com navegação
 */
const MonthlyView: React.FC<MonthlyViewProps> = ({ onSelectEvent }) => {
  const today = useMemo(() => new Date(), []);

  const { currentDate, filterEvents, onPrevMonth, onToday, onNextMonth } = useCalendar();
  const events = filterEvents({});

  /**
   * Manipula o clique no botão "Mostrar mais" para eventos em um dia
   * @param {Date} day - Dia selecionado
   * @param {number} count - Número total de eventos no dia
   */
  const handleShowMoreEvents = (day: Date, count: number) => {
    alert(`Total de ${count} eventos para ${formatDate(day, 'dd/MM/yyyy')}`);
  };

  return (
    <ErrorBoundary fallback={
      <div className="monthly-view-error">
        <h3>Erro ao carregar visualização mensal</h3>
        <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
      </div>
    }>
      <CalendarBase
        title={format(currentDate, "MMMM 'de' yyyy", { locale: ptBR })}
        onPrev={onPrevMonth}
        onToday={onToday}
        onNext={onNextMonth}  >
          <MonthViewContainer>
            <WeekdayHeader />
            <MonthGrid
              date={currentDate}
              today={today}
              events={events}
              onSelectEvent={onSelectEvent}
              onShowMoreEvents={handleShowMoreEvents}
            />
          </MonthViewContainer>
      </CalendarBase>
    </ErrorBoundary>
  );
};

export default MonthlyView;