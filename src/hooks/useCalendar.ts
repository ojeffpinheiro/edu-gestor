import { useState, useEffect, useCallback } from 'react';
import { addDays, isSameDay, isWithinInterval } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { useCalendar } from '../contexts/CalendarContext';

import { AcademicPeriod, CalendarEvent } from '../utils/types/CalendarEvent';

import { MOCK_EVENTS } from '../mocks/events';

interface UpdateEventParams {
  id: string;
  data: Partial<CalendarEvent>;
}

export const useCalendarEvents = () => {
  const { calendar, filterEvents } = useCalendar();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 500));

        // In a real app, this would be an API call
        setEvents(MOCK_EVENTS);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch events'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);
  
  const filteredEvents = filter ? events.filter(event => event.type === filter) : events;

  const createEvent = async (eventData: Partial<CalendarEvent>) => {
    try {
      const newEvent: CalendarEvent = {
        id: uuidv4(),
        title: eventData.title || 'Untitled Event',
        description: eventData.description || '',
        start: eventData.start || new Date(),
        end: eventData.end || new Date(),
        type: eventData.type || 'other',
        location: eventData.location,
        isAllDay: eventData.isAllDay || false
      };

      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setEvents(prevEvents => [...prevEvents, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create event'));
      throw err;
    }
  };

  const updateEvent = async ({ id, data }: UpdateEventParams) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === id ? { ...event, ...data } : event
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update event'));
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete event'));
      throw err;
    }
  };

  const filterByType = (type: string | null) => {
    setFilter(type);
  };

  const getEventsForDay = useCallback((day: Date): CalendarEvent[] => {
    return filterEvents({}).filter(event => 
      isSameDay(event.start, day) || 
      (event.isAllDay && isSameDay(event.start, day))
    );
  }, [filterEvents]);

  const getEventsForPeriod = useCallback((start: Date, end: Date): CalendarEvent[] => {
    return filterEvents({}).filter(event => 
      isWithinInterval(event.start, { start, end }) ||
      (event.isAllDay && isWithinInterval(event.start, { start, end }))
    );
  }, [filterEvents]);

  const getAcademicPeriod = useCallback((date: Date): AcademicPeriod | undefined => {
    return calendar.periods.find(period => 
      isWithinInterval(date, { start: period.start, end: period.end })
    );
  }, [calendar.periods]);

  const getSchoolDaysCount = useCallback((periodId?: string): number => {
    const period = periodId 
      ? calendar.periods.find(p => p.id === periodId) 
      : null;
    
    const start = period?.start || calendar.academicYear.start;
    const end = period?.end || calendar.academicYear.end;
    
    let count = 0;
    let current = new Date(start);
    
    while (current <= end) {
      // TODO: Adicionar lógica para verificar dias letivos
      count++;
      current = addDays(current, 1);
    }
    
    return count;
  }, [calendar]);

  return {
    events: filteredEvents,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    filterByType,
    getEventsForDay,
    getEventsForPeriod,
    getAcademicPeriod,
    getSchoolDaysCount
  };
};

// Dados mockados para eventos
export const generateMockEvents = (): CalendarEvent[] => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const lastWeek = new Date(now);
  lastWeek.setDate(lastWeek.getDate() - 7);

  return [
    {
      id: "event1",
      title: "Reunião de Planejamento",
      description: "Discussão sobre os próximos projetos e distribuição de tarefas para o trimestre.",
      start: yesterday,
      end: yesterday,
      type: "meeting",
      isAllDay: false,
      location: "Sala de Conferências A"
    },
    {
      id: "event2",
      title: "Aula de Matemática",
      description: "Introdução às funções quadráticas e suas aplicações.",
      start: now,
      end: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 horas depois
      type: "class",
      isAllDay: false,
      location: "Sala 305"
    },
    {
      id: "event3",
      title: "Entrega de Relatório",
      description: "Prazo final para entrega do relatório trimestral.",
      start: tomorrow,
      end: tomorrow,
      type: "deadline",
      isAllDay: true,
      location: ""
    },
    {
      id: "event4",
      title: "Feriado Municipal",
      description: "Aniversário da cidade.",
      start: nextWeek,
      end: nextWeek,
      type: "holiday",
      isAllDay: true,
      location: ""
    },
    {
      id: "event5",
      title: "Workshop de Design",
      description: "Introdução às ferramentas de design UI/UX e práticas modernas.",
      start: lastWeek,
      end: lastWeek,
      type: "other",
      isAllDay: false,
      location: "Laboratório de Design"
    }
  ];
};