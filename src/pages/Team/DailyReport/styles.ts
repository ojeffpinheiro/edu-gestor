import styled from 'styled-components';
import { cardAppear, fadeIn, slideUp } from '../../../styles/animations';
import { BaseCard } from '../../../styles/baseComponents';
import { Select } from '../../../styles/inputs';
import { Button } from '../../../styles/buttons';

// Container principal que envolve todo o componente
export const MainContainer = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding: var(--space-md);
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: 768px) {
    padding: var(--space-sm);
  }
`;

// Cabeçalho da página de avaliação
export const AssessmentHeader = styled.div`
  margin-bottom: var(--space-lg);
  
  h1 {
    margin-bottom: var(--space-xs);
    color: var(--color-text);
    font-size: var(--font-size-2xl);
  }
  
  p {
    color: var(--color-text-secondary);
    font-size: var(--font-size-md);
  }
`;

// Mensagem de status para feedback ao usuário
export const StatusMessage = styled.div<{ type: 'success' | 'error' | 'info' | null }>`
  padding: var(--space-md);
  margin-bottom: var(--space-md);
  border-radius: var(--border-radius-md);
  font-weight: 500;
  animation: ${slideUp} 0.3s ease;
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background-color: rgba(var(--color-success), 0.1);
          color: var(--color-success);
          border-left: 4px solid var(--color-success);
        `;
      case 'error':
        return `
          background-color: rgba(var(--color-error), 0.1);
          color: var(--color-error);
          border-left: 4px solid var(--color-error);
        `;
      case 'info':
        return `
          background-color: rgba(var(--color-info), 0.1);
          color: var(--color-info);
          border-left: 4px solid var(--color-info);
        `;
      default:
        return '';
    }
  }}
`;

// Container para os cards de categoria
export const CategoryCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

// Cards para seleção de categorias
export const CategoryCard = styled(BaseCard)<{ selected: boolean }>`
  padding: var(--space-md);
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  background-color: ${(props) => 
    props.selected ? 'var(--color-primary)' : 'var(--color-background-secondary)'};
  color: ${(props) => 
    props.selected ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  transform: ${(props) => 
    props.selected ? 'translateY(-4px)' : 'translateY(0)'};
  box-shadow: ${(props) => 
    props.selected ? 'var(--shadow-md)' : 'var(--shadow-sm)'};
  border-left: ${(props) => 
    props.selected ? '5px solid var(--color-primary-hover)' : '1px solid var(--color-border-light)'};
  animation: ${cardAppear} 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  p {
    font-size: var(--font-size-sm);
    margin-top: var(--space-xs);
    opacity: 0.9;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    p {
      display: none;
    }
  }
`;

// Ícone da categoria
export const CategoryIcon = styled.div`
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

// Título do card de categoria
export const CardTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--space-xs);
`;

// Container da tabela
export const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  animation: ${slideUp} 0.4s ease;
`;

// Wrapper da tabela com scroll horizontal
export const TableWrapper = styled.div`
  overflow-x: auto;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background-secondary);
  margin-bottom: var(--space-md);
`;

// Nome do aluno na tabela
export const StudentName = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: var(--space-sm);
    background-color: var(--color-primary);
  }
`;

// Campo select estilizado
export const SelectField = styled(Select)`
  width: 100%;
  font-size: var(--font-size-sm);
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    border-color: var(--color-primary);
  }
  
  &:disabled {
    background-color: var(--color-background-third);
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// Botão de salvar
export const SaveButton = styled(Button)`
  margin-left: auto;
  background-color: var(--color-success);
  padding: var(--space-md) var(--space-lg);
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: var(--color-success-hover);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
  }
  
  &.loading {
    position: relative;
    color: transparent;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin: -10px 0 0 -10px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Mensagem quando não há dados
export const EmptyStateMessage = styled.div`
  padding: var(--space-xl);
  text-align: center;
  color: var(--color-text-secondary);
  font-style: italic;
`;