import React from 'react';
import { useCalendar } from '../../contexts/CalendarContext';
import WeeklyView from './Views/WeeklyView';
import MonthlyView from './Views/MonthlyView';
import DailyView from './Views/DailyView';
import AnnualView from './Views/AnnualView'; // Novo componente
import { ViewToggle } from './Base/ViewToggle';
import { eventTypeColors } from '../../utils/consts';
import SemesterView from './Views/SemesterView';
import QuarterView from './Views/QuarterView';

const CalendarView: React.FC = () => {
  const { view, setView, filterEvents, onSelectEvent } = useCalendar();
  const events = filterEvents({});

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