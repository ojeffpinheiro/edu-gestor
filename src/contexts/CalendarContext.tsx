import React, { createContext, useState, useCallback, useContext } from 'react';
import {
  addMonths,
  subMonths,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addYears,
  subYears
} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import {
  AcademicPeriod,
  SchoolCalendar,
  CalendarEvent,
  EventType,
  CalendarViewType,
} from '../utils/types/CalendarEvent';

interface CalendarContextData {
  currentDate: Date;
  view: CalendarViewType;
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
  setView: (view: CalendarViewType) => void;
  nextDay: () => void;
  prevDay: () => void;
  onNextWeek: () => void;
  onPrevWeek: () => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  onNextYear: () => void;
  onPrevYear: () => void;
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

/**
 * Contexto que fornece dados e operações para o calendário escolar
 * @typedef {Object} CalendarContextData
 * @property {Date} currentDate - Data atualmente selecionada no calendário
 * @property {CalendarViewType} view - Visualização atual (dia, semana, mês, etc.)
 * @property {SchoolCalendar} calendar - Dados completos do calendário escolar
 * @property {AcademicPeriod | null} currentPeriod - Período acadêmico atual
 * @property {CalendarEvent | null} selectedEvent - Evento atualmente selecionado
 * @property {CalendarEvent[]} events - Lista de todos os eventos
 * @property {boolean} isLoading - Indica se os dados estão sendo carregados
 * @property {Error | null} error - Erro ocorrido, se houver
 * @property {function} createEvent - Função para criar um novo evento
 * @property {function} updateEvent - Função para atualizar um evento existente
 * @property {function} deleteEvent - Função para remover um evento
 * @property {function} onToday - Função para voltar à data atual
 * @property {function} isEventSelected - Verifica se um evento está selecionado
 * @property {function} setView - Altera a visualização do calendário
 * @property {function} nextDay - Navega para o próximo dia
 * @property {function} prevDay - Navega para o dia anterior
 * @property {function} onNextWeek - Navega para a próxima semana
 * @property {function} onPrevWeek - Navega para a semana anterior
 * @property {function} onNextMonth - Navega para o próximo mês
 * @property {function} onPrevMonth - Navega para o mês anterior
 * @property {function} onNextYear - Navega para o próximo ano
 * @property {function} onPrevYear - Navega para o ano anterior
 * @property {function} onSelectEvent - Seleciona/desseleciona um evento
 * @property {function} addEvent - Adiciona um evento ao calendário
 * @property {function} moveEvent - Move um evento para novas datas
 * @property {function} setCurrentPeriod - Define o período acadêmico atual
 * @property {function} filterEvents - Filtra eventos com base em critérios
 */

/**
 * Provedor do contexto do calendário
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 * @param {SchoolCalendar} props.initialCalendar - Dados iniciais do calendário
 */
export const CalendarProvider: React.FC<React.PropsWithChildren<{ initialCalendar: SchoolCalendar }>> = ({
  children,
  initialCalendar
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarViewType>('month');
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

  const onNextYear = useCallback(() => {
    setCurrentDate(addYears(currentDate, 1));
  }, [currentDate]);
  
  const onPrevYear = useCallback(() => {
    setCurrentDate(subYears(currentDate, 1));
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
        onNextYear,
        onPrevYear,
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