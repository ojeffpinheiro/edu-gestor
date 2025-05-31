// components/ClassResultsTable.tsx
import React from 'react';
import { ExamResult, StudentResult } from '../../utils/types/Assessment';
import { calculatePerformanceTrend } from '../../utils/dataProcessing';

interface ClassResultsTableProps {
  students: StudentResult[];
  examResults: ExamResult[];
  timeRange: 'week' | 'month' | 'quarter' | 'semester' | 'year';
  onStudentSelect: (studentId: string) => void;
}

const ClassResultsTable: React.FC<ClassResultsTableProps> = ({ 
  students, 
  examResults,
  timeRange,
  onStudentSelect
}) => {
  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'improving': return '↑';
      case 'declining': return '↓';
      default: return '→';
    }
  };

  // Função para filtrar examos por período
  const filterExamsByTimeRange = (exams: ExamResult[]) => {
    const now = new Date();
    let startDate = new Date();
    
    switch(timeRange) {
      case 'week': startDate.setDate(now.getDate() - 7); break;
      case 'month': startDate.setMonth(now.getMonth() - 1); break;
      case 'quarter': startDate.setMonth(now.getMonth() - 3); break;
      case 'semester': startDate.setMonth(now.getMonth() - 6); break;
      case 'year': startDate.setFullYear(now.getFullYear() - 1); break;
    }
    
    return exams.filter(exam => new Date(exam.completedAt) >= startDate);
  };

  return (
    <div className="results-table-container">
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Média Atual</th>
            <th>Evolução ({timeRange})</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => {
            const studentExams = examResults
              .filter(result => result.studentId === student.studentId);
            
            const recentExams = filterExamsByTimeRange(studentExams);
            
            // Converter para formato esperado por calculatePerformanceTrend
            const examSummaries = recentExams.map(exam => ({
              averageScore: exam.totalScore,
              date: exam.completedAt
            }));
            
            const trend = calculatePerformanceTrend(examSummaries);

            return (
              <tr key={student.studentId}>
                <td>{student.studentName}</td>
                <td>{student.overallAverage.toFixed(1)}</td>
                <td className={`trend-${trend}`}>
                  {getTrendIcon(trend)} ({trend})
                </td>
                <td>
                  <button onClick={() => onStudentSelect(student.studentId)}>
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClassResultsTable;