import React from 'react';
import { ClassPerformance } from '../../utils/types/Assessment';

interface ClassResultsTableProps {
  classPerformance: ClassPerformance;
  onStudentSelect: (studentId: string) => void;
}

const ClassResultsTable: React.FC<ClassResultsTableProps> = ({ 
  classPerformance, 
  onStudentSelect 
}) => {
  // Agrupar resultados por aluno (exemplo simplificado)
  const studentResults = classPerformance.examResults.reduce<Record<string, {
    name: string;
    scores: number[];
    average: number;
  }>>((acc, exam) => {
    (exam as any).results?.forEach((result: { studentId: string; totalScore: number; student?: { name: string } }) => {
      if (!acc[result.studentId]) {
        acc[result.studentId] = {
          name: result.student?.name || `Aluno ${result.studentId}`,
          scores: [],
          average: 0
        };
      }
      acc[result.studentId].scores.push(result.totalScore);
      acc[result.studentId].average = acc[result.studentId].scores.reduce((sum, score) => sum + score, 0) / acc[result.studentId].scores.length;
    });
    return acc;
  }, {});

  return (
    <div className="class-results-table">
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Média</th>
            <th>Última Avaliação</th>
            <th>Tendência</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(studentResults).map(([studentId, data]) => (
            <tr key={studentId} onClick={() => onStudentSelect(studentId)}>
              <td>{data.name}</td>
              <td>{data.average.toFixed(1)}</td>
              <td>{data.scores[data.scores.length - 1]}</td>
              <td>
                {data.scores.length > 1 && (
                  data.scores[data.scores.length - 1] > data.scores[data.scores.length - 2] 
                    ? '↑ Melhorando' 
                    : data.scores[data.scores.length - 1] < data.scores[data.scores.length - 2] 
                      ? '↓ Piorando' 
                      : '↔ Estável'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassResultsTable;