import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, getHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import { useCalendar } from '../../../contexts/CalendarContext';

import { CalendarEvent } from '../../../utils/types/CalendarEvent';

import EventItem from '../Base/EventItem';
import CalendarBase from '../Base/CalendarBase';
import EventDetails from '../Base/EventDetails';

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
  MultipleEventsContainer
} from './styles';


interface WeeklyViewProps {
  onSelectEvent: (event: CalendarEvent) => void;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => i); // 0-23 hours

const WeeklyView: React.FC<WeeklyViewProps> = ({ onSelectEvent }) => {
  const { currentDate, filterEvents, onPrevWeek, onNextWeek, onToday } = useCalendar();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTimeSlots, setExpandedTimeSlots] = useState<Record<string, boolean>>({});
  const [expandedAllDays, setExpandedAllDays] = useState<Record<string, boolean>>({});
  
  const weekStart = startOfWeek(currentDate, { locale: ptBR });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const events = filterEvents({});

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  return (
    <CalendarBase
      title={format(weekStart, 'MMMM yyyy', { locale: ptBR })}
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

        <AllDayEventsContainer>
          {days.map(day => {
            const dayStr = day.toString();
            const dayEvents = events.filter(event => isSameDay(new Date(event.start), day));
            const allDayEvents = dayEvents.filter(event => event.isAllDay);
            const isAllDayExpanded = expandedAllDays[dayStr] || false;

            return (
              <div key={dayStr}>
                {allDayEvents.length > 0 && (
                  <>
                    {allDayEvents.slice(0, isAllDayExpanded ? allDayEvents.length : 1).map(event => (
                      <AllDayEventItem 
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(event);
                        }}
                      >
                        {event.title}
                      </AllDayEventItem>
                    ))}
                    
                    {allDayEvents.length > 1 && (
                      <ExpandButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpandAllDay(dayStr);
                        }}
                      >
                        {isAllDayExpanded ? <FaAngleUp /> : <FaAngleDown />}
                      </ExpandButton>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </AllDayEventsContainer>

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
                              onSelectEventClick={onSelectEvent}
                              size="sm"
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

      {selectedDay && isModalOpen && (
          <EventDetails
            day={selectedDay}
            onClose={handleCloseModal}
            events={events.filter(event => isSameDay(new Date(event.start), selectedDay))}
            onSelectEvent={(event) => {
              onSelectEvent(event);
              handleCloseModal();
            }}
          />
      )}
    </CalendarBase>
  );
};

export default WeeklyView;