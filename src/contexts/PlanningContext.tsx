import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useMemo,
  useCallback,
  useEffect
} from "react";

import { LessonPlan } from "../utils/types/DidacticSequence";

import {
  Lesson,
  Task,
  Team,
  Event,
  GradeSettings,
  LessonPlanTemplate,
  Holiday,
  NonSchoolDay
} from "../utils/types/Planning";

interface PlanningState {
  teams: Team[];
  lessons: Lesson[];
  events: Event[];
  tasks: Task[];
  lessonPlans: LessonPlan[];
  holidays: Holiday[];
  gradeSettings: GradeSettings[];
  planningTemplates: LessonPlanTemplate[];
  history: {
    past: PlanningState[];
    future: PlanningState[];
  };
  nonSchoolDays: NonSchoolDay[];
}

type PlanningAction =
  | { type: 'ADD_TEAM'; payload: Team }
  | { type: 'UPDATE_TEAM'; payload: Team }
  | { type: 'DELETE_TEAM'; payload: number }
  | { type: 'ADD_LESSON'; payload: Lesson }
  | { type: 'UPDATE_LESSON'; payload: Lesson }
  | { type: 'DELETE_LESSON'; payload: number }
  | { type: 'ADD_LESSON_PLAN'; payload: LessonPlan }
  | { type: 'ADD_EVENT'; payload: Event }
  | { type: 'UPDATE_EVENT'; payload: Event }
  | { type: 'DELETE_EVENT'; payload: number }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'ADD_HOLIDAY'; payload: Holiday }
  | { type: 'UPDATE_HOLIDAY'; payload: Holiday }
  | { type: 'DELETE_HOLIDAY'; payload: number }
  | { type: 'ADD_NON_SCHOOL_DAY'; payload: NonSchoolDay }
  | { type: 'UPDATE_NON_SCHOOL_DAY'; payload: NonSchoolDay }
  | { type: 'DELETE_NON_SCHOOL_DAY'; payload: number }
  | { type: 'UPDATE_GRADE_SETTINGS'; payload: GradeSettings }
  | { type: 'SAVE_TEMPLATE'; payload: LessonPlanTemplate }
  | { type: 'UNDO' }
  | { type: 'REDO' };

const PLANNING_STORAGE_KEY = 'planningState';

interface PlanningContextData {
  state: PlanningState;
  dispatch: Dispatch<PlanningAction>;
  addTeam: (team: Team) => void;
  updateTeam: (team: Team) => void;
  addLesson: (lesson: Lesson) => void;
  toggleTask: (id: number) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isHoliday: (date: Date) => boolean;
  getGradeSettings: (gradeLevel: string) => GradeSettings | undefined;
}

const initialState: PlanningState = {
  teams: [],
  lessons: [],
  events: [],
  tasks: [],
  lessonPlans: [],
  holidays: [],
  nonSchoolDays: [],
  gradeSettings: [],
  planningTemplates: [],
  history: {
    past: [],
    future: []
  },
};

const PlanningContext = createContext<PlanningContextData>({
  state: initialState,
  dispatch: () => null,
  addTeam: () => null,
  updateTeam: () => null,
  addLesson: () => null,
  toggleTask: () => null,
  redo: () => null,
  undo: () => null,
  getGradeSettings: () => undefined,
  isHoliday: () => false,
  canRedo: false,
  canUndo: false
});

