import styled from 'styled-components';
import { Button } from '../../../styles/buttons';

/**
 * Contêiner principal da página
 */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--space-lg);
  background: var(--color-background);
  min-height: 100vh;
  font-family: var(--font-family);
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

/**
 * Cabeçalho da página com título principal
 */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: var(--font-size-2xl);
    color: var(--color-text);
    font-weight: 700;
  }
`;

/**
 * Contêiner para os cards de acesso rápido
 */
export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
  width: 100%;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Card de acesso rápido com cores customizáveis
 */
export const QuickCard = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: var(--border-radius-md);
  background-color: ${({ color }) => color};
  border-left: 5px solid ${({ color }) => color};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
  
  p {
    margin-top: 0.75rem;
    font-size: var(--font-size-sm);
    color: var(--color-text);
    line-height: 1.5;
  }
`;

/**
 * Cabeçalho do card com ícone e título
 */
export const QuickCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: inherit;
  }
  
  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-text-on-primary);
    margin: 0;
  }
`;

/**
 * Cabeçalho da seção de eventos
 */
export const EventsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  margin-top: 0.5rem;
`;

/**
 * Botão de ação com ícone e texto
 */
export const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    font-size: 1rem;
  }
`;

/**
 * Contêiner para os botões de alternância da visualização do calendário
 */
export const CalendarViewToggle = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

/**
 * Botão de alternância da visualização do calendário
 */
export const ViewToggleButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.25rem;
  background-color: ${({ active }) => active ? 'var(--color-primary)' : 'transparent'};
  color: ${({ active }) => active ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  border: 1px solid ${({ active }) => active ? 'var(--color-primary)' : 'var(--color-border)'};
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: ${({ active }) => active ? '600' : '400'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active }) => active ? 'var(--color-primary-hover)' : 'var(--color-background-secondary)'};
  }
`;

/**
 * Contêiner para os filtros de eventos
 */
export const EventFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

/**
 * Botão de filtro com cor customizável e estado ativo/inativo
 */
export const FilterButton = styled.button<{ active: boolean; color: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ active, color }) => active ? `${color}20` : 'transparent'};
  color: ${({ active, color }) => active ? color : 'var(--color-text)'};
  border: 1px solid ${({ active, color }) => active ? color : 'var(--color-border)'};
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: ${({ active }) => active ? '600' : '400'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ color }) => `${color}10`};
    border-color: ${({ color }) => color};
  }
  
  svg {
    font-size: 0.875rem;
  }
`;

/**
 * Contêiner para o calendário
 */
export const CalendarContainer = styled.div`
  margin-bottom: 2rem;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background-color: var(--color-card);
  
  /* Estilização adicional para o calendário */
  .rbc-calendar {
    font-family: var(--font-family);
  }
  
  .rbc-toolbar {
    padding: 1rem;
    margin-bottom: 0;
  }
  
  .rbc-toolbar button {
    border-radius: var(--border-radius-sm);
  }
  
  .rbc-toolbar button.rbc-active {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    border-color: var(--color-primary);
  }
  
  .rbc-event {
    border-radius: var(--border-radius-sm);
    padding: 0.25rem 0.5rem;
  }
  
  .rbc-today {
    background-color: var(--color-primary-light);
  }
  
  .rbc-header {
    font-weight: 600;
    padding: 0.75rem 0;
  }
  
  .rbc-month-view {
    border-radius: var(--border-radius-sm);
    overflow: hidden;
  }
`;

/**
 * Estilos para o modal de eventos
 */
export const EventModal = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

/**
 * Botões de ação para o modal
 */
export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

/**
 * Lista de eventos estilizada
 */
export const EventListStyled = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

/**
 * Feedback visual - mensagem de sucesso
 */
export const SuccessMessage = styled.div`
  padding: 1rem;
  background-color: #e6f7e6;
  border-left: 4px solid #4CAF50;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1rem;
  color: #2e7d32;
  font-weight: 500;
`;

/**
 * Feedback visual - mensagem de erro
 */
export const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: #ffebee;
  border-left: 4px solid #F44336;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1rem;
  color: #c62828;
  font-weight: 500;
`;

/**
 * Dica de ajuda com ícone
 */
export const HelpTip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #e3f2fd;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1rem;
  font-size: var(--font-size-sm);
  color: #0277bd;
  
  svg {
    font-size: 1.25rem;
  }
`;