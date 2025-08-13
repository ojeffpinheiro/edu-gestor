import React, { memo, useState, useRef } from 'react';
import {
  FaHeart,
  FaRegHeart,
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaCopy,
  FaSearch,
  FaTrash
} from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

import { Question } from '../../utils/types/Question';

import { Button } from '../shared/Button.styles';

import StarRating from './StarRating';
import { MenuDropdown } from './MenuDropdown';

// Animação para feedback visual
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const CardContainer = styled.div<{ selected?: boolean }>`
  background: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-all);
  position: relative;
  border: 2px solid ${({ selected }) => selected ? 'var(--color-primary)' : 'transparent'};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: var(--space-sm);
  gap: var(--space-sm);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8em; // Garante espaço para 2 linhas
`;

const FavoriteButton = styled.button<{ isFavorite?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ isFavorite }) => isFavorite ? 'var(--color-error)' : 'var(--color-text-secondary)'};
  padding: var(--space-xs);
  font-size: 1.2rem;
  transition: var(--transition-colors);
  
  &:hover {
    color: var(--color-error);
    animation: ${pulse} 0.5s ease;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  align-items: center;
`;

const MetaBadge = styled.span<{ type: 'difficulty' | 'type', level?: string }>`
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  
  ${({ type, level }) => type === 'difficulty' ? `
    background: ${level === 'easy' ? 'var(--color-success-bg)' :
      level === 'medium' ? 'var(--color-warning-bg)' : 'var(--color-error-bg)'};
    color: ${level === 'easy' ? 'var(--color-success)' :
      level === 'medium' ? 'var(--color-warning)' : 'var(--color-error)'};
  ` : `
    background: var(--color-info-bg);
    color: var(--color-info);
  `}
`;

const Checkbox = styled.input`
  margin-right: var(--space-sm);
  accent-color: var(--color-primary);
`;

interface QuestionCardProps {
  question: Question;
  onView?: (question: Question) => void;
  onEdit?: (question: Question) => void;
  onDelete?: (question: Question) => void;
  selected?: boolean;
  onSelect?: (id: string | number) => void;
  onRate?: (id: string | number, rating: number) => void;
  onToggleFavorite?: (id: string | number) => void;
  onFindSimilar?: (question: Question) => void;
  onCreateVariant?: (question: Question) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = memo(({
  question,
  onView,
  onEdit,
  onDelete,
  selected = false,
  onSelect,
  onRate,
  onToggleFavorite,
  onFindSimilar,
  onCreateVariant,
}) => {
  const [isFavorite, setIsFavorite] = useState(question.isFavorite || false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    setIsAnimating(true);
    onToggleFavorite?.(question.id);

    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(question.id);
    }
  };
  const handleCardClick = (e: React.MouseEvent) => {
    // Verifica se o clique veio do checkbox ou do botão do menu
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.closest('button')) {
      return;
    }
    onView?.(question);
  };


  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(true);
  };

  // Limita o texto do statement para 100 caracteres
  const truncatedStatement = question.statement.length > 100
    ? `${question.statement.substring(0, 100)}...`
    : question.statement;

  return (
    <CardContainer
      ref={cardRef}
      selected={selected}
      onClick={handleCardClick}
    >
      <CardHeader>
        {onSelect && (
          <Checkbox
            type="checkbox"
            checked={selected}
            onChange={() => handleSelect}
            onClick={e => e.stopPropagation()} 
          />
        )}
        <CardTitle title={question.statement}>
          {truncatedStatement}
        </CardTitle>

        <FavoriteButton
          isFavorite={isFavorite}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className={isAnimating ? 'pulse' : ''}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </FavoriteButton>

        <Button
          $variant="text"
          ref={menuTriggerRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label="Ações"
        >
          <FaEllipsisV />
        </Button>

        <MenuDropdown
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          triggerRef={menuTriggerRef}
          parentRef={cardRef}
          items={[
            {
              icon: <FaEye />,
              label: 'Visualizar',
              onClick: () => onView?.(question),
            },
            {
              icon: <FaEdit />,
              label: 'Editar',
              onClick: () => onEdit?.(question),
            },
            ...(onCreateVariant ? [{
              icon: <FaCopy />,
              label: 'Criar variação',
              onClick: () => onCreateVariant?.(question),
            }] : []),
            ...(onFindSimilar ? [{
              icon: <FaSearch />,
              label: 'Encontrar similares',
              onClick: () => onFindSimilar?.(question),
            }] : []),
            ...(onDelete ? [{
              icon: <FaTrash />,
              label: 'Excluir',
              onClick: () => onDelete?.(question),
              color: 'var(--color-error)',
            }] : []),
          ]}
        />
      </CardHeader>

      <CardMeta>
        <MetaBadge type="difficulty" level={question.difficultyLevel}>
          {question.difficultyLevel === 'easy' ? 'Fácil' :
            question.difficultyLevel === 'medium' ? 'Médio' : 'Difícil'}
        </MetaBadge>

        <MetaBadge type="type">
          {question.questionType}
        </MetaBadge>

        <StarRating
          rating={question.rating || 0}
          onRate={(rating) => onRate?.(question.id, rating)}
          interactive={!!onRate}
        />
      </CardMeta>
    </CardContainer>
  );
});

export default QuestionCard;