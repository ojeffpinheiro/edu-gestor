import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CalendarHeader = styled.div`
  margin-bottom: 30px;

  h1 {
    font-size: 24px;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 5px 0;
  }

  p {
    color: #7f8c8d;
    margin: 0;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;

  .calendar-view {
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }

  .day-cell {
    aspect-ratio: 1;
    padding: 5px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;

    &.current-month {
      background: #f8f9fa;
    }

    &.has-event {
      background: #e8f4fd;
    }

    .day-number {
      font-weight: 600;
    }

    .event-indicators {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      margin-top: 3px;
    }

    .event-indicator {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;

      &.class {
        background: #3498db;
      }
      &.holiday {
        background: #e74c3c;
      }
      &.meeting {
        background: #2ecc71;
      }
      &.reminder {
        background: #f39c12;
      }
      &.more {
        background: #95a5a6;
      }
    }
  }

  .events-sidebar {
    .upcoming-events {
      background: white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;

      h3 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 0;
        color: #2c3e50;
      }
    }

    .events-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .event-item {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-radius: 4px;
      background: #f8f9fa;

      .event-date {
        font-size: 12px;
        color: #7f8c8d;
      }

      .event-title {
        font-weight: 500;
      }

      .event-type {
        font-size: 12px;
        text-transform: capitalize;
        margin-top: 5px;
        padding: 2px 6px;
        border-radius: 4px;
        align-self: flex-start;

        &.class {
          background: #d4e6f7;
          color: #1a5276;
        }
        &.holiday {
          background: #fadbd8;
          color: #78281f;
        }
        &.meeting {
          background: #d5f5e3;
          color: #196f3d;
        }
        &.reminder {
          background: #fdebd0;
          color: #7e5109;
        }
      }
    }
  }
`;

export const EventForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-weight: 500;
    }

    input, select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .checkbox-group {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`;

export const AddButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
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
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #7f8c8d;
`;

export const DayEventsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const DayEventItem = styled.div`
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.class {
    border-left: 4px solid #3498db;
  }
  &.holiday {
    border-left: 4px solid #e74c3c;
  }
  &.meeting {
    border-left: 4px solid #2ecc71;
  }
  &.reminder {
    border-left: 4px solid #f39c12;
  }

  .event-time {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 5px;
  }

  .event-title {
    font-weight: 500;
    margin-bottom: 5px;
  }

  .event-type {
    font-size: 12px;
    text-transform: capitalize;
    color: #7f8c8d;
  }

  .event-reminder {
    font-size: 12px;
    color: #f39c12;
    margin-top: 5px;
  }
`;