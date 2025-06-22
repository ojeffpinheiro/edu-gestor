import styled from 'styled-components';

export const RecoveryContainer = styled.div`
  background: var(--color-background);
  border-radius: var(--border-radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
  
  .no-recovery {
    text-align: center;
    padding: var(--space-xl);
    color: var(--color-text-secondary);
  }
`;

export const RecoveryHeader = styled.div`
  margin-bottom: var(--space-xl);
  
  h2 {
    font-size: var(--font-size-xl);
    color: var(--color-text-primary);
    margin: var(--space-sm) 0 var(--space-xs) 0;
  }
  
  p {
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
    margin: 0;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0;
  margin-bottom: var(--space-md);
  
  &:hover {
    text-decoration: underline;
  }
`;

export const AssessmentSelect = styled.div`
  margin-bottom: var(--space-xl);
  
  label {
    display: block;
    margin-bottom: var(--space-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
  }
  
  select {
    width: 100%;
    max-width: 400px;
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-background);
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-primary-light);
    }
  }
`;

export const RecoveryForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
`;

export const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  
  .header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    background: var(--color-background-secondary);
    border-radius: var(--border-radius-md);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
`;

export const StudentItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-md);
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-card);
  border-radius: var(--border-radius-md);
  transition: var(--transition-fast);
  
  &:hover {
    background: var(--color-background-secondary);
  }
  
  span {
    color: var(--color-text-primary);
  }
  
  input {
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-border);
    max-width: 80px;
    text-align: center;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-primary-light);
    }
  }
`;