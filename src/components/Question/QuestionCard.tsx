import React, { memo, useState } from 'react';
import { FaHeart, FaRegHeart, FaTag } from 'react-icons/fa';
import QuestionActions, {
  BadgeContainer,
  QuestionBadge,
  QuestionCardContainer,
  QuestionHeader,
  QuestionMeta,
  QuestionTag,
  QuestionTags,
  QuestionTitle,
  QuestionTitleWrapper,
  SelectCheckbox
} from './QuestionActions';
import { QuestionContent } from './QuestionPreviewStyles';
import { QUESTION_TYPE_LABELS, Question } from '../../utils/types/Question';
import StarRating from './StarRating';
import { QuestionTypeBadge } from '../shared/Badges';

interface QuestionCardProps {
  question: Question | 'all'; // Permite o tipo 'all' para tratamento especial
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onTagClick?: (tag: string) => void;
  className?: string;
  selected?: boolean;
  onSelect?: (id: string | number) => void;
  onRate?: (id: string | number, rating: number) => void;
  onToggleFavorite?: (id: string | number) => void;
  onFindSimilar?: (question: Question) => void;
  onCreateVariant?: (question: Question) => void;
  showActionsOnClick: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = memo(({
  question,
  onView,
  onEdit,
  onDelete,
  onTagClick,
  className,
  selected = false,
  onSelect,
  onRate,
  onToggleFavorite,
  onCreateVariant,
  showActionsOnClick = false,
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleTagClick = (tag: string) => {
    onTagClick?.(tag);
  };

  if (question === 'all') {
    return null; // ou tratamento especial para o caso 'all'
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(question.id);
  };

  const getUsageBadge = (usageCount?: number) => {
    if (!usageCount || usageCount <= 0) return null;

    let color = '#ccc';
    if (usageCount > 50) color = '#FF5722';
    else if (usageCount > 20) color = '#FF9800';
    else if (usageCount > 5) color = '#FFC107';

    return (
      <span style={{
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        backgroundColor: color,
        color: 'white',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        {usageCount > 99 ? '99+' : usageCount}
      </span>
    );
  };

  return (
    <QuestionCardContainer
      className={className}
      selected={selected}
      $isFavorite={question.isFavorite}
      $usageCount={question.usageCount}
      onClick={() => showActionsOnClick && setShowActions(!showActions)}
    >
      {getUsageBadge(question.usageCount)}
      <QuestionHeader>
        <QuestionTitleWrapper>
          {onSelect && (
            <SelectCheckbox
              type="checkbox"
              checked={selected}
              onChange={() => onSelect(question.id)}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Selecionar questão ${question.statement}`}
            />
          )}
          <QuestionTitle title={question.statement}>
            {question.statement}
          </QuestionTitle>
          <BadgeContainer>
            <QuestionBadge $variant={`difficulty-${question.difficultyLevel}`}>
              {question.difficultyLevel === 'easy' && 'Fácil'}
              {question.difficultyLevel === 'medium' && 'Médio'}
              {question.difficultyLevel === 'hard' && 'Difícil'}
            </QuestionBadge>
            <QuestionTypeBadge
              type={question.questionType}
              className={`type-${question.questionType}`}
            >
                {QUESTION_TYPE_LABELS[question.questionType]}
            </QuestionTypeBadge>
          </BadgeContainer>
          <button
            onClick={handleToggleFavorite}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: question.isFavorite ? '#FF4081' : '#ccc',
              marginLeft: 'auto'
            }}
          >
            {question.isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </QuestionTitleWrapper>

        <QuestionActions
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          question={question}
          onCreateVariant={onCreateVariant && (() => onCreateVariant(question))}
        />
      </QuestionHeader>

      <QuestionContent title={question.explanation}>
        {question.explanation}
      </QuestionContent>

      <QuestionMeta>
        <span>Categoria: {question.discipline}</span>
        <span>Criada em: {new Date(question.createdAt).toLocaleDateString()}</span>
        {question.updatedAt && (
          <span>Último uso: {new Date(question.updatedAt).toLocaleDateString()}</span>
        )}
        {question.correctRate && (
          <span>Acertos: {question.correctRate}%</span>
        )}
        <StarRating
          rating={question.rating || 0}
          onRate={(rating) => onRate?.(question.id, rating)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(question.id);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: question.isFavorite ? '#FF4081' : '#ccc',
            marginLeft: 'auto'
          }}
        >
          {question.isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </QuestionMeta>

      {question.tags && question.tags.length > 0 && (
        <QuestionTags>
          {question.tags.map((tag: string, index: number) => (
            <QuestionTag
              key={index}
              onClick={() => handleTagClick(tag)}
              title={`Filtrar por: ${tag}`}
            >
              <FaTag size={12} /> {tag}
            </QuestionTag>
          ))}
        </QuestionTags>
      )}
    </QuestionCardContainer>
  );
});

export default QuestionCard;