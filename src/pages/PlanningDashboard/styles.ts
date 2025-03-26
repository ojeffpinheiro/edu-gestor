import styled from 'styled-components';

export const PlanningCardWrapper = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: 0.5rem;
  background-color: var(--color-background-secondary);
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: var(--color-success);
  border-radius: 4px;
  overflow: hidden;

  & > div {
    width: ${({ $progress }) => $progress}%;
    height: 100%;
    background-color: var(--color-feedback-success);
  }
`;

export const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: var(--color-background);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const TabButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border-light);
  background-color: ${({ $active }) => ($active ? '#007bff' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#000')};
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const GridSection = styled.div`
  display: grid;
  gap: 1rem;
  margin: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));
`;

export const SectionCard = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: 0.5rem;
  background-color: var(--color-background-secondary);
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NotificationItem = styled.div`
  padding: 0.5rem;
  border: 1px solid var(--color-border-light);
  border-radius: 0.25rem;
  background-color: var(--color-card);
`;

export const QuickAccessCard = styled.div<{ $color: string }>`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: 0.5rem;
  background-color: var(--color-card);
  border-left: 4px solid ${({ $color }) => $color};
`;