import React from 'react';
import { useCalendar } from '../../contexts/CalendarContext';

import WeeklyView from './WeeklyView';
import MonthlyView from './MonthlyView';
import DailyView from './DailyView';
import { ViewToggle } from './Base/ViewToggle';

const CalendarView: React.FC = () => {
  const { view, setView, currentDate, filterEvents, onSelectEvent } = useCalendar();
  const events = filterEvents({});

  // Se necessário, adaptador para o ViewToggle
  const handleViewChange = (newView: string) => {
    if (newView === 'month' || newView === 'week' || newView === 'day') {
      setView(newView);
    }
  };

  return (
    <div>
      <ViewToggle
        views={[
          { key: 'day', label: 'Diário' },
          { key: 'week', label: 'Semanal' },
          { key: 'month', label: 'Mensal' }
        ]}
        activeView={view}
        onChange={handleViewChange}
      />
      
      {view === 'day' && (
        <DailyView />
      )}
      {view === 'week' && (
        <WeeklyView
          onSelectEvent={onSelectEvent}
        />
      )}
      {view === 'month' && (
        <MonthlyView
          onSelectEvent={onSelectEvent}
        />
      )}
    </div>
  );
};

export default CalendarView;