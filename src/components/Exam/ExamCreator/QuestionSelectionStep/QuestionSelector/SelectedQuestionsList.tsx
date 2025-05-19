import React from 'react'
import { FaTimes } from 'react-icons/fa';

import { Question } from "../../../../../utils/types/Question";
import { ActionButton, ItemContent, ItemMeta, ItemTitle, SelectedContainer, SelectedGrid, SelectedHeader, SelectedItem, SelectedTitle } from './styles';
import { DIFFICULTY_LABELS } from './types';

const SelectedQuestionsList: React.FC<{
  questions: Question[];
  onRemove: (question: Question) => void;
  onClose: () => void;
}> = ({ questions, onRemove, onClose }) => (
  <SelectedContainer>
    <SelectedHeader>
      <SelectedTitle>Questões Selecionadas ({questions.length})</SelectedTitle>
      <ActionButton
        onClick={onClose}
        className="view"
        aria-label="Fechar lista de questões selecionadas"
      >
        <FaTimes size={16} />
      </ActionButton>
    </SelectedHeader>
    <SelectedGrid>
      {questions.map(question => (
        <SelectedItem key={`selected-${question.id}`}>
          <ItemContent>
            <ItemTitle>
              {question.statement.length > 100
                ? `${question.statement.substring(0, 100)}...`
                : question.statement}
            </ItemTitle>
            <ItemMeta>
              {question.discipline} • {DIFFICULTY_LABELS[question.difficultyLevel]}
            </ItemMeta>
          </ItemContent>
          <ActionButton
            onClick={() => onRemove(question)}
            className="delete"
            aria-label={`Remover questão ${question.id}`}
          >
            <FaTimes size={16} />
          </ActionButton>
        </SelectedItem>
      ))}
    </SelectedGrid>
  </SelectedContainer>
);

export default SelectedQuestionsList;