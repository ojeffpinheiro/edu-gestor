import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { LayoutConfig, SeatType } from '../utils/types/Team';
import { StudentFormData } from '../utils/types/BasicUser';
import { findBestSeatForStudent, initializeLayout, Template } from '../utils/classroomUtils';
import { mockStudentsTeam } from '../mocks/student';

type ClassroomState = {
  layout: LayoutConfig;
  currentTemplate: Template;
  studentList: StudentFormData[];
  editMode: boolean;
  verifyMode: boolean;
  swapMode: boolean;
  selectedSeat: SeatType | null;
  selectedStudent: StudentFormData | null;
  saveModalOpen: boolean;
  loadModalOpen: boolean;
  layoutName: string;
  view: 'table' | 'layout';
  isModalOpen: boolean;
  filteredStudents: StudentFormData[];
  notification: { show: boolean; message: string; type: string };
  savedLayouts: { name: string; layout: LayoutConfig }[];
  searchTerm: string;
  isLoading: boolean;
  loadingMessage: string;
};

type ClassroomActions = {
  generateAutomaticLayout: () => void;
  getStudentAttendance: (studentId?: number) => number;
  toggleView: () => void;
  showNotification: (message: string, type: string) => void;
  saveCurrentLayout: () => void;
  deleteLayout: (name: string) => void;
  withLoading: (message: string, action: () => Promise<void>) => Promise<void>;
};

type ClassroomAction =
  | { type: 'SET_LAYOUT'; payload: LayoutConfig }
  | { type: 'SET_STUDENT_LIST'; payload: StudentFormData[] }
  | { type: 'TOGGLE_EDIT_MODE' }
  | { type: 'TOGGLE_VERIFY_MODE' }
  | { type: 'TOGGLE_SWAP_MODE' }
  | { type: 'SET_SELECTED_SEAT'; payload: SeatType | null }
  | { type: 'SET_SELECTED_STUDENT'; payload: StudentFormData | null }
  | { type: 'SET_SAVE_MODAL_OPEN'; payload: boolean }
  | { type: 'UPDATE_SEAT'; payload: SeatType }
  | { type: 'TOGGLE_SAVE_MODAL'; payload: boolean }
  | { type: 'TOGGLE_LOAD_MODAL'; payload: boolean }
  | { type: 'SET_LAYOUT_NAME'; payload: string }
  | { type: 'SET_VIEW'; payload: 'table' | 'layout' }
  | { type: 'TOGGLE_MODAL'; payload: boolean }
  | { type: 'SET_FILTERED_STUDENTS'; payload: StudentFormData[] }
  | { type: 'SET_NOTIFICATION'; payload: { show: boolean; message: string; type: string } }
  | { type: 'SET_SAVED_LAYOUTS'; payload: { name: string; layout: LayoutConfig }[] }
  | { type: 'SET_LOADING'; payload: { loading: boolean; message: string } }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_CURRENT_TEMPLATE'; payload: Template };

const initialState: ClassroomState = {
  layout: { rows: 5, columns: 5, seats: initializeLayout(5, 5).seats, },
  currentTemplate: 'rows',
  studentList: mockStudentsTeam,
  editMode: false,
  verifyMode: false,
  swapMode: false,
  selectedSeat: null,
  selectedStudent: null,
  filteredStudents: [],
  savedLayouts: [],
  saveModalOpen: false,
  loadModalOpen: false,
  isModalOpen: false,
  layoutName: '',
  view: 'table',
  notification: { show: false, message: '', type: '' },
  searchTerm: '',
  isLoading: false,
  loadingMessage: '',
};

const reducer = (state: ClassroomState, action: ClassroomAction): ClassroomState => {
  switch (action.type) {
    case 'SET_LAYOUT':
      return { ...state, layout: action.payload };
    case 'SET_STUDENT_LIST':
      return { ...state, studentList: action.payload };
    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        editMode: !state.editMode,
        verifyMode: false,
        swapMode: false,
      };
    case 'TOGGLE_VERIFY_MODE':
      return {
        ...state,
        verifyMode: !state.verifyMode,
        editMode: false,
        swapMode: false,
      };
    case 'TOGGLE_SWAP_MODE':
      return {
        ...state,
        swapMode: !state.swapMode,
        editMode: false,
        verifyMode: false,
      };
    case 'SET_SELECTED_SEAT':
      return { ...state, selectedSeat: action.payload };
    case 'SET_SELECTED_STUDENT':
      return { ...state, selectedStudent: action.payload };
    case 'UPDATE_SEAT':
      return {
        ...state,
        layout: {
          ...state.layout,
          seats: state.layout.seats.map(seat =>
            seat.id === action.payload.id ? action.payload : seat
          ),
        },
      };
    case 'TOGGLE_SAVE_MODAL':
      return { ...state, saveModalOpen: !state.saveModalOpen };
    case 'TOGGLE_LOAD_MODAL':
      return { ...state, loadModalOpen: !state.loadModalOpen };
    case 'SET_LAYOUT_NAME':
      return { ...state, layoutName: action.payload };
    case 'SET_VIEW':
      return { ...state, view: action.payload };
    case 'TOGGLE_MODAL':
      return { ...state, isModalOpen: !state.isModalOpen };
    case 'SET_FILTERED_STUDENTS':
      return { ...state, filteredStudents: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'SET_SAVED_LAYOUTS':
      return { ...state, savedLayouts: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.loading,
        loadingMessage: action.payload.message || ''
      };
    case 'SET_CURRENT_TEMPLATE':
      return { ...state, currentTemplate: action.payload };
    default:
      return state;
  }
};

