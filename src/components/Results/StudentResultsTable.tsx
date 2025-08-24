import React from 'react'

import { ClassPerformance,  ExamSummary} from '../../types/academic/Assessment';

import DashboardCard from './DashboardCard'

interface StudentResultsTableProps {
  students: ClassPerformance['students'];
  examResults: ExamSummary[];
  onSelectStudent: (studentId: string | null) => void;
}

const StudentResultsTable: React.FC<StudentResultsTableProps> = ({ 
  students, 
  examResults,
  onSelectStudent 
}) => {
  const studentData = students.map(student => {
    const studentResults = examResults.flatMap(exam => 
      exam.results?.filter(result => result.studentId === student.id) || []
    );
    
    return {
      ...student,
      averageScore: studentResults.length > 0 
        ? studentResults.reduce((sum, result) => sum + result.totalScore, 0) / studentResults.length
        : 0,
      lastExam: studentResults.length > 0
        ? studentResults[studentResults.length - 1].totalScore
        : null,
      status: studentResults.every(r => r.totalScore >= 70) ? 'Aprovado' 
        : studentResults.some(r => r.totalScore >= 70) ? 'Recuperação' 
        : 'Reprovado'
    };
  });

  return (
    <DashboardCard title="Resultados dos Alunos" fullWidth>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Média</th>
              <th>Última Avaliação</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.averageScore.toFixed(1)}</td>
                <td>{student.lastExam?.toFixed(1) || '-'}</td>
                <td className={`status-${student.status.toLowerCase()}`}>
                  {student.status}
                </td>
                <td>
                  <button onClick={() => onSelectStudent(student.id)}>
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default StudentResultsTable;