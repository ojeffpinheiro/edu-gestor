import React from 'react';
import { Assessment, ClassData, Student } from '../../../utils/types/ExamAssesments';
import { ResultsTable, StatusBadge, ResultsHeader } from './styles';

interface FinalResultsProps {
  classes: ClassData[];
  periodType: 'bimester' | 'trimester' | 'semester';
}

const FinalResults: React.FC<FinalResultsProps> = ({ classes, periodType }) => {
  const calculateFinalGrade = (student: Student, assessments: Assessment[]) => {
    if (!assessments.length) return 0;
    
    const total = assessments.reduce((sum, assessment) => {
      return sum + (student.scores[assessment.id] || 0);
    }, 0);
    return total / assessments.length;
  };

  return (
    <div>
      <ResultsHeader>
        <h2>Resultados Finais</h2>
        <p>Período: {periodType === 'trimester' ? 'Trimestral' : 
                     periodType === 'bimester' ? 'Bimestral' : 'Semestral'}</p>
      </ResultsHeader>
      
      <ResultsTable>
        <thead>
          <tr>
            <th>Turma</th>
            <th>Período</th>
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
                  <td data-label="Período">{classData.period}</td>
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
    </div>
  );
};

export default FinalResults;