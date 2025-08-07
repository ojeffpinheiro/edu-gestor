import React from 'react'
import { FiGrid, FiList } from 'react-icons/fi';
import { ViewModeContainer, ViewModeButton } from './styles';
import { QuestionViewModeToggleProps } from './types';

export const QuestionViewModeToggle = ({
  mode,
  onChange,
  className
}: QuestionViewModeToggleProps) => {
  return (
    <ViewModeContainer className={className}>
      <ViewModeButton
        $active={mode === 'cards'}
        onClick={() => onChange('cards')}
        aria-label="Visualização em cards"
      >
        <FiGrid /> Cards
      </ViewModeButton>
      <ViewModeButton
        $active={mode === 'table'}
        onClick={() => onChange('table')}
        aria-label="Visualização em tabela"
      >
        <FiList /> Tabela
      </ViewModeButton>
    </ViewModeContainer>
  );
};