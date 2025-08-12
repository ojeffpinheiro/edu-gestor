import { DifficultyLevelType, QuestionStatus, QuestionType } from "../../utils/types/Question";
import styled from 'styled-components';
import { badgeVariants, sizeVariants } from '../../styles/variants';

const BaseBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-xl);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-xs);
  
  /* Adicione estas variáveis ao seu tema global se necessário */
  --color-blue-100: #dbeafe;
  --color-blue-800: #1e40af;
  --color-purple-100: #e9d5ff;
  --color-purple-800: #5b21b6;
  --color-green-100: #d1fae5;
  --color-green-800: #065f46;
  --color-yellow-100: #fef3c7;
  --color-yellow-800: #92400e;
  --color-red-100: #fee2e2;
  --color-red-800: #991b1b;
  --color-gray-100: #f3f4f6;
  --color-gray-800: #1f2937;
`;

export const QuestionTypeBadge = styled(BaseBadge)<{ type: QuestionType }>`
  background-color: ${({ type }) => {
    switch (type) {
      case 'multiple_choice': return 'var(--color-blue-100)';
      case 'true_false': return 'var(--color-purple-100)';
      case 'essay': return 'var(--color-green-100)';
      default: return 'var(--color-gray-100)';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'multiple_choice': return 'var(--color-blue-800)';
      case 'true_false': return 'var(--color-purple-800)';
      case 'essay': return 'var(--color-green-800)';
      default: return 'var(--color-gray-800)';
    }
  }};
`;

export const DifficultyBadge = styled(BaseBadge)<{ level: DifficultyLevelType }>`
  background-color: ${({ level }) => {
    switch (level) {
      case 'easy': return 'var(--color-green-100)';
      case 'medium': return 'var(--color-yellow-100)';
      case 'hard': return 'var(--color-red-100)';
      default: return 'var(--color-gray-100)';
    }
  }};
  color: ${({ level }) => {
    switch (level) {
      case 'easy': return 'var(--color-green-800)';
      case 'medium': return 'var(--color-yellow-800)';
      case 'hard': return 'var(--color-red-800)';
      default: return 'var(--color-gray-800)';
    }
  }};
`;

export const StatusBadge = styled(BaseBadge)<{ status: QuestionStatus }>`
  background-color: ${({ status }) => {
    switch (status) {
      case 'active': return 'var(--color-green-100)';
      case 'inactive': return 'var(--color-gray-100)';
      case 'draft': return 'var(--color-yellow-100)';
      default: return 'var(--color-gray-100)';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'active': return 'var(--color-green-800)';
      case 'inactive': return 'var(--color-gray-800)';
      case 'draft': return 'var(--color-yellow-800)';
      default: return 'var(--color-gray-800)';
    }
  }};
`;

// Utilitário para texto amigável
export function getStatusLabel(status: QuestionStatus): string {
  const labels: Record<QuestionStatus, string> = {
    active: 'active',
    inactive: 'Inativa',
    draft: 'Rascunho'
  };
  return labels[status];
}

export interface BadgeProps {
  $variant?: keyof typeof badgeVariants;
  $size?: keyof typeof sizeVariants;
  $rounded?: boolean;
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  font-weight: var(--font-weight-medium);
  border-radius: ${({ $rounded }) => 
    $rounded ? 'var(--border-radius-full)' : 'var(--border-radius-md)'};
  
  ${({ $variant = 'default' }) => badgeVariants[$variant]}
  ${({ $size = 'sm' }) => sizeVariants[$size]}
`;