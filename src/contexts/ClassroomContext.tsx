import React, { createContext, useContext } from 'react';
import { LayoutConfig } from '../utils/types/Team';
import { StudentFormData } from '../utils/types/BasicUser';

interface ClassroomContextType {
  layout: LayoutConfig;
  studentList: StudentFormData[];
  setLayout: React.Dispatch<React.SetStateAction<LayoutConfig>>;
  getStudentName: (id?: number) => string;
  getStudentAttendance: (id: number) => number;
}

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

export const ClassroomProvider: React.FC<{
  value: ClassroomContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <ClassroomContext.Provider value={value}>
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