import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { LearningObjective, Team } from '../types/academic/Planning';
import { mockTeams } from '../mocks/plannigData';
import { LessonsProvider } from './LessonsContext';

interface TeamsState {
  teams: Team[];
  objectives: LearningObjective[];
}

type TeamsAction =
  | { type: 'ADD_TEAM'; payload: Team }
  | { type: 'UPDATE_TEAM'; payload: Team }
  | { type: 'DELETE_TEAM'; payload: number }
  | { type: 'ADD_OBJECTIVE'; payload: LearningObjective }
  | { type: 'UPDATE_OBJECTIVE'; payload: { id: number; completed: boolean } };

interface TeamsContextType {
  state: TeamsState;
  addTeam: (team: Team) => void;
  updateTeam: (team: Team) => void;
  deleteTeam: (id: number) => void;
  addObjective: (description: string) => void;
  toggleObjective: (id: number) => void;
}

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

const initialState: TeamsState = {
  teams: mockTeams,
  objectives: []
};

function teamsReducer(state: TeamsState, action: TeamsAction): TeamsState {
  switch (action.type) {
    case 'ADD_TEAM':
      return { ...state, teams: [...state.teams, action.payload] };
    case 'UPDATE_TEAM':
      return {
        ...state,
        teams: state.teams.map(team => 
          team.id === action.payload.id ? action.payload : team
        )
      };
    case 'DELETE_TEAM':
      return {
        ...state,
        teams: state.teams.filter(team => team.id !== action.payload)
      };
    case 'ADD_OBJECTIVE':
      return { 
        ...state, 
        objectives: [...state.objectives, action.payload] 
      };
    case 'UPDATE_OBJECTIVE':
      return {
        ...state,
        objectives: state.objectives.map(obj =>
          obj.id === action.payload.id 
            ? { ...obj, completed: action.payload.completed } 
            : obj
        )
      };
    default:
      return state;
  }
}

export const TeamsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(teamsReducer, initialState);

  const addTeam = useCallback((team: Team) => {
    dispatch({ type: 'ADD_TEAM', payload: team });
  }, []);

  const updateTeam = useCallback((team: Team) => {
    dispatch({ type: 'UPDATE_TEAM', payload: team });
  }, []);

  const deleteTeam = useCallback((id: number) => {
    dispatch({ type: 'DELETE_TEAM', payload: id });
  }, []);

  const addObjective = useCallback((description: string) => {
    if (description.trim()) {
      dispatch({
        type: 'ADD_OBJECTIVE',
        payload: { id: Date.now(), description, completed: false }
      });
    }
  }, []);

  const toggleObjective = useCallback((id: number) => {
    dispatch({ type: 'UPDATE_OBJECTIVE', payload: { id, completed: true } });
  }, []);

  const value = {
    state,
    addTeam,
    updateTeam,
    deleteTeam,
    addObjective,
    toggleObjective
  };

  return (
    <TeamsContext.Provider value={value}>
      <LessonsProvider>
        {children}
      </LessonsProvider>
    </TeamsContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (context === undefined) {
    throw new Error('useTeams must be used within a TeamsProvider');
  }
  return context;
};