import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';

import DailyView from './DailyView';
import WeeklyView from './WeeklyView';
import MonthlyView from './MonthlyView';
import HolidayManager from './HolidayManager';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import EventCreation from '../Events/EventCreation';

// Configure moment locale
moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const ViewToggleButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? '#2196f3' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 1px solid ${props => props.active ? '#2196f3' : '#ddd'};
  margin-right: 0.5rem;
  
  &:hover {
    background-color: ${props => props.active ? '#1976d2' : '#e0e0e0'};
  }
`;

const ViewToggleContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const CalendarContainer = styled.div`
  height: 80vh;
  
  .rbc-calendar {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
  
  .rbc-event {
    background-color: #2196f3;
  }
  
  .rbc-today {
    background-color: #e3f2fd;
  }
  
  .rbc-toolbar button {
    color: #2196f3;
  }
  
  .rbc-toolbar button.rbc-active {
    background-color: #2196f3;
    color: white;
  }
  
  .holiday-event {
    background-color: #ff9800 !important;
    border-color: #f57c00 !important;
  }
`;

const EventModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const EventModal = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const CalendarLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

interface CalendarViewProps {
  className?: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({ className }) => {
  const [view, setView] = useState<string>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date, end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const { events, isLoading, error, createEvent, updateEvent, deleteEvent } = useCalendar();

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    // Skip opening the modal for holiday events - those are managed in the HolidayManager
    if (event.type === 'holiday') return;

    setSelectedEvent(event);
    setSelectedSlot(null);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
    setSelectedSlot(null);
  };

  const handleCreateEvent = (eventData: Partial<CalendarEvent>) => {
    if (selectedSlot) {
      createEvent({
        ...eventData,
        start: selectedSlot.start,
        end: selectedSlot.end
      });
    }
    handleCloseModal();
  };

  const handleUpdateEvent = (eventData: Partial<CalendarEvent>) => {
    if (selectedEvent) {
      updateEvent({
        id: selectedEvent.id,
        data: eventData
      });
    }
    handleCloseModal();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
    }
    handleCloseModal();
  };

  const renderCustomView = () => {
    switch (view) {
      case 'day':
        return <DailyView date={date} events={events || []
        } onSelectEvent={handleSelectEvent} />;
      case 'week':
        return <WeeklyView date={date} events={events || []} onSelectEvent={handleSelectEvent} />;
      case 'month':
        return <MonthlyView date={date} events={events || []} onSelectEvent={handleSelectEvent} />;
      default:
        return null;
    }
  };

  // Custom event styling based on event type
  const eventPropGetter = (event: CalendarEvent) => {
    if (event.type === 'holiday') {
      return {
        className: 'holiday-event',
        style: {
          backgroundColor: '#ff9800',
          borderColor: '#f57c00'
        }
      };
    }

    // Use the event's color if available
    if (event.color) {
      return {
        style: {
          backgroundColor: event.color,
          borderColor: event.color
        }
      };
    }

    return {};
  };

  return (
    <div className={className} >
      <ViewToggleContainer>
        <ViewToggleButton
          active={view === 'day'}
          onClick={() => handleViewChange('day')}
        >
          Diário
        </ViewToggleButton>
        < ViewToggleButton
          active={view === 'week'}
          onClick={() => handleViewChange('week')}
        >
          Semanal
        </ViewToggleButton>
        < ViewToggleButton
          active={view === 'month'}
          onClick={() => handleViewChange('month')}
        >
          Mensal
        </ViewToggleButton>
      </ViewToggleContainer>

      < CalendarLayout >
        <CalendarContainer>
          <Calendar
            localizer={localizer}
            events={events || []}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            view={view as any}
            date={date}
            onView={handleViewChange as any}
            onNavigate={handleNavigate}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent as any}
            selectable
            popup
            eventPropGetter={eventPropGetter as any}
            components={{
              month: {
                dateHeader: ({ date, label }: { date: Date; label: string }) => {
                  const isWeekend = [0, 6].includes(date.getDay());
                  return (
                    <span style={{ color: isWeekend ? '#f44336' : 'inherit' }
                    }>
                      {label}
                    </span>
                  );
                }
              }
            }}
          />
        </CalendarContainer>

        < SidebarContainer >
          <HolidayManager />
        </SidebarContainer>
      </CalendarLayout>

      {
        showEventModal && (
          <EventModalContainer>
            <EventModal>
              <EventCreation
                initialData={selectedEvent || undefined}
                startDate={selectedSlot?.start}
                endDate={selectedSlot?.end}
                onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}
                onCancel={handleCloseModal}
                onDelete={selectedEvent ? handleDeleteEvent : undefined}
              />
            </EventModal>
          </EventModalContainer>
        )
      }
    </div>
  );
};

export default CalendarView;
