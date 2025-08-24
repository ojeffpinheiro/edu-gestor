import React, { useState } from 'react';
import { ClassPerformance, StudentResult } from '../../../types/academic/Assessment'
import ClassResultsTable from '../ClassResultsTable'

import EnhancedStudentDetailModal from '../EnhancedStudentDetailModal'

interface StudentTableProps {
  currentClass: ClassPerformance;
  onStudentSelect: (studentId: string | null) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ currentClass, onStudentSelect }) => {
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'semester' | 'year'>('month');

  const studentsAsResults = currentClass.students.map(student => ({
    studentId: student.id,
    studentName: student.name,
    studentEmail: student.email,
    classId: currentClass.classId,
    className: currentClass.className,
    examResults: currentClass.examResults.flatMap(exam => 
      exam.results?.filter(result => result.studentId === student.id) || []
    ),
    overallAverage: student.overallAverage || 0,
    progressTrend: 'stable' as const,
    attendanceRate: student.attendanceRate,
    skillProfile: {},
    riskAssessment: undefined
  }));

  const allExamResults = currentClass.examResults.flatMap(exam => exam.results || []) || [];

  const handleStudentSelect = (studentId: string) => {
    const student = studentsAsResults.find(s => s.studentId === studentId);
    setSelectedStudent(student || null);
    onStudentSelect(studentId);
  };

  return (
    <>
      <ClassResultsTable 
        students={studentsAsResults}
        examResults={allExamResults}
        timeRange={timeRange}
        onStudentSelect={handleStudentSelect}
      />

      {selectedStudent && (
        <EnhancedStudentDetailModal
          student={selectedStudent}
          onClose={() => {
            setSelectedStudent(null);
            onStudentSelect(null);
          }}
        />
      )}
    </>
  );
};

export default StudentTable;