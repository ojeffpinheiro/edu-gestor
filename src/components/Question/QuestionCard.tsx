import React from 'react'
import { FaTag } from 'react-icons/fa';
import { BadgeContainer, QuestionActions, QuestionBadge, QuestionCardContainer, QuestionCardProps, QuestionHeader, QuestionMeta, QuestionTag, QuestionTags, QuestionTitle, QuestionTitleWrapper, SelectCheckbox } from './QuestionActions';
import { QuestionContent } from './QuestionPreviewStyles';

export const QuestionCard = ({ 
  question, 
  onView, 
  onEdit, 
  onDelete,
  onTagClick,
  className,
  selected = false,
  onSelect
}: QuestionCardProps) => {
  const handleTagClick = (tag: string) => {
    onTagClick?.(tag);
  };

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
              {question.type === 'multiple-choice' && 'Múltipla escolha'}
              {question.type === 'essay' && 'Dissertativa'}
              {question.type === 'true-false' && 'V/F'}
            </QuestionBadge>
          </BadgeContainer>
        </QuestionTitleWrapper>

        <QuestionActions 
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </QuestionHeader>

      <QuestionContent title={question.content}>
        {question.content}
      </QuestionContent>

      <QuestionMeta>
        <span>Categoria: {question.category}</span>
        <span>Criada em: {new Date(question.createdAt).toLocaleDateString()}</span>
        {question.lastUsed && (
          <span>Última uso: {new Date(question.lastUsed).toLocaleDateString()}</span>
        )}
        {question.accuracy && (
          <span>Acertos: {question.accuracy}%</span>
        )}
      </QuestionMeta>

      {question.tags?.length > 0 && (
        <QuestionTags>
          {question.tags.map((tag, index) => (
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
};