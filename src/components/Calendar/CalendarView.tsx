import React from 'react';
import { useCalendar } from '../../contexts/CalendarContext';
import WeeklyView from './Views/WeeklyView';
import MonthlyView from './Views/MonthlyView';
import DailyView from './Views/DailyView';
import AnnualView from './Views/AnnualView'; // Novo componente
import { ViewToggle } from './Base/ViewToggle';
import { eventTypeColors } from '../../utils/consts';
import SemesterView from './Views/SemesterView';

const CalendarView: React.FC = () => {
  const { view, setView, currentDate, filterEvents, onSelectEvent } = useCalendar();
  const events = filterEvents({});

  const handleViewChange = (newView: string) => {
    if (newView === 'month' || newView === 'week' || newView === 'day' || newView === 'year' || newView === 'semester') {
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
          { key: 'year', label: 'Anual' },
          { key: 'semester', label: 'Semestral' }
        ]}
        activeView={view}
        onChange={handleViewChange}
      />
      
      {view === 'day' && <DailyView />}
      {view === 'week' && <WeeklyView onSelectEvent={onSelectEvent} />}
      {view === 'month' && <MonthlyView onSelectEvent={onSelectEvent} />}
      {view === 'year' && <AnnualView eventTypes={eventTypeColors} />}
      {view === 'semester' && <SemesterView eventTypes={eventTypeColors} />}
    </div>
  );
};

export default CalendarView;