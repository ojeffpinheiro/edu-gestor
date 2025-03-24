import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9rem;
`;

export const SuccessMessage = styled.p`
    color: green;
    font-size: 0.9rem;
`;

export const CriteriaSectionContainer = styled.div`
  margin: var(--space-lg) 0;
  padding: var(--space-lg);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  
  h2 {
    margin: 0;
    color: var(--color-text);
  }
`;

export const EmptyState = styled.div`
  padding: var(--space-xl);
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  border: 1px dashed var(--color-border);
  text-align: center;
`;

export const FeedbackContainer = styled.div<{ type: 'success' | 'error' }>`
  padding: var(--space-md);
  margin-bottom: var(--space-md);
  border-radius: var(--border-radius-sm);
  background-color: ${props => 
    props.type === 'success' 
      ? 'rgba(82, 196, 26, 0.1)' 
      : 'rgba(245, 34, 45, 0.1)'
  };
  border-left: 4px solid ${props => 
    props.type === 'success' 
      ? 'var(--color-success)' 
      : 'var(--color-error)'
  };
`;

export const WeightSummaryContainer = styled.div<{ isValid: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
  background-color: ${props => 
    props.isValid 
      ? 'rgba(82, 196, 26, 0.1)' 
      : 'rgba(250, 173, 20, 0.1)'
  };
  border-radius: var(--border-radius-sm);
  border-left: 4px solid ${props => 
    props.isValid 
      ? 'var(--color-success)' 
      : 'var(--color-warning)'
  };
`;

export const WeightWarning = styled.span`
  color: var(--color-warning);
  font-size: var(--font-size-sm);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  
  h2 {
    margin: 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: var(--space-md);
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-lg);
`;

export const CloseButtonStyled = styled.button`
  background: transparent;
  border: none;
  font-size: var(--font-size-lg);
  cursor: pointer;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--color-text);
  }
`;

export const CancelButtonStyled = styled.button`
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-secondary);
  color: var(--color-text-button);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--color-secondary-hover);
  }
`;