import styled from 'styled-components';
import { constants } from '../utils/consts';

export const FoldersContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const FoldersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--color-secondary);
  border-bottom: 1px solid var(--color-border);
`;

export const FoldersTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
  font-weight: 600;
`;

export const FoldersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
  padding: var(--space-lg);
  background-color: var(--color-background-secondary);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FolderCardContainer = styled.div`
  background-color: var(--color-background-secondary);;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }
`;

export const FolderCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const FolderIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

export const FolderTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
`;

export const FolderCount = styled.p`
  margin: 0.25rem 0 0;
  color: var(--color-primary);
  font-size: 0.875rem;
`;

export const FolderMoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 0.25rem;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-background-secondary);
    color: var(--color-text);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

export const FolderActionsDropdown = styled.div<{ isOpen?: boolean }>`
  position: absolute;
  right: 0;
  top: 100%;
  min-width: 160px;
  background-color: var(--color-background-third);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  z-index: 10;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  margin-top: 0.5rem;
  overflow: hidden;
  
  @media (max-width: 480px) {
    right: auto;
    left: 0;
  }
`;

export const FolderActions = styled.div`
  position: relative;
  
  &:hover {
    ${FolderActionsDropdown} {
      display: block;
    }
  }
`

export const AddFolderCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--color-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
  opacity: 0.8;
border: 1px solid var(--color-border);
  }
`;

export const AddFolderIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-primary-light); 
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-size: 1.5rem;
`;

export const AddFolderText = styled.p`
  margin: 0;
  font-weight: 500;
`;

// Estilos para o Modal
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

export const ModalContent = styled.div`
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${constants.shadows.lg};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--color-secondary);
  }
`;

export const ModalBody = styled.div`
  padding: var(--space-lg);
  
  label {
    display: block;
    margin-bottom: var(--space-sm);
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--color-border)
    border-radius: var(--border-radius-sm);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-primary-light);
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-top: 1px solid var(--color-border);
  
  button {
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all 0.2s;
    
    &:first-child {
      background-color: var(--color-background-third);
      border: 1px solid var(--color-border);
      
      &:hover {
        background-color: var(--color-secondary);
      }
    }
    
    &:last-child {
      background-color: var(--color-primary);
      color: var(--color-background-third);
      border: none;
      
      &:hover {
        background-color: #4338CA;
      }
      
      &:disabled {
        background-color: ${constants.colors.text.secondary};
        cursor: not-allowed;
      }
    }
  }
`;

export const FolderActionItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-text);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-background-secondary);
  }
  
  &.delete {
    color: var(--color-error);
    
    &:hover {
      background-color: var(--color-error-light);
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;