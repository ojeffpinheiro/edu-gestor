// src/contexts/planning/ScheduleContext.tsx
import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { Shift, ShiftSettings, Period } from '../utils/types/Planning';
import { ModalProvider } from './ModalContext';

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

const initializeShiftSettings = (): Record<Shift, ShiftSettings> => ({
    'Manhã': {
        name: 'Manhã',
        startTime: '07:00',
        endTime: '12:00',
        periodDuration: 50,
        breakDuration: 20,
        periods: [
            { id: 1, name: '1º Aula', startTime: '07:00', endTime: '07:50' },
            { id: 2, name: '2º Aula', startTime: '07:50', endTime: '08:40' },
            { id: 3, name: 'Intervalo', startTime: '08:40', endTime: '09:00', isBreak: true },
            { id: 4, name: '3º Aula', startTime: '09:00', endTime: '09:50' },
            { id: 5, name: '4º Aula', startTime: '09:50', endTime: '10:40' },
            { id: 6, name: '5º Aula', startTime: '10:40', endTime: '11:30' },
            { id: 7, name: '6º Aula', startTime: '11:30', endTime: '12:00' }
        ]
    },
    'Tarde': {
        name: 'Tarde',
        startTime: '13:00',
        endTime: '18:00',
        periodDuration: 50,
        breakDuration: 20,
        periods: [
            { id: 8, name: '1º Aula', startTime: '13:00', endTime: '13:50' },
            { id: 9, name: '2º Aula', startTime: '13:50', endTime: '14:40' },
            { id: 10, name: 'Intervalo', startTime: '14:40', endTime: '15:00', isBreak: true },
            { id: 11, name: '3º Aula', startTime: '15:00', endTime: '15:50' },
            { id: 12, name: '4º Aula', startTime: '15:50', endTime: '16:40' },
            { id: 13, name: '5º Aula', startTime: '16:40', endTime: '17:30' },
            { id: 14, name: '6º Aula', startTime: '17:30', endTime: '18:00' }
        ]
    },
    'Noite': {
        name: 'Noite',
        startTime: '19:00',
        endTime: '22:00',
        periodDuration: 50,
        breakDuration: 10,
        periods: [
            { id: 15, name: '1º Aula', startTime: '19:00', endTime: '19:50' },
            { id: 16, name: '2º Aula', startTime: '19:50', endTime: '20:40' },
            { id: 17, name: 'Intervalo', startTime: '20:40', endTime: '20:50', isBreak: true },
            { id: 18, name: '3º Aula', startTime: '20:50', endTime: '21:40' },
            { id: 19, name: '4º Aula', startTime: '21:40', endTime: '22:00' }
        ]
    }
});

const initialState: ScheduleState = {
  shiftSettings: initializeShiftSettings(),
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
      <ModalProvider>
        {children}
      </ModalProvider>
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