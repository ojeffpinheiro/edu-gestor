import React from "react";
import { FaEdit, FaCopy, FaClipboardList, FaTrash, FaEye } from "react-icons/fa";

import { Assessment } from "../../../../types/evaluation/AssessmentEvaluation";

import { Card, CardHeader, CardBody, ActionButton } from "./styles";

const mockAssessments: Assessment[] = [{
  id: 'assessment-001',
  title: 'Avaliação de Matemática - 1º Bimestre',
  subject: 'Matemática',
  instrument: 'Prova Objetiva',
  grade: 9,
  status: 'published',
  questions: [
    {
      id: 'q1',
      contentId: 'math-9th-algebra-001',
      statement: 'Qual é o valor de x na equação 2x + 3 = 11?',
      questionType: 'multiple_choice',
      difficultyLevel: 'easy',
      discipline: 'Matemática',
      alternatives: [
        { id: 'a1', text: '2', isCorrect: false },
        { id: 'a2', text: '4', isCorrect: true },
        { id: 'a3', text: '6', isCorrect: false },
        { id: 'a4', text: '8', isCorrect: false },
      ],
      correctAnswer: 'a2',
      explanation: 'Subtraindo 3 dos dois lados: 2x = 8. Dividindo por 2: x = 4.',
      createdAt: '2025-06-01T10:00:00Z',
      updatedAt: '2025-06-10T12:00:00Z',
      status: 'active',
      imageUrl: undefined,
      tags: ['álgebra', 'equações'],
      source: 'Livro Didático - Capítulo 3',
      accessDate: '2025-06-05',
      optionsLayout: 'one-column',
      timesUsed: 5,
      correctRate: 0.8,
      pinned: false,
      isComposite: false,
      componentQuestions: [],
      correctAnswers: [''],
      answers: [],
      answerStats: {
        totalAttempts: 100,
        correctAttempts: 80,
      },
    },
    {
      id: 'q2',
      contentId: 'math-9th-geometry-005',
      statement: 'Verdadeiro ou falso: Um triângulo com lados 3 cm, 4 cm e 5 cm é um triângulo retângulo.',
      questionType: 'true_false',
      difficultyLevel: 'medium',
      discipline: 'Matemática',
      alternatives: [
        { id: 'a1', text: 'Verdadeiro', isCorrect: true },
        { id: 'a2', text: 'Falso', isCorrect: false },
      ],
      correctAnswer: 'a1',
      explanation: 'O teorema de Pitágoras se aplica: 3² + 4² = 9 + 16 = 25 = 5².',
      createdAt: '2025-05-15T09:00:00Z',
      updatedAt: '2025-06-01T08:00:00Z',
      status: 'active',
      tags: ['geometria', 'triângulos'],
      source: 'Material de apoio - Geometria básica',
      accessDate: '2025-06-01',
      optionsLayout: 'one-column',
      timesUsed: 3,
      correctRate: 0.7,
      pinned: false,
      isComposite: false,
      componentQuestions: [],
      answers: [],
      correctAnswers: [''],
      answerStats: {
        totalAttempts: 50,
        correctAttempts: 35,
      },
    },
  ],
}];

const AssessmentList: React.FC = () => {
  const [assessments] = React.useState<Assessment[]>(mockAssessments);

  // Funções de manipulação
  const handleView = (assessment: Assessment) => {
    console.log('Visualizar:', assessment);
  };

  const handleEdit = (assessment: Assessment) => {
    console.log('Editar:', assessment);
  };

  const handleRegisterScores = (assessment: Assessment) => {
    console.log('Registrar notas:', assessment);
  };

  const handleDuplicate = (assessment: Assessment) => {
    console.log('Duplicar:', assessment);
  };

  const handleDelete = (id: string) => {
    console.log('Excluir:', id);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {assessments.map(assessment => (
        <Card key={assessment.id}>
          <CardHeader>
            <h3>{assessment.title}</h3>
            <div>
              <ActionButton onClick={() => handleView(assessment)} title="Visualizar">
                <FaEye />
              </ActionButton>
              <ActionButton onClick={() => handleEdit(assessment)} title="Editar">
                <FaEdit />
              </ActionButton>
              <ActionButton 
                onClick={() => handleRegisterScores(assessment)} 
                title="Registrar Notas"
              >
                <FaClipboardList />
              </ActionButton>
            </div>
          </CardHeader>
          <CardBody>
            <p><strong>Matéria:</strong> {assessment.subject}</p>
            <p><strong>Série:</strong> {assessment.grade}º ano</p>
            <p><strong>Tipo:</strong> {assessment.instrument}</p>
            <p><strong>Status:</strong> {assessment.status}</p>
            
            <div className="actions">
              <ActionButton 
                title="Duplicar" 
                onClick={() => handleDuplicate(assessment)}
              >
                <FaCopy /> Duplicar
              </ActionButton>
              <ActionButton 
                onClick={() => handleDelete(assessment.id)} 
                title="Excluir"
              >
                <FaTrash /> Excluir
              </ActionButton>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default AssessmentList;