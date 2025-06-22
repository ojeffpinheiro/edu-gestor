import styled from 'styled-components';

export const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
  width: 100%;
`;

export const ClassCard = styled.div<{ $selected: boolean }>`
  background: var(--color-card);
  border-radius: var(--border-radius-lg);
  padding: 0;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  transition: all 0.2s ease;
  cursor: pointer;
  overflow: hidden;
  
  border-left: 4px solid ${props => 
    props.$selected ? 'var(--color-primary)' : 'transparent'};
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

export const ClassHeader = styled.div<{ $expanded: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--space-lg);
  background-color: ${props => 
    props.$expanded ? 'var(--color-background-secondary)' : 'var(--color-card)'};
  transition: all 0.2s ease;
  
  .class-info {
    flex: 1;
    
    h3 {
      margin: 0 0 var(--space-xs) 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }
  }
`;

export const ClassPeriod = styled.span`
  display: inline-block;
  padding: var(--space-xxs) var(--space-sm);
  background: var(--color-background-tertiary);
  color: var(--color-text-secondary);
  border-radius: var(--border-radius-xl);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-sm);
`;

export const ClassAverage = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  
  strong {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
  }
`;

export const AssessmentItem = styled.div`
  border-top: 1px solid var(--color-border-light);
  padding: var(--space-md);
  background: var(--color-background);
  
  .assessment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    gap: var(--space-md);
  }
  
  .assessment-info {
    flex: 1;
    
    strong {
      display: block;
      margin-bottom: var(--space-xxs);
      color: var(--color-text-primary);
    }
    
    span {
      display: block;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-xxs);
    }
  }
  
  .students-scores {
    margin-top: var(--space-md);
    padding-top: var(--space-md);
    border-top: 1px dashed var(--color-border-light);
    
    .score-header {
      display: flex;
      justify-content: space-between;
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-sm);
      padding: 0 var(--space-xs);
    }
  }
`;

export const AssessmentStats = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: var(--font-size-sm);
  
  span {
    white-space: nowrap;
  }
`;

export const StudentScore = styled.div<{ $lowScore: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: var(--space-xs);
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius-sm);
  background: ${props => 
    props.$lowScore ? 'var(--color-warning-light)' : 'transparent'};
  
  span:last-child {
    font-weight: var(--font-weight-medium);
    color: ${props => 
      props.$lowScore ? 'var(--color-warning)' : 'var(--color-text-primary)'};
  }
`;

export const CollapseButton = styled.button<{ small?: boolean }>`
  background: none;
  border: none;
  font-size: ${props => props.small ? '1rem' : '1.2rem'};
  cursor: pointer;
  padding: 0 var(--space-xs);
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--color-primary);
  }
`;