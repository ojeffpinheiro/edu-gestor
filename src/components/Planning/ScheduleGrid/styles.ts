import styled from "styled-components";

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-title-card);
  margin: 0;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(5, 1fr);
  gap: 0.5rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-xl);
  padding: 1rem;
  box-shadow: var(--shadow-md);
  overflow-x: auto;
`;

export const DayHeader = styled.div`
  font-weight: var(--font-weight-semibold);
  text-align: center;
  padding: 0.75rem;
  background: var(--gradient-primary);
  color: var(--color-text-on-primary);
  border-radius: var(--radius-md);
  position: sticky;
  top: 0;
  margin-bottom: 0.5rem;
`;

export const TimeLabel = styled.div`
  padding: 0.75rem;
  text-align: right;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-surface);
  border-radius: var(--radius-md);
`;

export const HourSlot = styled.div`
  height: 80px;
  padding: 0.25rem;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: var(--transition-all);
  position: relative;
  
  &:hover {
    background: var(--color-surface-elevated);
    box-shadow: var(--shadow-sm);
    
    .add-button {
      opacity: 1;
    }
  }
`;

export const LessonItem = styled.div`
  background: var(--gradient-surface);
  border-radius: var(--radius-md);
  padding: 0.75rem;
  height: 100%;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    
    .add-button {
      opacity: 1;
    }
  }

  .add-button {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const LessonTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: var(--color-text);
`;

export const LessonTime = styled.div`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
`;

export const LessonInfo = styled.div`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

export const EmptySlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: var(--radius-md);
  
  &:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);
    
    svg {
      transform: scale(1.2);
    }
  }
  
  svg {
    transition: transform 0.2s ease;
  }
`;

export const AddButton = styled.button`
  background: var(--gradient-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--radius-xl);
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-all);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  svg {
    margin-right: 0.25rem;
  }
`;