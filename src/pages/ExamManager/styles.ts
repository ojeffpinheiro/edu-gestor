import styled from "styled-components";
import { fadeIn } from '../../styles/animations';
import { flexRow, flexColumn, spaceBetween, gap } from '../../styles/layoutUtils';

// Container principal
export const ExamManagerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xl);
  position: relative;
`;

// Componentes de cabeçalho
export const Header = styled.header`
  ${flexRow}
  ${spaceBetween}
  margin-bottom: var(--space-xl);
`;

export const Title = styled.h1`
  font-size: var(--font-size-3xl);
  color: var(--color-title-card);
  font-weight: 700;
`;

export const ActionsContainer = styled.div`
  ${flexRow}
  ${gap('md')}
`;

// Grid de exames
export const ExamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-lg);
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Loading e estado de erro
export const LoadingContainer = styled.div`
  ${flexColumn}
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export const ErrorMessage = styled.div`
  color: var(--color-error);
  background-color: var(--color-error-light);
  padding: var(--space-md);
  border-radius: var(--border-radius-sm);
  margin: var(--space-md) 0;
`;