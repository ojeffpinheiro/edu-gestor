import React from 'react'
import { FiEye, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { Question } from '../../../utils/types/Question';
import { DifficultyBadge, QuestionTypeBadge, StatusBadge } from '../../shared/Badges';

import {
  ActionButton,
  ActionsContainer,
  AlternativeItem,
  AlternativeLetter,
  AlternativeText,
  AlternativesList,
  CardContainer,
  CardHeader,
  ExplanationText,
  ImageContainer,
  MetaContainer,
  QuestionNumber,
  SelectionToggle,
  StatementText
} from './styles'

interface QuestionCardProps {
  question: Question;
  index?: number;
  isSelected?: boolean;
  showActions?: boolean;
  showCorrectAnswers?: boolean;
  onSelect?: () => void;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function QuestionCard({
  question,
  index,
  isSelected = false,
  showActions = true,
  showCorrectAnswers = false,
  onSelect,
  onView,
  onEdit,
  onDelete
}: QuestionCardProps) {
  return (
    <CardContainer isSelected={isSelected}>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {onSelect && (
            <SelectionToggle
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
            />
          )}
          {index !== undefined && (
            <QuestionNumber>Questão {index + 1}</QuestionNumber>
          )}
        </div>
        
        <MetaContainer>
          <QuestionTypeBadge type={question.questionType} />
          <DifficultyBadge level={question.difficultyLevel} />
          <StatusBadge status={question.status} />
        </MetaContainer>
      </CardHeader>

      <StatementText>{question.statement}</StatementText>

      {question.imageUrl && (
        <ImageContainer>
          <img 
            src={question.imageUrl} 
            alt="Imagem da questão" 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </ImageContainer>
      )}

      {(question.questionType === 'multiple_choice' || question.questionType === 'true_false') && (
        <AlternativesList>
          {question.alternatives.map((alt, i) => (
            <AlternativeItem 
              key={alt.id}
              isCorrect={alt.isCorrect}
              showCorrect={showCorrectAnswers}
            >
              <AlternativeLetter>
                {String.fromCharCode(65 + i)}
              </AlternativeLetter>
              <AlternativeText 
                isCorrect={alt.isCorrect}
                showCorrect={showCorrectAnswers}
              >
                {alt.text}
              </AlternativeText>
              {showCorrectAnswers && (
                <span style={{ marginLeft: 'auto' }}>
                  {alt.isCorrect ? (
                    <FiCheck color="var(--color-success)" />
                  ) : (
                    <FiX color="var(--color-error)" />
                  )}
                </span>
              )}
            </AlternativeItem>
          ))}
        </AlternativesList>
      )}

      {showCorrectAnswers && question.explanation && (
        <ExplanationText>
          <strong>Explicação:</strong> {question.explanation}
        </ExplanationText>
      )}

      {showActions && (
        <ActionsContainer>
          {onView && (
            <ActionButton onClick={onView} title="Visualizar">
              <FiEye size={18} />
            </ActionButton>
          )}
          {onEdit && (
            <ActionButton onClick={onEdit} title="Editar">
              <FiEdit2 size={18} />
            </ActionButton>
          )}
          {onDelete && (
            <ActionButton className="delete" onClick={onDelete} title="Excluir">
              <FiTrash2 size={18} />
            </ActionButton>
          )}
        </ActionsContainer>
      )}
    </CardContainer>
  );
}