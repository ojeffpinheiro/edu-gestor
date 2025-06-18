// src/contexts/planning/LessonsContext.tsx
import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { DayOfWeek, Lesson, Shift } from '../utils/types/Planning';

interface LessonsState {
  lessons: Lesson[];
  currentLesson: Partial<Lesson>;
  selectedCell: { day: DayOfWeek; time: string } | null;
  formErrors: Record<string, string>;
}

type LessonsAction =
  | { type: 'ADD_LESSON'; payload: Lesson }
  | { type: 'UPDATE_LESSON'; payload: Lesson }
  | { type: 'DELETE_LESSON'; payload: number }
  | { type: 'SET_CURRENT_LESSON'; payload: Partial<Lesson> }
  | { type: 'SET_SELECTED_CELL'; payload: { day: DayOfWeek; time: string } | null }
  | { type: 'SET_FORM_ERRORS'; payload: Record<string, string> };

interface LessonsContextType {
  state: LessonsState;
  addLesson: (lesson: Lesson) => void;
  updateLesson: (lesson: Lesson) => void;
  deleteLesson: (id: number) => void;
  setCurrentLesson: (lesson: Partial<Lesson>) => void;
  setSelectedCell: (cell: { day: DayOfWeek; time: string } | null) => void;
  setFormErrors: (errors: Record<string, string>) => void;
  handleAddLesson: (day: DayOfWeek, time: string, shift: Shift) => void;
}

const LessonsContext = createContext<LessonsContextType | undefined>(undefined);

const initialState: LessonsState = {
  lessons: [],
  currentLesson: {},
  selectedCell: null,
  formErrors: {}
};

function lessonsReducer(state: LessonsState, action: LessonsAction): LessonsState {
  switch (action.type) {
    case 'ADD_LESSON':
      return { ...state, lessons: [...state.lessons, action.payload] };
    case 'UPDATE_LESSON':
      return {
        ...state,
        lessons: state.lessons.map(lesson =>
          lesson.id === action.payload.id ? action.payload : lesson
        )
      };
    case 'DELETE_LESSON':
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson.id !== action.payload)
      };
    case 'SET_CURRENT_LESSON':
      return { ...state, currentLesson: action.payload };
    case 'SET_SELECTED_CELL':
      return { ...state, selectedCell: action.payload };
    case 'SET_FORM_ERRORS':
      return { ...state, formErrors: action.payload };
    default:
      return state;
  }
}

export const LessonsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(lessonsReducer, initialState);

  const addLesson = useCallback((lesson: Lesson) => {
    dispatch({ type: 'ADD_LESSON', payload: lesson });
  }, []);

  const updateLesson = useCallback((lesson: Lesson) => {
    dispatch({ type: 'UPDATE_LESSON', payload: lesson });
  }, []);

  const deleteLesson = useCallback((id: number) => {
    dispatch({ type: 'DELETE_LESSON', payload: id });
  }, []);

  const setCurrentLesson = useCallback((lesson: Partial<Lesson>) => {
    dispatch({ type: 'SET_CURRENT_LESSON', payload: lesson });
  }, []);

  const setSelectedCell = useCallback((cell: { day: DayOfWeek; time: string } | null) => {
    dispatch({ type: 'SET_SELECTED_CELL', payload: cell });
  }, []);

  const setFormErrors = useCallback((errors: Record<string, string>) => {
    dispatch({ type: 'SET_FORM_ERRORS', payload: errors });
  }, []);

  const handleAddLesson = useCallback((day: DayOfWeek, time: string, shift: Shift) => {
    setCurrentLesson({ day, timeSlot: time, shift });
  }, [setCurrentLesson]);

  const value = {
    state,
    addLesson,
    updateLesson,
    deleteLesson,
    setCurrentLesson,
    setSelectedCell,
    setFormErrors,
    handleAddLesson
  };

  return (
    <LessonsContext.Provider value={value}>
      {children}
    </LessonsContext.Provider>
  );
};

export const useLessons = () => {
  const context = useContext(LessonsContext);
  if (context === undefined) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  return context;
};