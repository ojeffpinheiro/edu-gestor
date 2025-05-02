import React from 'react';
import { useCalendar } from '../../contexts/CalendarContext';
import DailyView from './DailyView';
import WeeklyView from './WeeklyView';
import MonthlyView from './MonthlyView';
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
        <DailyView 
          date={currentDate}
          events={events}
          onSelectEvent={onSelectEvent}
        />
      )}
      {view === 'week' && (
        <WeeklyView
          date={currentDate}
          events={events}
          onSelectEvent={onSelectEvent}
        />
      )}
      {view === 'month' && (
        <MonthlyView
          date={currentDate}
          events={events}
          onSelectEvent={onSelectEvent}
        />
      )}
    </div>
  );
};

export default CalendarView;