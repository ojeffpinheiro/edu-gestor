import React from 'react';
import { useCalendar } from '../../contexts/CalendarContext';

import { eventTypeColors } from '../../utils/consts';

import WeeklyView from './Views/WeeklyView';
import MonthlyView from './Views/MonthlyView';
import DailyView from './Views/DailyView';
import AnnualView from './Views/AnnualView';
import SemesterView from './Views/SemesterView';
import QuarterView from './Views/QuarterView';

import { ViewToggle } from './Base/ViewToggle';

/**
 * Componente principal que renderiza a visualização do calendário baseado na view selecionada
 * @param {Object} props - Props do componente (não possui props explícitas)
 * @returns {JSX.Element} Componente do calendário com seletor de visualização
 */
const CalendarView: React.FC = () => {
  const { view, setView, onSelectEvent } = useCalendar();
  
  /**
   * Manipula a mudança de visualização do calendário
   * @param {string} newView - Nova visualização a ser ativada
   */
  const handleViewChange = (newView: string) => {
    if (newView === 'month' || newView === 'week' || newView === 'day' || newView === 'quarter' || newView === 'semester' || newView === 'year') {
      setView(newView);
    }
  };

  return (
    <div>
      <ViewToggle
        views={[
          { key: 'day', label: 'Diário' },
          { key: 'week', label: 'Semanal' },
          { key: 'month', label: 'Mensal' },
          { key: 'quarter', label: 'Trimestral' },
          { key: 'semester', label: 'Semestral' },
          { key: 'year', label: 'Anual' },
        ]}
        activeView={view}
        onChange={handleViewChange}
      />
      
      {view === 'day' && <DailyView />}
      {view === 'week' && <WeeklyView onSelectEvent={onSelectEvent} />}
      {view === 'month' && <MonthlyView onSelectEvent={onSelectEvent} />}
      {view === 'semester' && <SemesterView eventTypes={eventTypeColors} />}
      {view === 'quarter' && <QuarterView eventTypes={eventTypeColors} />}
      {view === 'year' && <AnnualView eventTypes={eventTypeColors} />}
    </div>
  );
};

export default CalendarView;