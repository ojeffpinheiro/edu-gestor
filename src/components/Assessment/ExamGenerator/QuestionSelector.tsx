import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Question } from '../../../types/academic/Assessment';
import { 
  AddQuestionButton, 
  QuestionItem, 
  QuestionList, 
  QuestionsContainer, 
  RemoveQuestionButton,
  SelectionStatus
} from './QuestionSelectorStyle';

interface QuestionSelectorProps {
  availableQuestions: Question[];
  selectedQuestions: Question[];
  onSelectQuestion: (question: Question) => void;
  onRemoveQuestion: (questionId: string) => void;
  numQuestionsNeeded: number;
}

/**
 * Componente para seleção de questões para uma prova
 * Mostra questões disponíveis e selecionadas em colunas lado a lado
 */
const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  availableQuestions,
  selectedQuestions,
  onSelectQuestion,
  onRemoveQuestion,
  numQuestionsNeeded
}) => {
  // Filtra questões já selecionadas
  const filteredQuestions = availableQuestions.filter(
    question => !selectedQuestions.some(sq => sq.id === question.id)
  );

  // Verifica se atingiu o limite de questões
  const isSelectionComplete = selectedQuestions.length >= numQuestionsNeeded;

  return (
    <QuestionsContainer>
      {/* Coluna de questões disponíveis */}
      <div className="available-questions">
        <h3>Questões Disponíveis ({filteredQuestions.length})</h3>
        <QuestionList>
          {filteredQuestions.map(question => (
            <QuestionItem key={question.id}>
              <p>{question.content.substring(0, 100)}...</p>
              <div className="question-meta">
                <span>Dificuldade: {question.difficulty}</span>
                <span>Categorias: {question.categories.join(', ')}</span>
              </div>
              <AddQuestionButton 
                onClick={() => onSelectQuestion(question)}
                disabled={isSelectionComplete}
                title={isSelectionComplete ? 'Limite de questões atingido' : 'Adicionar questão'}
              >
                <FaPlus /> Adicionar
              </AddQuestionButton>
            </QuestionItem>
          ))}
        </QuestionList>
      </div>

      {/* Coluna de questões selecionadas */}
      <div className="selected-questions">
        <h3>
          Questões Selecionadas 
          <SelectionStatus isComplete={isSelectionComplete}>
            ({selectedQuestions.length}/{numQuestionsNeeded})
          </SelectionStatus>
        </h3>
        <QuestionList>
          {selectedQuestions.map(question => (
            <QuestionItem key={question.id}>
              <p>{question.content.substring(0, 100)}...</p>
              <div className="question-meta">
                <span>Dificuldade: {question.difficulty}</span>
                <span>Categorias: {question.categories.join(', ')}</span>
              </div>
              <RemoveQuestionButton onClick={() => onRemoveQuestion(question.id)}>
                <FaTrash /> Remover
              </RemoveQuestionButton>
            </QuestionItem>
          ))}
        </QuestionList>
      </div>
    </QuestionsContainer>
  );
};

export default QuestionSelector;