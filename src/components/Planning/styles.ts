import styled from "styled-components";

export const SectionCard = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: 0.5rem;
  background-color: var(--color-background-secondary);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.25rem;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
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
`;

export const NotificationItem = styled.div`
  padding: 0.75rem;
  border: 1px solid var(--color-border-light);
  border-radius: 0.25rem;
  background-color: var(--color-card);
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

export const GridSection = styled.div`
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
  grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const QuickAccessCard = styled.div<{ $color: string }>`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: 0.5rem;
  background-color: ${({ $color }) => $color};
  border-left: 4px solid ${({ $color }) => $color};
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  p {
    color: var(--color-text);
  }
`;

export const QuickHeader = styled.header`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  svg {
    color: inherit;
  }

  h3 {
    color: var(--color-text-on-primary);
  }
`;