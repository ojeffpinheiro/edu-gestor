// src/contexts/planning/ScheduleContext.tsx
import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { Shift, ShiftSettings, Period } from '../utils/types/Planning';

interface ScheduleState {
  shiftSettings: Record<Shift, ShiftSettings>;
  selectedShift: Shift;
}

type ScheduleAction =
  | { type: 'UPDATE_SHIFT_SETTINGS'; payload: { shift: Shift; settings: ShiftSettings } }
  | { type: 'ADD_PERIOD'; payload: { shift: Shift; period: Period } }
  | { type: 'UPDATE_PERIOD'; payload: { shift: Shift; period: Period } }
  | { type: 'DELETE_PERIOD'; payload: { shift: Shift; periodId: number } }
  | { type: 'SET_SELECTED_SHIFT'; payload: Shift };

interface ScheduleContextType {
  state: ScheduleState;
  updateShiftSettings: (shift: Shift, settings: ShiftSettings) => void;
  addPeriod: (shift: Shift, period: Period) => void;
  updatePeriod: (shift: Shift, period: Period) => void;
  deletePeriod: (shift: Shift, periodId: number) => void;
  setSelectedShift: (shift: Shift) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

const initialState: ScheduleState = {
  shiftSettings: {
    'Manhã': { name: 'Manhã', periods: [], startTime: '07:00', endTime: '12:00', periodDuration: 0, breakDuration: 0 },
    'Tarde': { name: 'Tarde', periods: [], startTime: '13:00', endTime: '18:00', periodDuration: 0, breakDuration: 0 },
    'Noite': { name: 'Noite', periods: [], startTime: '19:00', endTime: '22:00', periodDuration: 0, breakDuration: 0 }
  },
  selectedShift: 'Manhã'
};

function scheduleReducer(state: ScheduleState, action: ScheduleAction): ScheduleState {
  switch (action.type) {
    case 'UPDATE_SHIFT_SETTINGS':
      return {
        ...state,
        shiftSettings: {
          ...state.shiftSettings,
          [action.payload.shift]: action.payload.settings
        }
      };
    case 'SET_SELECTED_SHIFT':
      return { ...state, selectedShift: action.payload };
    // Outros casos...
    default:
      return state;
  }
}

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  const updateShiftSettings = useCallback((shift: Shift, settings: ShiftSettings) => {
    dispatch({ type: 'UPDATE_SHIFT_SETTINGS', payload: { shift, settings } });
  }, []);

  const setSelectedShift = useCallback((shift: Shift) => {
    dispatch({ type: 'SET_SELECTED_SHIFT', payload: shift });
  }, []);

  const addPeriod = useCallback((shift: Shift, period: Period) => {
    dispatch({ type: 'ADD_PERIOD', payload: { shift, period } });
  }, []);

  const updatePeriod = useCallback((shift: Shift, period: Period) => {
    dispatch({ type: 'UPDATE_PERIOD', payload: { shift, period } });
  }, []);

  const deletePeriod = useCallback((shift: Shift, periodId: number) => {
    dispatch({ type: 'DELETE_PERIOD', payload: { shift, periodId } });
  }, []);

  // Outras ações...

  const value = {
    state,
    updateShiftSettings,
    setSelectedShift,
    addPeriod,
    updatePeriod,
    deletePeriod,
    // Outras ações...
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};