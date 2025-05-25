import styled from "styled-components";

// Estilos modernizados
export const HistoryContainer = styled.div`
  background: var(--color-card);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-xl);
  transition: all var(--transition-normal);
  
  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const HistoryDay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover {
    background: var(--color-background-third);
    transform: translateY(-1px);
  }
`;

export const HistoryDate = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
`;

export const HistoryCount = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
`;

export const DetailButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary.main};
    background: ${({ theme }) => theme.primary.light};
  }
`;
export const MismatchList = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #f44336;
`;

export const MismatchItem = styled.div`
  margin-bottom: 0.2rem;
`;