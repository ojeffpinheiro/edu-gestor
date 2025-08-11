import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  
  &:hover {
    color: var(--color-text);
  }
`;

export const ModalContent = styled.div`
  padding: 1.5rem;
`;

export const SettingsSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SettingsSectionTitle = styled.h4`
  margin: 0 0 1rem;
  font-size: 1rem;
  color: var(--color-text);
`;

export const SettingsOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
`;

export const SettingsOptionLabel = styled.label`
  font-size: 0.875rem;
  color: var(--color-text);
`;

export const SettingsOptionControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
`;

export const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &.outline {
    border: 1px solid var(--color-border);
    background-color: var(--color-background-secondary);
    color: var(--color-text);
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  &.primary {
    background-color: var(--color-primary);
    color: white;
    border: 1px solid var(--color-border);
    
    &:hover {
      oppacity: 0.8;
    }
  }
`;