import React from 'react';

import { Assessment, ClassData, Student } from '../../../utils/types/ExamAssesments';

import { ResultsTable, StatusBadge } from './styles';

interface FinalResultsProps {
  classes: ClassData[];
}


const FinalResults: React.FC<FinalResultsProps> = ({ classes }) => {
  const calculateFinalGrade = (student: Student, assessments: Assessment[]) => {
    if (!assessments.length) return 0;
    
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
            const isApproved = finalGrade >= 6;
            
            return (
              <tr key={`${classData.id}-${student.id}`}>
                <td data-label="Turma">{classData.name}</td>
                <td data-label="Aluno">{student.name}</td>
                <td data-label="Média">{finalGrade.toFixed(1)}</td>
                <td data-label="Situação">
                  <StatusBadge $approved={isApproved}>
                    {isApproved ? 'Aprovado' : 'Recuperação'}
                  </StatusBadge>
                </td>
              </tr>
            );
          })
        ))}
      </tbody>
    </ResultsTable>
  );
};

export default FinalResults;