import React from 'react'
import { FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import styled from 'styled-components';
import Dropdown from './Dropdown/Dropdown';
import { QuestionBack } from '../../utils/types/Question';
import { FaCopy, FaPencilAlt, FaRegEye, FaSearch } from 'react-icons/fa';

interface QuestionActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCreateVariant?: (question: QuestionBack) => void;
  onFindSimilar?: (question: QuestionBack) => void;
  className?: string;
  question: QuestionBack;
}

export interface QuestionCardProps {
  question: QuestionBack;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onTagClick?: (tag: string) => void;
  className?: string;
  selected?: boolean;
  onSelect?: (id: string | number) => void;
}

export const QuestionCardContainer = styled.div<{
  selected?: boolean;
  $isFavorite?: boolean;
  $usageCount?: number;
}>`
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;
  border: 2px solid ${({ selected }) =>
    selected ? 'var(--color-primary)' : 'transparent'};
  border-left: 4px solid ${({ $isFavorite }) => $isFavorite ? '#FF4081' : 'transparent'};
  box-shadow: ${({ $usageCount }) =>
    $usageCount && $usageCount > 10 ? '0 4px 8px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)'};
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: ${({ $usageCount }) =>
    $usageCount && $usageCount > 10 ? 'translateY(-2px)' : 'none'};
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const QuestionTitleWrapper = styled.div`
  flex: 1;
`;

export const QuestionTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const QuestionBadge = styled.span<{ $variant: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;

  ${({ $variant }) => ({
    'difficulty-easy': `
      background-color: #e6f7e6;
      color: #52c41a;
    `,
    'difficulty-medium': `
      background-color: #fff7e6;
      color: #fa8c16;
    `,
    'difficulty-hard': `
      background-color: #fff1f0;
      color: #f5222d;
    `,
    'type-multiple-choice': `
      background-color: #e6f7ff;
      color: #1890ff;
    `,
    'type-essay': `
      background-color: #f9f0ff;
      color: #722ed1;
    `,
    'type-true-false': `
      background-color: #f6ffed;
      color: #52c41a;
    `,
  })[$variant]}
`;

export const QuestionContent = styled.p`
  margin: 0 0 1rem;
  color: var(--color-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const QuestionMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
`;

export const QuestionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const QuestionTag = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.75rem;
  background: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-background-tertiary);
  }
`;

export const SelectCheckbox = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const QuestionActions = ({
  onView,
  onEdit,
  onDelete,
  onCreateVariant,
  onFindSimilar,
  className,
  question
}: QuestionActionsProps) => {
  const handleCreateVariantWrapper = () => {
    if (onCreateVariant) {
      // Aqui você precisará ter acesso à questão atual
      // Isso pode ser resolvido de diferentes formas (contexto, prop adicional, etc.)
      // Exemplo simplificado:
      onCreateVariant(question); // Você precisará ter acesso à 'question'
    }
  };

  const handleFindSimilarWrapper = () => {
    if (onFindSimilar) {
      onFindSimilar(question); // Você precisará ter acesso à 'question'
    }
  };

  return (
    <Dropdown
      trigger={<FiMoreHorizontal className={className} />}
      items={[
        {
          id: 'view',
          content: (<><FaRegEye /> Visualizar</>),
          onClick: onView
        },
        {
          id: 'edit',
          content: (<><FaPencilAlt /> Editar</>),
          onClick: onEdit
        },
        {
          id: 'create-variant',
          content: (<><FaCopy /> Criar Variação</>),
          onClick: handleCreateVariantWrapper
        },
        {
          id: 'find-similar',
          content: (<><FaSearch /> Encontrar Similares</>),
          onClick: handleFindSimilarWrapper
        },
        {
          id: 'delete',
          content: (<><FiTrash2 /> Excluir</>),
          onClick: onDelete,
          disabled: !onDelete
        },
        {
          id: 'find-similar',
          content: (<><FaSearch /> Encontrar Similares</>),
          onClick: () => onFindSimilar?.(question)
        }
      ]}
      position="right"
    />
  );
};

export default QuestionActions;