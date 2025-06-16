import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8);
  color: var(--color-text);
`;

export const CalendarHeader = styled.header`
  margin-bottom: var(--space-10);
  text-align: center;

  h1 {
    font-size: clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl));
    font-weight: var(--font-weight-extrabold);
    margin-bottom: var(--space-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    color: var(--color-primary);
  }

  p {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);

  @media (min-width: var(--breakpoint-lg)) {
    grid-template-columns: 2fr 1fr;
  }

  .calendar-view {
    background: var(--color-card);
    border-radius: var(--space-md);
    padding: var(--space-lg);
    box-shadow: var(--shadow-md);
    transition: var(--transition-all);

    &:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: .75rem;
    margin-bottom: var(--space-md);
    text-align: center;
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: .75rem;
  }

  .day-cell {
    aspect-ratio: 1;
    padding: var(--space-xl);
    border-radius: var(--border-radius-md);
    display: flex;
    flex-direction: column;
    background: var(--color-background-third);
    transition: var(--transition-all);

    &.current-month {
      background: var(--color-background-secondary);
      cursor: pointer;

      &:hover {
        background: var(--color-primary-light);
        transform: scale(1.05);
      }
    }

    &.has-event {
      box-shadow: inset 0 0 0 2px var(--color-primary);
    }

    .day-number {
      font-weight: var(--font-weight-semibold);
      align-self: flex-end;
    }

    .event-indicators {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin-top: auto;
      justify-content: center;
    }

    .event-indicator {
      width: 20px;
      height: 20px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-on-primary);

      &.class {
        background: var(--color-info);
      }
      &.holiday {
        background: var(--color-error);
      }
      &.meeting {
        background: var(--color-warning);
      }
      &.reminder {
        background: var(--color-success);
      }
    }
  }

  .events-sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .upcoming-events {
    background: var(--color-card);
    border-radius: var(--space-md);
    padding: var(--space-lg);
    box-shadow: var(--shadow-md);

    h3 {
      display: flex;
      align-items: center;
      gap: var(--space-xl);
      margin-bottom: var(--space-lg);
      color: var(--color-text);
    }
  }

  .events-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .event-item {
    background: var(--color-surface);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    border-left: 4px solid var(--color-primary);
    transition: var(--transition-transform);

    &:hover {
      transform: translateX(5px);
    }

    .event-date {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-xs);
    }

    .event-title {
      font-weight: var(--font-weight-medium);
      margin-bottom: var(--space-xl);
    }

    .event-type {
      display: inline-block;
      padding: var(--space-xs) 0.75rem;
      border-radius: var(--radius-full);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);

      &.class {
        background: var(--color-info-light);
        color: var(--color-info-dark);
      }
      &.holiday {
        background: var(--color-error-light);
        color: var(--color-error-dark);
      }
      &.meeting {
        background: var(--color-warning-light);
        color: var(--color-warning-dark);
      }
      &.reminder {
        background: var(--color-success-light);
        color: var(--color-success-dark);
      }
    }
  }
`;

export const EventForm = styled.div`
  background: var(--color-card);
  border-radius: var(--space-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);

  h3 {
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }

  .form-group {
    margin-bottom: var(--space-5);

    label {
      display: block;
      margin-bottom: var(--space-xl);
      font-weight: var(--font-weight-medium);
      color: var(--color-text);
    }

    input, select {
      width: 100%;
      padding: var(--space-3) var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-md);
      background: var(--color-surface);
      color: var(--color-text);
      transition: var(--transition-all);

      &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: var(--shadow-focus);
      }
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }

  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    input[type="checkbox"] {
      width: auto;
      accent-color: var(--color-primary);
    }

    label {
      margin-bottom: 0;
      cursor: pointer;
    }
  }
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--gradient-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  cursor: pointer;
  transition: var(--transition-all);

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  background: var(--color-surface-elevated);
  border-radius: var(--space-md);
  padding: var(--space-lg);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-2xl);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--radius-full);
  transition: var(--transition-colors);

  &:hover {
    color: var(--color-text);
    background: var(--color-background-third);
  }
`;

export const DayEventsModal = styled(Modal)`
  z-index: var(--z-modal-backdrop);
`;

export const DayEventItem = styled.div`
  background: var(--color-surface);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  margin-bottom: 0.75rem;
  border-left: 4px solid;
  transition: var(--transition-all);

  &.class {
    border-left-color: var(--color-info);
  }
  &.holiday {
    border-left-color: var(--color-error);
  }
  &.meeting {
    border-left-color: var(--color-warning);
  }
  &.reminder {
    border-left-color: var(--color-success);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  .event-time {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-xs);
  }

  .event-title {
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-xs);
  }

  .event-type {
    display: inline-block;
    padding: var(--space-xs) var(--space-xl);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-xs);
    background: var(--color-background-third);
    margin-bottom: var(--space-xl);
  }

  .event-reminder {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    gap: var(--space-xs);

    &::before {
      content: '⏰';
    }
  }
`;