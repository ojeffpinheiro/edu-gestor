import React, { useRef, useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, getHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import { useCalendar } from '../../../../contexts/CalendarContext';

import { CalendarEvent } from '../../../../utils/types/CalendarEvent';

import EventItem from '../../Base/EventItem';
import CalendarBase from '../../Base/CalendarBase';

import {
  WeekContainer,
  WeekHeader,
  WeekdayHeader,
  DayHeaderContent,
  DayName,
  DayNumber,
  WeekGrid,
  TimeColumn,
  DayColumn,
  TimeSlot,
  TimeLabel,
  AllDayEventsContainer,
  AllDayEventItem,
  ExpandButton,
  TimeSlotEventCounter,
  MultipleEventsContainer,
  AllDayEventsCounter,
  AllDayExpandButtonContainer
} from './styles';
import { ExpandAllDayButton, ExpandedDayView } from '../../Base/EventPopup/styles';
import EventPopup from '../../Base/EventPopup';

/**
 * Props do componente WeeklyView
 * @typedef {Object} WeeklyViewProps
 * @property {function} onSelectEvent - Callback quando um evento é selecionado
 */
interface WeeklyViewProps {
  onSelectEvent: (event: CalendarEvent) => void;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => i); // 0-23 hours

/**
 * Componente que exibe a visualização semanal do calendário
 * @param {WeeklyViewProps} props - Props do componente
 * @returns {JSX.Element} Visualização semanal com grade de horários e eventos
 */
const WeeklyView: React.FC<WeeklyViewProps> = ({ onSelectEvent }) => {
  const { currentDate, filterEvents, onPrevWeek, onNextWeek, onToday } = useCalendar();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTimeSlots, setExpandedTimeSlots] = useState<Record<string, boolean>>({});
  const [expandedAllDays, setExpandedAllDays] = useState<Record<string, boolean>>({});

  const [expandedDay, setExpandedDay] = useState<Date | null>(null);
  const [popupEvent, setPopupEvent] = useState<CalendarEvent | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const eventRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const weekStart = startOfWeek(currentDate, { locale: ptBR });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const events = filterEvents({});

  /**
   * Manipula o clique em um dia específico
   * @param {Date} day - Dia que foi clicado
   */
  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  /**
   * Alterna a expansão de um time slot específico
   * @param {string} dayStr - String representando o dia
   * @param {number} hour - Hora do slot
   */
  const toggleExpandTimeSlot = (dayStr: string, hour: number) => {
    const key = `${dayStr}-${hour}`;
    setExpandedTimeSlots(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleExpandAllDay = (dayStr: string) => {
    setExpandedAllDays(prev => ({
      ...prev,
      [dayStr]: !prev[dayStr]
    }));
  };

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const eventElement = eventRefs.current[event.id];
    if (eventElement) {
      const rect = eventElement.getBoundingClientRect();
      setPopupPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
      setPopupEvent(event);
    }
  };

  const closePopup = () => {
    setPopupEvent(null);
  };

  const handleEditEvent = () => {
    if (popupEvent) {
      onSelectEvent(popupEvent);
      closePopup();
    }
  };

  const handleDuplicateEvent = () => {
    // Implement duplicate logic here
    console.log('Duplicate event:', popupEvent);
    closePopup();
  };

  const handleDeleteEvent = () => {
    // Implement delete logic here
    console.log('Delete event:', popupEvent);
    closePopup();
  };

  return (
    <CalendarBase
      title=''
      onPrev={onPrevWeek}
      onNext={onNextWeek}
      onToday={onToday}
    >
      <WeekContainer>
        <WeekHeader>
          <div></div> {/* Empty cell for time column header */}
          {days.map(day => (
            <WeekdayHeader
              key={day.toString()}
              isWeekend={[0, 6].includes(day.getDay())}
              onClick={() => handleDayClick(day)}
            >
              <DayHeaderContent>
                <DayName>{format(day, 'EEE', { locale: ptBR })}</DayName>
                <DayNumber isToday={isSameDay(day, new Date())}>
                  {format(day, 'd')}
                </DayNumber>
              </DayHeaderContent>
            </WeekdayHeader>
          ))}
        </WeekHeader>
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '3rem repeat(7, 1fr)' }}>
            <AllDayExpandButtonContainer>
              {days.some(day => {
                const dayEvents = events.filter(event => isSameDay(new Date(event.start), day));
                const allDayEvents = dayEvents.filter(event => event.isAllDay);
                return allDayEvents.length > 2;
              }) && (
                  <ExpandButton
                    onClick={() => {
                      // Alternar entre expandir/recolher todos os dias
                      const anyExpanded = Object.values(expandedAllDays).some(val => val);
                      const newState = days.reduce((acc, day) => {
                        const dayStr = day.toString();
                        const dayEvents = events.filter(event => isSameDay(new Date(event.start), day));
                        const allDayEvents = dayEvents.filter(event => event.isAllDay);
                        return {
                          ...acc,
                          [dayStr]: allDayEvents.length > 2 ? !anyExpanded : false
                        };
                      }, {});
                      setExpandedAllDays(newState);
                    }}
                  >
                    {Object.values(expandedAllDays).some(val => val) ? <FaAngleUp /> : <FaAngleDown />}
                  </ExpandButton>
                )}
            </AllDayExpandButtonContainer>
            <AllDayEventsContainer>
              {days.map(day => {
                const dayStr = day.toString();
                const dayEvents = events.filter(event => isSameDay(new Date(event.start), day));
                const allDayEvents = dayEvents.filter(event => event.isAllDay);
                const isAllDayExpanded = expandedAllDays[dayStr] || false;
                const hiddenEventsCount = allDayEvents.length > 2 ? allDayEvents.length - 2 : 0;

                return (
                  <div key={dayStr}>
                    {allDayEvents.slice(0, isAllDayExpanded ? allDayEvents.length : 2).map(event => (
                      <AllDayEventItem
                        key={event.id}
                        ref={(el: HTMLDivElement | null) => { eventRefs.current[event.id] = el; }}
                        onClick={(e) => handleEventClick(event, e)}
                      >
                        {event.title}
                      </AllDayEventItem>
                    ))}

                    {!isAllDayExpanded && hiddenEventsCount > 0 && (
                      <AllDayEventsCounter
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpandAllDay(dayStr);
                        }}
                      >
                        +{hiddenEventsCount}
                      </AllDayEventsCounter>
                    )}
                  </div>
                );
              })}
            </AllDayEventsContainer>
          </div>
        </>

        {expandedDay && (
          <ExpandedDayView>
            <h4>Eventos do dia {format(expandedDay, 'dd/MM/yyyy')}</h4>
            {events
              .filter(event => isSameDay(new Date(event.start), expandedDay))
              .map(event => (
                <EventItem
                  key={event.id}
                  event={event}
                  onClick={(e) => {
                    handleEventClick(event, e);
                    onSelectEvent(event);
                  }}
                  size="sm"
                  ref={el => { eventRefs.current[event.id] = el; }}
                />
              ))}
            <ExpandAllDayButton onClick={() => setExpandedDay(null)}>
              <FaAngleUp /> Recolher
            </ExpandAllDayButton>
          </ExpandedDayView>
        )}

        <WeekGrid>
          <TimeColumn>
            {timeSlots.map(hour => (
              <TimeSlot key={hour}>
                <TimeLabel>{format(new Date().setHours(hour, 0, 0, 0), 'HH:mm')}</TimeLabel>
              </TimeSlot>
            ))}
          </TimeColumn>

          {days.map(day => {
            const dayStr = day.toString();
            const dayEvents = events.filter(event => isSameDay(new Date(event.start), day));
            const timedEvents = dayEvents.filter(event => !event.isAllDay);
            const isWeekend = [0, 6].includes(day.getDay());

            return (
              <DayColumn key={dayStr} isWeekend={isWeekend}>
                {timeSlots.map(hour => {
                  const slotKey = `${dayStr}-${hour}`;
                  const isExpanded = expandedTimeSlots[slotKey] || false;

                  const slotEvents = timedEvents.filter(event => {
                    const eventHour = getHours(new Date(event.start));
                    return eventHour === hour;
                  });

                  return (
                    <TimeSlot key={hour}>
                      {slotEvents.length > 0 && (
                        <MultipleEventsContainer>
                          {slotEvents.slice(0, isExpanded ? slotEvents.length : 1).map(event => (
                            <EventItem
                              key={event.id}
                              event={event}
                              onClick={(e) => {
                                handleEventClick(event, e);
                                onSelectEvent(event);
                              }}
                              size="sm"
                              ref={el => { eventRefs.current[event.id] = el; }}
                            />
                          ))}

                          {slotEvents.length > 1 && (
                            <TimeSlotEventCounter
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpandTimeSlot(dayStr, hour);
                              }}
                            >
                              {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                            </TimeSlotEventCounter>
                          )}
                        </MultipleEventsContainer>
                      )}
                    </TimeSlot>
                  );
                })}
              </DayColumn>
            );
          })}
        </WeekGrid>
      </WeekContainer>

      {popupEvent && (
        <EventPopup
          event={popupEvent}
          onEdit={handleEditEvent}
          onDuplicate={handleDuplicateEvent}
          onDelete={handleDeleteEvent}
          onClose={closePopup}
          style={{
            position: 'absolute',
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            zIndex: 1000
          }}
        />
      )}

    </CalendarBase>
  );
};

export default WeeklyView;