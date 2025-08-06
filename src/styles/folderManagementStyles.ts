import styled from 'styled-components';

export const FoldersContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
`;

export const FoldersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

export const FolderCard = styled.div`
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const FolderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
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

export const FolderActions = styled.div`
  position: relative;
`;

export const FolderMoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  padding: 0.25rem;
  
  &:hover {
   opacity: 0.8;
  }
`;

export const FolderActionsDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 4px;
  padding: 0.5rem 0;
  display: none;
  
  ${FolderActions}:hover & {
    display: block;
  }
`;

export const FolderActionItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-primary);
  
  &:hover {
    opacity: 0.8;
    background-color: var(--color-primary-light);
  }
  
  &.delete {
  
  }
`;

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