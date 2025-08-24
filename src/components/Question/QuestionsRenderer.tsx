import React from 'react';
import styled from 'styled-components';
import { Question } from '../../types/evaluation/Question';
import QuestionCard from './QuestionCard';
import QuestionsTable from './QuestionsTable';

const QuestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--color-text-secondary);
`;

interface QuestionsRendererProps {
  viewMode: 'cards' | 'table';
  questions: Question[];
  selectedQuestions: Set<string>;
  onView: (question: Question) => void;
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
  onSelectAll?: (select: boolean) => void;
  isAllSelected?: boolean;
  onFindSimilar?: (question: Question) => void;
  onCreateVariant?: (question: Question) => void;
  cardProps?: Record<string, any>;
  tableProps?: Record<string, any>;
  onSelect: (id: string | number) => void;
  onRate?: (id: string | number, rating: number) => void;
  onToggleFavorite?: (id: string | number) => void;
}

const QuestionsRenderer: React.FC<QuestionsRendererProps> = ({
  viewMode,
  questions,
  selectedQuestions,
  onView,
  onEdit,
  onDelete,
  onSelect,
  onSelectAll = () => { },
  isAllSelected = false,
  onRate,
  onToggleFavorite,
  onFindSimilar,
  onCreateVariant,
  cardProps = {},
  tableProps = {},
}) => {
 if (viewMode === 'cards') {
    return (
      <QuestionsGrid>
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            onView={() => onView(question)}
            onEdit={() => onEdit(question)}
            onDelete={() => onDelete(question)}
            selected={selectedQuestions.has(question.id)}
            onSelect={(id) => { onSelect(id)}}
            onRate={onRate ? (id: string | number, rating: number) => {
              onRate(id, rating);
            } : undefined}
            onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(question.id) : undefined}
            onFindSimilar={onFindSimilar ? () => onFindSimilar(question) : undefined}
            onCreateVariant={onCreateVariant ? () => onCreateVariant(question) : undefined}
            {...cardProps}
          />
        ))}
      </QuestionsGrid>
    );
  }
  
  if (questions.length === 0) {
    return <EmptyState>Nenhuma questão encontrada</EmptyState>;
  }

  return (
    <QuestionsTable
      questions={questions}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      selectedQuestions={selectedQuestions}
      onSelect={onSelect}
      onSelectAll={() => onSelectAll(!isAllSelected)}
      isSelectAll={isAllSelected}
      {...tableProps}
    />
  );
};

export default QuestionsRenderer;