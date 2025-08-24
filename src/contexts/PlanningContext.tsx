import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { CalendarEvent } from '../types/academic/CalendarEvent';
import { Holiday, NonSchoolDay, Task } from '../types/academic/Planning';
import { LessonPlan } from '../types/academic/DidacticSequence';

interface Team {
  id: number;
  name: string;
}

interface CalendarState {
  tasks: Task[];
  teams: Team[];
  lessonPlans: LessonPlan[];
  events: CalendarEvent[];
  holidays: Holiday[];
  nonSchoolDays: NonSchoolDay[];
  dayEvents: CalendarEvent[];
  past: CalendarState[];
  future: CalendarState[];
}

type CalendarAction =
  | { type: 'ADD_EVENT'; payload: CalendarEvent }
  | { type: 'UPDATE_EVENT'; payload: CalendarEvent }
  | { type: 'DELETE_EVENT'; payload: number }
  | { type: 'ADD_HOLIDAY'; payload: Holiday }
  | { type: 'UPDATE_HOLIDAY'; payload: Holiday }
  | { type: 'DELETE_HOLIDAY'; payload: number }
  | { type: 'ADD_NON_SCHOOL_DAY'; payload: NonSchoolDay }
  | { type: 'UPDATE_NON_SCHOOL_DAY'; payload: NonSchoolDay }
  | { type: 'DELETE_NON_SCHOOL_DAY'; payload: number }
  | { type: 'SET_DAY_EVENTS'; payload: CalendarEvent[] }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'ADD_LESSON_PLAN'; payload: LessonPlan }
  | { type: 'UNDO' }
  | { type: 'REDO' };

interface CalendarContextType {
  state: CalendarState;
  canUndo: boolean;
  canRedo: boolean;
  dispatch: React.Dispatch<CalendarAction>;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: number) => void;
  addHoliday: (holiday: Holiday) => void;
  isHoliday: (date: Date) => boolean;
  setDayEvents: (events: CalendarEvent[]) => void;
  handleDayClick: (day: number) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

const initialState: CalendarState = {
  tasks: [],
  teams: [],
  lessonPlans: [],
  events: [],
  holidays: [],
  nonSchoolDays: [],
  dayEvents: [],
  past: [],
  future: [],
};

function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => Number(event.id) !== action.payload)
      };
    
    case 'ADD_HOLIDAY':
      return {
        ...state,
        holidays: [...state.holidays, action.payload]
      };
    
    case 'SET_DAY_EVENTS':
      return { ...state, dayEvents: action.payload };
    
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        )
      };
    
    case 'ADD_LESSON_PLAN':
      return { ...state, lessonPlans: [...state.lessonPlans, action.payload] };
    
    case 'UNDO':
      if (state.past.length === 0) return state;
      return {
        ...state,
        ...state.past[state.past.length - 1],
        past: state.past.slice(0, -1),
        future: [state, ...state.future]
      };
    
    case 'REDO':
      if (state.future.length === 0) return state;
      return {
        ...state,
        ...state.future[0],
        past: [...state.past, state],
        future: state.future.slice(1)
      };
    
    default:
      return state;
  }
}

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  const addEvent = useCallback((event: CalendarEvent) => {
    dispatch({ type: 'ADD_EVENT', payload: event });
  }, []);

  const updateEvent = useCallback((event: CalendarEvent) => {
    dispatch({ type: 'UPDATE_EVENT', payload: event });
  }, []);

  const deleteEvent = useCallback((id: number) => {
    dispatch({ type: 'DELETE_EVENT', payload: id });
  }, []);

  const addHoliday = useCallback((holiday: Holiday) => {
    dispatch({ type: 'ADD_HOLIDAY', payload: holiday });
  }, []);

  const isHoliday = useCallback((date: Date): boolean => {
    return state.holidays.some(holiday =>
      new Date(holiday.date).toDateString() === date.toDateString()
    );
  }, [state.holidays]);

  const setDayEvents = useCallback((events: CalendarEvent[]) => {
    dispatch({ type: 'SET_DAY_EVENTS', payload: events });
  }, []);

  const handleDayClick = useCallback((day: number) => {
    const date = new Date();
    date.setDate(day);
    const filteredEvents = state.events.filter(ev => 
      new Date(ev.start).getDate() === day &&
      new Date(ev.start).getMonth() === date.getMonth()
    );
    setDayEvents(filteredEvents);
  }, [state.events, setDayEvents]);

  const toggleTask = useCallback((taskId: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const value = {
    state,
    canUndo,
    canRedo,
    dispatch,
    undo,
    redo,
    addEvent,
    updateEvent,
    deleteEvent,
    addHoliday,
    isHoliday,
    setDayEvents,
    handleDayClick,
    toggleTask,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const usePlanningContext = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};