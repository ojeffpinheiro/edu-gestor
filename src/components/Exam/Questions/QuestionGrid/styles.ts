import styled from "styled-components";

export const QuestionGridContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const QuestionCard = styled.div`
  background: var(--color-background-secondary);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    background: var(--color-background-third);
  }

  .status-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-weight: 500;

    &.active {
      background: #dcfce7;
      color: #166534;
    }

    &.inactive {
      background: #fee2e2;
      color: #991b1b;
    }

    &.draft {
      background: #fef9c3;
      color: #854d0e;
    }
  }

  .card-body {
    padding: 1rem;
    flex-grow: 1;

    h3 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      line-height: 1.4;
    }

    .meta {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
      font-size: 0.8rem;

      span {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        background: #f3f4f6;
      }

      .difficulty {
        &.easy {
          background: #dcfce7;
          color: #166534;
        }
        &.medium {
          background: #fef9c3;
          color: #854d0e;
        }
        &.hard {
          background: #fee2e2;
          color: #991b1b;
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        background: var(--color-background-secondary);
        color: #0369a1;
        border-radius: 1rem;
      }
    }
  }

  .card-actions {
    display: flex;
    justify-content: flex-end;
    padding: 0.75rem 1rem;
    border-top: 1px solid #eee;
    gap: 0.5rem;
  }
`;

export const ActionButton = styled.button<{ danger?: boolean }>`
  color: ${props => props.danger ? '#dc2626' : '#0369a1'};
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.danger ? '#fee2e2' : '#e0f2fe'};
  }
`;