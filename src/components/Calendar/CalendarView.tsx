import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import DailyView from './DailyView';
import WeeklyView from './WeeklyView';
import MonthlyView from './MonthlyView';
import HolidayManager from './HolidayManager';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarEvent } from '../../utils/types/CalendarEvent';
import EventCreation from '../Events/EventCreation';
import { StyleCalendarView } from './styles';

// Configure moment locale
moment.locale('pt-br');
const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  className?: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({ className }) => {
  const [view, setView] = useState<string>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date, end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const { events, createEvent, updateEvent, deleteEvent } = useCalendar();
  const { 
    CalendarContainer, 
    CalendarLayout, 
    EventModal, 
    EventModalContainer, 
    SidebarContainer, 
    ViewToggleButton, 
    ViewToggleContainer
  } = StyleCalendarView

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

      <CalendarLayout >
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

        <SidebarContainer >
          <HolidayManager />
        </SidebarContainer>
      </CalendarLayout>

      {showEventModal && (
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
        )}
    </div>
  );
};

export default CalendarView;