function planningReducer(state: PlanningState, action: PlanningAction): PlanningState {
  switch (action.type) {
    case 'ADD_TEAM':
      return { ...state, teams: [...state.teams, action.payload] };

    case 'UPDATE_TEAM':
      return {
        ...state,
        teams: state.teams.map(team =>
          team.id === action.payload.id ? action.payload : team
        ),
      };

    case 'DELETE_TEAM':
      return {
        ...state,
        teams: state.teams.filter(team => team.id !== action.payload)
      };

    case 'ADD_LESSON':
      return { ...state, lessons: [...state.lessons, action.payload] };

    case 'UPDATE_LESSON':
      return {
        ...state,
        lessons: state.lessons.map(lesson =>
          lesson.id === action.payload.id ? action.payload : lesson
        ),
      };

    case 'DELETE_LESSON':
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson.id !== action.payload)
      };

    case 'ADD_LESSON_PLAN':
      return { ...state, lessonPlans: [...state.lessonPlans, action.payload] };

    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };

    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };

    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case 'ADD_HOLIDAY':
      return {
        ...state,
        holidays: [...state.holidays, {
          ...action.payload,
          recurring: action.payload.recurring || false, // Adiciona valor padrão se não existir
          recurrencePattern: action.payload.recurrencePattern || undefined
        }]
      };

    case 'UPDATE_GRADE_SETTINGS':
      return {
        ...state,
        gradeSettings: state.gradeSettings.some(gs => gs.id === action.payload.id)
          ? state.gradeSettings.map(gs => gs.id === action.payload.id ? action.payload : gs)
          : [...state.gradeSettings, action.payload]
      };

    case 'SAVE_TEMPLATE':
      return {
        ...state,
        planningTemplates: [...state.planningTemplates, action.payload]
      };

    default:
      return state;
  }
}

function historyReducer(state: PlanningState, action: PlanningAction) {
  switch (action.type) {
    case 'UNDO':
      if (state.history.past.length === 0) return state;
      return {
        ...state.history.past[state.history.past.length - 1],
        history: {
          past: state.history.past.slice(0, -1),
          future: [state, ...state.history.future]
        }
      };

    case 'REDO':
      if (state.history.future.length === 0) return state;
      return {
        ...state.history.future[0],
        history: {
          past: [...state.history.past, state],
          future: state.history.future.slice(1)
        }
      };

    default:
      // Para outras ações, atualiza o histórico
      return {
        ...planningReducer(state, action),
        history: {
          past: [...state.history.past, state],
          future: []
        }
      };
  }
}


export const loadState = (): PlanningState | undefined => {
  try {
    const serializedState = localStorage.getItem(PLANNING_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state:', err);
    return undefined;
  }
};

export const saveState = (state: PlanningState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(PLANNING_STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Failed to save state:', err);
  }
};

export const PlanningProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(historyReducer, loadState() || initialState);

  // Funções memoizadas para melhor performance
  const addTeam = useCallback((team: Team) => {
    dispatch({ type: 'ADD_TEAM', payload: team });
  }, []);

  const updateTeam = useCallback((team: Team) => {
    dispatch({ type: 'UPDATE_TEAM', payload: team });
  }, []);

  const addLesson = useCallback((lesson: Lesson) => {
    dispatch({ type: 'ADD_LESSON', payload: lesson });
  }, []);

  const toggleTask = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, []);

  const isHoliday = useCallback((date: Date): boolean => {
    return state.holidays.some(holiday =>
      new Date(holiday.date).toDateString() === date.toDateString()
    );
  }, [state.holidays]);

  const getGradeSettings = useCallback((gradeLevel: string): GradeSettings | undefined => {
    return state.gradeSettings.find(gs => gs.gradeLevel === gradeLevel);
  }, [state.gradeSettings]);

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);
  const canUndo = state.history.past.length > 0;
  const canRedo = state.history.future.length > 0;

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo(() => ({
    state,
    dispatch,
    addTeam,
    updateTeam,
    addLesson,
    toggleTask,
    undo,
    redo,
    canUndo,
    canRedo,
    isHoliday,
    getGradeSettings
  }), [state, addTeam, updateTeam, addLesson, toggleTask, undo, redo, canUndo, canRedo, isHoliday, getGradeSettings]);

  return (
    <PlanningContext.Provider value={value}>
      {children}
    </PlanningContext.Provider>
  );
};

export default PlanningContext;