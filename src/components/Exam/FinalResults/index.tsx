import React from 'react';
import { Assessment, ClassData, Student } from '../../../utils/types/ExamAssesments';
import { ResultsTable, StatusBadge, ResultsHeader } from './styles';

interface FinalResultsProps {
  classes: ClassData[];
  periodType: 'bimester' | 'trimester' | 'semester';
}

const FinalResults: React.FC<FinalResultsProps> = ({ classes, periodType }) => {
  const calculateFinalGrade = (student: Student, assessments: Assessment[]) => {
    if (!assessments.length) return { finalGrade: 0, recoveryGrade: null };
    
    const total = assessments.reduce((sum, assessment) => {
      return sum + (student.scores[assessment.id] || 0);
    }, 0);
    
    const average = total / assessments.length;
    const recoveryGrade = student.recoveryScore || null;
    
    return {
      finalGrade: recoveryGrade ? Math.max(average, recoveryGrade) : average,
      originalGrade: average,
      recoveryGrade
    };
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
            <th>Média Original</th>
            <th>Recuperação</th>
            <th>Média Final</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(classData => (
            classData.students.map(student => {
              const { finalGrade, originalGrade, recoveryGrade } = 
                calculateFinalGrade(student, classData.assessments);
              const isApproved = finalGrade >= 6;
              
              return (
                <tr key={`${classData.id}-${student.id}`}>
                  <td>{classData.name}</td>
                  <td>{classData.period}</td>
                  <td>{student.name}</td>
                  <td>{originalGrade !== undefined ? originalGrade.toFixed(1) : '-'}</td>
                  <td>{recoveryGrade ? recoveryGrade.toFixed(1) : '-'}</td>
                  <td>{finalGrade.toFixed(1)}</td>
                  <td>
                    <StatusBadge $approved={isApproved}>
                      {isApproved ? 'Aprovado' : recoveryGrade ? 'Aprovado (Rec)' : 'Recuperação'}
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