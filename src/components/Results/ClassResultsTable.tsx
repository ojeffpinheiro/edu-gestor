import React, { useCallback, useMemo } from 'react';
import { ExamResult, StudentResult } from '../../utils/types/Assessment';
import { calculatePerformanceTrend } from '../../utils/dataProcessing';

interface ClassResultsTableProps {
  students: StudentResult[];
  examResults: ExamResult[];
  timeRange: 'week' | 'month' | 'quarter' | 'semester' | 'year';
  onStudentSelect: (studentId: string) => void;
}

/**
 * Tabela que exibe os resultados da turma com filtro por período de tempo.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array<StudentResult>} props.students - Lista de alunos
 * @param {Array<ExamResult>} props.examResults - Resultados dos exames
 * @param {'week' | 'month' | 'quarter' | 'semester' | 'year'} props.timeRange - Período de tempo para filtrar os resultados
 * @param {Function} props.onStudentSelect - Função chamada ao selecionar um aluno
 * @returns {JSX.Element} Tabela de resultados da turma
 */
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
  const filterExamsByTimeRange = useCallback((exams: ExamResult[]) => {
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
  }, [timeRange]);

  // Pré-processa os dados dos estudantes
  const processedStudents = useMemo(() => {
    return students.map(student => {
      const studentExams = examResults
        .filter(result => result.studentId === student.studentId);
      
      const recentExams = filterExamsByTimeRange(studentExams);
      
      const examSummaries = recentExams.map(exam => ({
        averageScore: exam.totalScore,
        date: exam.completedAt
      }));
      
      const trend = calculatePerformanceTrend(examSummaries);

      return {
        ...student,
        recentExams,
        trend
      };
    });
  }, [students, examResults, filterExamsByTimeRange]);

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
          {processedStudents.map(student => (
            <tr key={student.studentId}>
              <td>{student.studentName}</td>
              <td>{student.overallAverage.toFixed(1)}</td>
              <td className={`trend-${student.trend}`}>
                {getTrendIcon(student.trend)} ({student.trend})
              </td>
              <td>
                <button onClick={() => onStudentSelect(student.studentId)}>
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassResultsTable;