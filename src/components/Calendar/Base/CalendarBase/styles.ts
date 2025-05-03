import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-background);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: var(--color-secondary);
  color: white;
`;

export const CalendarTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
`;

export const CalendarControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ViewControlsWrapper = styled.div`
  margin-right: 16px;
  display: flex;
  gap: 4px;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TodayButton = styled.button`
  padding: 6px 12px;
    margin: 0 8px;
    border: 1px solid var(--color-border-dark);
    border-radius: var(--border-radius-md);
    background-color: transparent;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const CalendarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: var(--color-background);
`;