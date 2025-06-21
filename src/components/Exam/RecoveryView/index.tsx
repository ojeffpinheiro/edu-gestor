// src/components/Exam/FinalResults/index.tsx
import React from 'react';
import { ResultsTable } from './styles';
import { Assessment, ClassData, Student } from '../../../utils/types/ExamAssesments';

interface FinalResultsProps {
  classes: ClassData[];
}

const FinalResults: React.FC<FinalResultsProps> = ({ classes }) => {
  const calculateFinalGrade = (student: Student, assessments: Assessment[]) => {
    const total = assessments.reduce((sum, assessment) => {
      return sum + (student.scores[assessment.id] || 0);
    }, 0);
    return total / assessments.length;
  };

  return (
    <ResultsTable>
      <thead>
        <tr>
          <th>Turma</th>
          <th>Aluno</th>
          <th>Média Final</th>
          <th>Situação</th>
        </tr>
      </thead>
      <tbody>
        {classes.map(classData => (
          classData.students.map(student => {
            const finalGrade = calculateFinalGrade(student, classData.assessments);
            return (
              <tr key={`${classData.id}-${student.id}`}>
                <td>{classData.name}</td>
                <td>{student.name}</td>
                <td>{finalGrade.toFixed(1)}</td>
                <td>{finalGrade >= 6 ? 'Aprovado' : 'Recuperação'}</td>
              </tr>
            );
          })
        ))}
      </tbody>
    </ResultsTable>
  );
};

export default FinalResults;