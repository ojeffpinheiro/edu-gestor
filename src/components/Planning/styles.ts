import styled from "styled-components";

// Valores customizáveis para permitir maior flexibilidade
const CARD_MAX_HEIGHT = '300px';
const SCROLLBAR_WIDTH = '4px';
const BORDER_RADIUS = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem'
};

// Definição dos estilos base para seções
export const SectionCard = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: ${BORDER_RADIUS.md};
  background-color: var(--color-background-secondary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;
  
  /* Melhoria de acessibilidade para foco */
  &:focus-within {
    box-shadow: 0 0 0 2px var(--color-primary);
    outline: none;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  /* Garantindo responsividade do cabeçalho */
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

// Melhorado para acessibilidade e experiência de usuário
export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: ${CARD_MAX_HEIGHT};
  overflow-y: auto;
  padding-right: 0.25rem;
  
  /* Scrollbar styling - melhorado para todos os navegadores */
  &::-webkit-scrollbar {
    width: ${SCROLLBAR_WIDTH};
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
  
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #ccc #f1f1f1;
`;

export const NotificationItem = styled.div`
  padding: 0.75rem;
  border: 1px solid var(--color-border-light);
  border-radius: ${BORDER_RADIUS.sm};
  background-color: var(--color-card);
  transition: background-color 0.2s ease-in-out, transform 0.1s ease;
  
  &:hover {
    background-color: #f9fafb;
  }
  
  /* Feedback visual para interação */
  &:active {
    transform: scale(0.99);
  }
`;

// Grade adaptativa com breakpoints para diferentes tamanhos de tela
export const GridSection = styled.div`
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  /* Responsividade aprimorada */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

// Cartão com foco em acessibilidade e feedback visual
export const QuickAccessCard = styled.div<{ $color: string }>`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: ${BORDER_RADIUS.md};
  background-color: ${({ $color }) => $color}20; /* Adicionado transparência para melhor contraste */
  border-left: 4px solid ${({ $color }) => $color};
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ $color }) => $color}, 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Melhor contraste para acessibilidade */
  p {
    color: var(--color-text);
    margin-top: 0.5rem;
  }
`;

export const QuickHeader = styled.header`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;

  svg {
    color: inherit;
    font-size: 1.25rem;
  }

  h3 {
    color: var(--color-text-dark);
    margin: 0;
  }
`;

// Barra de progresso atualizada com segmentos multicoloridos
export const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: row;

  .complete {
    height: 100%;
    background-color: var(--color-feedback-success, #28a745);
    transition: width 0.5s ease-in-out;
  }

  .partial {
    height: 100%;
    background-color: var(--color-feedback-warning, #ffc107);
    transition: width 0.5s ease-in-out;
  }

  .pending {
    height: 100%;
    background-color: var(--color-feedback-danger, #dc3545);
    transition: width 0.5s ease-in-out;
  }
`;

// Wrapper para o card de planejamento
export const PlanningCardWrapper = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: ${BORDER_RADIUS.md};
  background-color: var(--color-background-secondary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

// Componente para exibir quando não há itens para mostrar
export const EmptyStateMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;