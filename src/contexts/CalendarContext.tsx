// contexts/CalendarContext.tsx
import React, { createContext, useState, useCallback, useContext } from 'react';
import {
  addMonths,
  subMonths,
  addDays,
  subDays,
  addWeeks,
  subWeeks
} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import {
  AcademicPeriod,
  SchoolCalendar,
  CalendarEvent,
  EventType,
} from '../utils/types/CalendarEvent';

interface CalendarContextData {
  currentDate: Date;
  view: 'month' | 'week' | 'day';
  calendar: SchoolCalendar;
  currentPeriod: AcademicPeriod | null;
  selectedEvent: CalendarEvent | null;
  events: CalendarEvent[];
  isLoading: boolean;
  error: Error | null;
  createEvent: (eventData: Partial<CalendarEvent>) => Promise<CalendarEvent>;
  updateEvent: (params: { id: string; data: Partial<CalendarEvent> }) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  onToday: () => void;
  isEventSelected: (event: CalendarEvent) => boolean;
  setView: (view: 'month' | 'week' | 'day') => void;
  nextDay: () => void;
  prevDay: () => void;
  onNextWeek: () => void;
  onPrevWeek: () => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  onSelectEvent: (event: CalendarEvent) => void;
  addEvent: (event: CalendarEvent) => void;
  moveEvent: (eventId: string, newStart: Date, newEnd: Date) => void;
  setCurrentPeriod: (periodId: string) => void;
  filterEvents: (filter: {
    schoolId?: string;
    classId?: string;
    gradeId?: string;
    type?: EventType;
  }) => CalendarEvent[];
}

const CalendarContext = createContext<CalendarContextData | undefined>(undefined);

export const CalendarProvider: React.FC<React.PropsWithChildren<{ initialCalendar: SchoolCalendar }>> = ({
  children,
  initialCalendar
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [calendar, setCalendar] = useState<SchoolCalendar>(initialCalendar);
  const [currentPeriod, setCurrentPeriod] = useState<AcademicPeriod | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Função para selecionar/desselecionar eventos
  const onSelectEvent = useCallback((event: CalendarEvent | null) => {
    if (event && selectedEvent && event.id === selectedEvent.id) {
      // Desselecionar se o mesmo evento for clicado novamente
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
  }, [selectedEvent]);

  // Verifica se um evento está atualmente selecionado
  const isEventSelected = useCallback((event: CalendarEvent) => {
    return selectedEvent?.id === event.id;
  }, [selectedEvent]);

  const onNextMonth = useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate]);

  const onPrevMonth = useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
  }, [currentDate]);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const addEvent = useCallback((event: CalendarEvent) => {
    setCalendar(prev => ({
      ...prev,
      events: [...prev.events, event]
    }));
  }, []);

  const updateEvent = useCallback((eventId: string, updates: Partial<CalendarEvent>) => {
    setCalendar(prev => ({
      ...prev,
      events: prev.events.map(event =>
        event.id === eventId ? { ...event, ...updates } : event
      )
    }));
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setCalendar(prev => ({
      ...prev,
      events: prev.events.filter(event => event.id !== eventId)
    }));
  }, []);

  const moveEvent = useCallback((eventId: string, newStart: Date, newEnd: Date) => {
    updateEvent(eventId, { start: newStart, end: newEnd });
  }, [updateEvent]);

  const setPeriod = useCallback((periodId: string) => {
    const period = calendar.periods.find(p => p.id === periodId) || null;
    setCurrentPeriod(period);
    if (period) {
      setCurrentDate(period.start);
    }
  }, [calendar.periods]);

  const filterEvents = useCallback((filter: {
    schoolId?: string;
    classId?: string;
    gradeId?: string;
    type?: EventType;
  }) => {
    return calendar.events.filter(event => {
      return (
        (!filter.schoolId || event.schoolId === filter.schoolId) &&
        (!filter.classId || event.classId === filter.classId) &&
        (!filter.gradeId || event.gradeId === filter.gradeId) &&
        (!filter.type || event.type === filter.type)
      );
    });
  }, [calendar.events]);

  const nextDay = useCallback(() => {
    setCurrentDate(addDays(currentDate, 1));
  }, [currentDate]);

  const prevDay = useCallback(() => {
    setCurrentDate(subDays(currentDate, 1));
  }, [currentDate]);

  const onNextWeek = useCallback(() => {
    setCurrentDate(addWeeks(currentDate, 1));
  }, [currentDate]);

  const onPrevWeek = useCallback(() => {
    setCurrentDate(subWeeks(currentDate, 1));
  }, [currentDate]);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        view,
        calendar,
        currentPeriod,
        setView,
        onNextMonth,
        onPrevMonth,
        nextDay,
        prevDay,
        onNextWeek,
        onPrevWeek,
        events: calendar.events,
        isLoading: false,
        error: null,
        createEvent: async (eventData) => {
          const newEvent = { ...eventData, id: uuidv4() } as CalendarEvent;
          setCalendar(prev => ({ ...prev, events: [...prev.events, newEvent] }));
          return newEvent;
        },
        updateEvent: async ({ id, data }) => {
          setCalendar(prev => ({
            ...prev,
            events: prev.events.map(event =>
              event.id === id ? { ...event, ...data } : event
            )
          }));
        },
        deleteEvent: async (id) => {
          setCalendar(prev => ({
            ...prev,
            events: prev.events.filter(event => event.id !== id)
          }));
        },
        onToday: goToToday,
        addEvent,
        moveEvent,
        setCurrentPeriod: setPeriod,
        filterEvents,
        selectedEvent,
        onSelectEvent,
        isEventSelected
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};