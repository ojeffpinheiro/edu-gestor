import React, { useState } from 'react';
import { ClassData } from '../../../types/academic/ExamAssesments';
import { 
  RecoveryContainer,
  RecoveryHeader,
  BackButton,
  StudentList,
  StudentItem,
  AssessmentSelect,
  RecoveryForm
} from './styles';
import { ActionButton } from '../QuestionCard/styles';

interface RecoveryViewProps {
  classData: ClassData;
  onBack: () => void;
}

const RecoveryView: React.FC<RecoveryViewProps> = ({ classData, onBack }) => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [recoveryScores, setRecoveryScores] = useState<Record<string, number>>({});

  // Filtra alunos que precisam de recuperação (média < 60% da nota máxima)
  const studentsNeedingRecovery = classData.students.filter(student => {
    const totalScore = classData.assessments.reduce((sum, assessment) => {
      return sum + (student.scores[assessment.id] || 0);
    }, 0);
    const average = totalScore / classData.assessments.length;
    return average < 6; // Considerando que 6 é a média para aprovação
  });

  const handleScoreChange = (studentId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setRecoveryScores(prev => ({
      ...prev,
      [studentId]: numValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar as notas de recuperação
    console.log('Notas de recuperação salvas:', recoveryScores);
    alert('Notas de recuperação salvas com sucesso!');
  };

  return (
    <RecoveryContainer>
      <RecoveryHeader>
        <BackButton onClick={onBack}>
          &larr; Voltar para turmas
        </BackButton>
        <h2>Recuperação - {classData.name}</h2>
        <p>Gerencie as avaliações de recuperação para os alunos</p>
      </RecoveryHeader>

      <AssessmentSelect>
        <label htmlFor="assessment">Selecione a avaliação para recuperação:</label>
        <select 
          id="assessment"
          value={selectedAssessment || ''}
          onChange={(e) => setSelectedAssessment(e.target.value)}
        >
          <option value="">Selecione...</option>
          {classData.assessments.map(assessment => (
            <option key={assessment.id} value={assessment.id}>
              {assessment.title} ({new Date(assessment.date).toLocaleDateString()})
            </option>
          ))}
        </select>
      </AssessmentSelect>

      {studentsNeedingRecovery.length > 0 ? (
        <RecoveryForm onSubmit={handleSubmit}>
          <StudentList>
            <div className="header">
              <span>Aluno</span>
              <span>Média Atual</span>
              <span>Nota de Recuperação</span>
            </div>
            
            {studentsNeedingRecovery.map(student => {
              const totalScore = classData.assessments.reduce((sum, assessment) => {
                return sum + (student.scores[assessment.id] || 0);
              }, 0);
              const average = (totalScore / classData.assessments.length).toFixed(1);
              
              return (
                <StudentItem key={student.id}>
                  <span>{student.name}</span>
                  <span>{average}</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={recoveryScores[student.id] || ''}
                    onChange={(e) => handleScoreChange(student.id, e.target.value)}
                    placeholder="Digite a nota"
                  />
                </StudentItem>
              );
            })}
          </StudentList>
          
          <ActionButton type="submit" disabled={!selectedAssessment}>
            Salvar Notas de Recuperação
          </ActionButton>
        </RecoveryForm>
      ) : (
        <div className="no-recovery">
          <p>Nenhum aluno precisa de recuperação nesta turma.</p>
        </div>
      )}
    </RecoveryContainer>
  );
};

export default RecoveryView;