import React, { memo } from 'react';
import { FaTag } from 'react-icons/fa';
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
import { QuestionBack } from '../../utils/types/Question';

interface QuestionCardProps {
  question: QuestionBack | 'all'; // Permite o tipo 'all' para tratamento especial
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onTagClick?: (tag: string) => void;
  className?: string;
  selected?: boolean;
  onSelect?: (id: string | number) => void; // Atualizado para aceitar string ou number
}


const QuestionCard: React.FC<QuestionCardProps> = memo(({
  question,
  onView,
  onEdit,
  onDelete,
  onTagClick,
  className,
  selected = false,
  onSelect
}) => {
  const handleTagClick = (tag: string) => {
    onTagClick?.(tag);
  };
  
  if (question === 'all') {
    return null; // ou tratamento especial para o caso 'all'
  }

  return (
    <QuestionCardContainer className={className} selected={selected}>
      <QuestionHeader>
        <QuestionTitleWrapper>
          {onSelect && (
            <SelectCheckbox
              type="checkbox"
              checked={selected}
              onChange={() => onSelect(question.id)}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Selecionar questão ${question.title}`}
            />
          )}
          <QuestionTitle title={question.title}>
            {question.title}
          </QuestionTitle>
          <BadgeContainer>
            <QuestionBadge $variant={`difficulty-${question.difficulty}`}>
              {question.difficulty === 'easy' && 'Fácil'}
              {question.difficulty === 'medium' && 'Médio'}
              {question.difficulty === 'hard' && 'Difícil'}
            </QuestionBadge>
            <QuestionBadge $variant={`type-${question.type}`}>
              {question.type === 'multiple_choice' && 'Múltipla escolha'}
              {question.type === 'essay' && 'Dissertativa'}
              {question.type === 'true_false' && 'V/F'}
            </QuestionBadge>
          </BadgeContainer>
        </QuestionTitleWrapper>

        <QuestionActions 
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          question={question}
        />
      </QuestionHeader>

      <QuestionContent title={question.content}>
        {question.content}
      </QuestionContent>

      <QuestionMeta>
        <span>Categoria: {question.category}</span>
        <span>Criada em: {new Date(question.createdAt).toLocaleDateString()}</span>
        {question.lastUsed && (
          <span>Último uso: {new Date(question.lastUsed).toLocaleDateString()}</span>
        )}
        {question.accuracy && (
          <span>Acertos: {question.accuracy}%</span>
        )}
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