const ClassroomContext = createContext<{
  state: ClassroomState;
  dispatch: React.Dispatch<ClassroomAction>;
  actions: ClassroomActions;
}>({
  state: initialState,
  dispatch: () => {
    throw new Error('Dispatch não pode ser chamado fora do ClassroomProvider');
  },
  actions: {
    generateAutomaticLayout: () => {
      throw new Error('generateAutomaticLayout não pode ser chamado fora do ClassroomProvider');
    },
    getStudentAttendance: () => {
      throw new Error('getStudentAttendance não pode ser chamado fora do ClassroomProvider');
    },
    toggleView: () => {
      throw new Error('toggleView não pode ser chamado fora do ClassroomProvider');
    },
    showNotification(message, type) {
      throw new Error('showNotification não pode ser chamado fora do ClassroomProvider');
    },
    saveCurrentLayout() {
      throw new Error('saveCurrentLayout não pode ser chamado fora do ClassroomProvider');
    },
    deleteLayout(name) {
      throw new Error('deleteLayout não pode ser chamado fora do ClassroomProvider');
    },
    withLoading(message, action) {
      throw new Error('withLoading não pode ser chamado fora do ClassroomProvider');
    },
  }
});

export const ClassroomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const generateAutomaticLayout = useCallback(() => {
    const newSeats = [...state.layout.seats];
    const unassignedStudents = [...state.studentList]
      .filter(student => !newSeats.some(s => s.studentId === student.id));

    const priorityStudents = unassignedStudents.filter(student => student.specialNeeds);
    priorityStudents.forEach(student => {
      const bestSeat = findBestSeatForStudent(student, newSeats);
      if (bestSeat) {
        bestSeat.studentId = student.id;
      }
    });

    const remainingStudents = unassignedStudents.filter(student =>
      !priorityStudents.includes(student)
    );

    remainingStudents.forEach(student => {
      const emptySeat = newSeats.find(s => !s.studentId);
      if (emptySeat) {
        emptySeat.studentId = student.id;
      }
    });
    dispatch({ type: 'SET_LAYOUT', payload: { ...state.layout, seats: newSeats } });
  }, [state.layout, state.studentList]);

  const getStudentAttendance = useCallback((studentId?: number): number => {
    if (!studentId) return 0;
    const student = state.studentList.find(s => s.id === studentId);
    return student ? (student.attendance ?? 0) : 0;
  }, [state.studentList]);

  const toggleView = useCallback(() => {
    dispatch({ type: 'SET_VIEW', payload: state.view === 'table' ? 'layout' : 'table' });
  }, [state.view]);

  const showNotification = useCallback((message: string, type: string) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { show: true, message, type } });
    setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', payload: { show: false, message: '', type: '' } });
    }, 3000);
  }, []);

  const saveCurrentLayout = useCallback(() => {
    const newLayout = {
      name: state.layoutName,
      layout: JSON.parse(JSON.stringify(state.layout))
    };
    const updatedLayouts = [...state.savedLayouts, newLayout];
    dispatch({ type: 'SET_SAVED_LAYOUTS', payload: updatedLayouts });
    localStorage.setItem('savedLayouts', JSON.stringify(updatedLayouts));
    dispatch({ type: 'TOGGLE_SAVE_MODAL', payload: false });
    showNotification('Layout salvo com sucesso!', 'success');
  }, [state.layoutName, state.layout, state.savedLayouts, showNotification]);

  const deleteLayout = useCallback((name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o layout "${name}"?`)) {
      const updated = state.savedLayouts.filter(l => l.name !== name);
      dispatch({ type: 'SET_SAVED_LAYOUTS', payload: updated });
      localStorage.setItem('savedLayouts', JSON.stringify(updated));
      showNotification(`Layout "${name}" excluído`, 'info');
    }
  }, [state.savedLayouts, showNotification]);

  const withLoading = async (message: string, action: () => Promise<void>) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true, message } });
    try {
      await action();
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { loading: false, message: '' } });
    }
  };

  const actions = {
    generateAutomaticLayout,
    getStudentAttendance,
    toggleView,
    showNotification,
    saveCurrentLayout,
    deleteLayout,
    withLoading,
  };

  return (
    <ClassroomContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </ClassroomContext.Provider>
  );
};

export const useClassroom = () => {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error('useClassroom must be used within a ClassroomProvider');
  }
  return context;
};