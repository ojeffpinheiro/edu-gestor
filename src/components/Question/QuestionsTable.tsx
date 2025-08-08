import React from 'react';
import styled from 'styled-components';
import { Question } from './QuestionActions';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const TableHeader = styled.thead`
  background-color: var(--color-background-secondary);
`;

const TableRow = styled.tr<{ selected?: boolean }>`
  border-bottom: 1px solid var(--color-border);
  background-color: ${({ selected }) => 
    selected ? 'var(--color-primary-light)' : 'transparent'};
  
  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: left;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`;

const SelectCell = styled(TableCell)`
  width: 40px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  margin-right: 0.5rem;
  
  &:hover {
    color: var(--color-primary);
  }
`;

interface QuestionsTableProps {
  questions: Question[];
  onView: (question: Question) => void;
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
  selectedQuestions: Set<string | number>;
  onSelect: (id: string | number) => void;
}

export const QuestionsTable: React.FC<QuestionsTableProps> = ({
  questions,
  onView,
  onEdit,
  onDelete,
  selectedQuestions,
  onSelect
}) => {
  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell></TableHeaderCell>
          <TableHeaderCell>Título</TableHeaderCell>
          <TableHeaderCell>Categoria</TableHeaderCell>
          <TableHeaderCell>Dificuldade</TableHeaderCell>
          <TableHeaderCell>Tipo</TableHeaderCell>
          <TableHeaderCell>Ações</TableHeaderCell>
        </tr>
      </TableHeader>
      <tbody>
        {questions.map(question => (
          <TableRow key={question.id} selected={selectedQuestions.has(question.id)}>
            <SelectCell>
              <input
                type="checkbox"
                checked={selectedQuestions.has(question.id)}
                onChange={() => onSelect(question.id)}
              />
            </SelectCell>
            <TableCell>{question.title}</TableCell>
            <TableCell>{question.category}</TableCell>
            <TableCell>
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                ...(question.difficulty === 'easy' && {
                  backgroundColor: '#e6f7e6',
                  color: '#52c41a'
                }),
                ...(question.difficulty === 'medium' && {
                  backgroundColor: '#fff7e6',
                  color: '#fa8c16'
                }),
                ...(question.difficulty === 'hard' && {
                  backgroundColor: '#fff1f0',
                  color: '#f5222d'
                })
              }}>
                {question.difficulty === 'easy' && 'Fácil'}
                {question.difficulty === 'medium' && 'Médio'}
                {question.difficulty === 'hard' && 'Difícil'}
              </span>
            </TableCell>
            <TableCell>
              {question.type === 'multiple-choice' && 'Múltipla escolha'}
              {question.type === 'essay' && 'Dissertativa'}
              {question.type === 'true-false' && 'V/F'}
            </TableCell>
            <TableCell>
              <ActionButton onClick={() => onView(question)} title="Visualizar">
                👁️
              </ActionButton>
              <ActionButton onClick={() => onEdit(question)} title="Editar">
                ✏️
              </ActionButton>
              <ActionButton onClick={() => onDelete(question)} title="Excluir">
                🗑️
              </ActionButton>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};