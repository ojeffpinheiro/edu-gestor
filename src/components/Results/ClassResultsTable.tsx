import React from 'react';
import { ClassPerformance } from '../../utils/types/Assessment';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

interface ClassResultsTableProps {
  classPerformance: ClassPerformance;
  onStudentSelect: (studentId: string) => void;
  selectedSubject?: string | null;
}

const ClassResultsTable: React.FC<ClassResultsTableProps> = ({
  classPerformance,
  onStudentSelect,
  selectedSubject
}) => {
  // Processa os resultados filtrados por disciplina
  const processResults = () => {
    const studentMap: Record<string, {
      name: string;
      scores: number[];
      lastScore?: number;
      trend?: number;
    }> = {};

    // Inicializa com dados dos alunos
    classPerformance.students.forEach(student => {
      studentMap[student.id] = {
        name: student.name,
        scores: []
      };
    });

    // Processa os exames
    classPerformance.examResults.forEach(exam => {
      if (selectedSubject && exam.subject !== selectedSubject) return;

      exam.results?.forEach(result => {
        if (studentMap[result.studentId]) {
          studentMap[result.studentId].scores.push(result.totalScore);
        }
      });
    });

    // Calcula tendências
    Object.values(studentMap).forEach(student => {
      if (student.scores.length > 0) {
        student.lastScore = student.scores[student.scores.length - 1];

        if (student.scores.length > 1) {
          const last = student.scores[student.scores.length - 1];
          const prev = student.scores[student.scores.length - 2];
          student.trend = last - prev;
        }
      }
    });

    return studentMap;
  };

  const studentResults = processResults();

  const renderTrendIcon = (trend?: number) => {
    if (trend === undefined) return null;
    if (trend > 0) return <FiTrendingUp className="trend-up" />;
    if (trend < 0) return <FiTrendingDown className="trend-down" />;
    return <FiMinus className="trend-neutral" />;
  };

  return (
    <div className="class-results-table">
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Última Nota</th>
            <th>Tendência</th>
            <th>Nº Avaliações</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(studentResults).map(([studentId, data]) => (
            <tr key={studentId} onClick={() => onStudentSelect(studentId)} className="clickable-row">
              <td>{data.name}</td>
              <td>{data.lastScore?.toFixed(1) || '-'}</td>
              <td className={data.trend !== undefined ?
                `trend-cell ${data.trend > 0 ? 'up' : data.trend < 0 ? 'down' : 'neutral'}` : ''}>
                {data.trend !== undefined ? (
                  <>
                    {renderTrendIcon(data.trend)}
                    {data.trend !== 0 && <span>{Math.abs(data.trend).toFixed(1)}</span>}
                  </>
                ) : '-'}
              </td>
              <td>{data.scores.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassResultsTable;