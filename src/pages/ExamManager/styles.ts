import styled from "styled-components";
import { fadeIn } from '../../styles/animations';
import { flexRow, flexColumn, spaceBetween, gap } from '../../styles/layoutUtils';

/**
 * Estilos para o Gerenciador de Exames
 * 
 * Define o layout e aparência do componente ExamManager
 * Usa utilities de layout e animações da biblioteca de estilos
 */

// Container principal - limita largura e centraliza conteúdo
export const ExamManagerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xl);
  position: relative;
  min-height: 500px; /* Garante altura mínima mesmo sem conteúdo */
`;

// Componentes de cabeçalho
export const Header = styled.header`
  ${flexRow}
  ${spaceBetween}
  margin-bottom: var(--space-xl);
  flex-wrap: wrap; /* Permite quebra em telas menores */
  
  @media (max-width: 768px) {
    ${flexColumn}
    align-items: flex-start;
    ${gap('md')}
  }
`;

export const Title = styled.h1`
  font-size: var(--font-size-3xl);
  color: var(--color-title-card);
  font-weight: 700;
  margin: 0; /* Evita espaçamento indesejado */
`;

export const ActionsContainer = styled.div`
  ${flexRow}
  ${gap('md')}
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

// Grid responsivo para exames
export const ExamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-lg);
  animation: ${fadeIn} 0.3s ease-out;
  min-height: 100px; /* Garante altura mínima enquanto carrega */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Loading e estado de erro
export const LoadingContainer = styled.div`
  ${flexColumn}
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
  color: var(--color-text-secondary);
  
  & > p {
    margin-top: var(--space-md);
    font-size: var(--font-size-md);
  }
`;

export const ErrorMessage = styled.div`
  color: var(--color-error);
  background-color: var(--color-error-light);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--border-radius-sm);
  margin: var(--space-md) 0;
  border-left: 4px solid var(--color-error);
  font-weight: 500;
  
  /* Ícone de erro usando pseudo-elemento */
  &::before {
    content: "⚠️";
    margin-right: var(--space-sm);
  }
`;

// Feedback de sucesso
export const SuccessMessage = styled.div`
  color: var(--color-success);
  background-color: var(--color-success-light);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--border-radius-sm);
  margin: var(--space-md) 0;
  border-left: 4px solid var(--color-success);
  
  /* Ícone de sucesso usando pseudo-elemento */
  &::before {
    content: "✓";
    margin-right: var(--space-sm);
    font-weight: bold;
  }
`;

// Estilo para tooltip de ajuda
export const HelpTooltip = styled.div`
  position: relative;
  display: inline-block;
  
  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
  
  .tooltip-text {
    visibility: hidden;
    width: 200px;
    background-color: var(--color-background-tooltip);
    color: var(--color-text-tooltip);
    text-align: center;
    border-radius: var(--border-radius-sm);
    padding: var(--space-sm);
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -100px;
    opacity: 0;
    transition: opacity 0.3s;
  }
`;