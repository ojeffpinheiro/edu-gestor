import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GeneralObjective, PlanningData, SchoolInfo } from '../utils/types/Planning';
import { mockPlanningData } from '../mocks/planning';
import { CalendarProvider } from './CalendarContext';

type Planning = PlanningData & {
  selectedSchool: SchoolInfo;
}

type PlanningContextType = {
  state: Planning;
  dispatch: React.Dispatch<Action>;
};

type Action =
  | { type: 'UPDATE_SCHOOL_INFO'; payload: SchoolInfo }
  | { type: 'ADD_GENERAL_OBJECTIVE'; payload: GeneralObjective }
  | { type: 'UPDATE_GENERAL_OBJECTIVE'; payload: GeneralObjective }
  | { type: 'DELETE_GENERAL_OBJECTIVE'; payload: string }
  | { type: 'ADD_SCHOOL'; payload: SchoolInfo }
  | { type: 'UPDATE_SCHOOL'; payload: SchoolInfo }
  | { type: 'DELETE_SCHOOL'; payload: string }
  | { type: 'SET_SELECTED_SCHOOL'; payload: SchoolInfo | null }
  ;

// Criar o contexto
const PlanningContext = createContext<PlanningContextType | undefined>(undefined);

// Provider component
export const PlanningProvider: React.FC<{ children: ReactNode}> = ({ 
  children,
}) => {
  // Ensure initialData includes selectedSchool
  const initialData: Planning = {
    ...mockPlanningData,
    selectedSchool: mockPlanningData.schoolInfo // or set a default SchoolInfo here
  };
  const [state, dispatch] = useReducer(planningReducer, initialData);

  return (
    <PlanningContext.Provider value={{ state, dispatch }}>
      <CalendarProvider>
        {children}
      </CalendarProvider>
    </PlanningContext.Provider>
  );
}

// Reducer function should be outside the component
function planningReducer(state: Planning, action: Action): Planning {
  switch (action.type) {
    case 'UPDATE_SCHOOL_INFO':
      return {
        ...state,
        schoolInfo: action.payload,
        selectedSchool: action.payload // keep selectedSchool in sync if needed
      };
    
    case 'ADD_GENERAL_OBJECTIVE':
      return {
        ...state,
        generalObjectives: [...state.generalObjectives, action.payload]
      };
    
    case 'UPDATE_GENERAL_OBJECTIVE':
      return {
        ...state,
        generalObjectives: state.generalObjectives.map(obj => 
          obj.id === action.payload.id ? action.payload : obj
        )
      };
    
    case 'DELETE_GENERAL_OBJECTIVE':
      return {
        ...state,
        generalObjectives: state.generalObjectives.filter(obj => obj.id !== action.payload)
      };

    case 'SET_SELECTED_SCHOOL':
      return {
        ...state,
        selectedSchool: action.payload ?? state.selectedSchool
      };

    // Adicione outros casos conforme necessário
    
    default:
      return state;
  }
}

// Hook personalizado para usar o contexto
export const usePlanning = () => {
  const context = useContext(PlanningContext);
  if (context === undefined) {
    throw new Error('usePlanning must be used within a PlanningProvider');
  }
  return context;
};