import styled from "styled-components";

// Adicionando um novo container para a pré-visualização
export const PreviewContainer = styled.div`
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  padding: var(--space-md);
  margin-top: var(--space-md);
  background-color: var(--color-background-secondary);
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  max-width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  background-color: var(--color-card);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const EquationInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  resize: vertical;
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-light);
  }
`;

export const ToolbarSection = styled.div`
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  padding: var(--space-sm);
  background-color: var(--color-background-secondary);
  margin-bottom: var(--space-sm);
  
  &:last-of-type {
    margin-bottom: var(--space-md);
  }
`;

export const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
`;

export const SectionTitle = styled.h4`
  margin: var(--space-xs) 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid var(--color-border-light);
`;

export const ButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  padding: var(--space-xs) 0;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0 var(--space-xs);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-card);
  cursor: pointer;
  transition: all 0.2s;
  font-size: var(--font-size-md);
  
  &:hover {
    background-color: var(--color-background-third);
    border-color: var(--color-border);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-light);
  }
  
  &:active {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
  }
  
  svg {
    font-size: 16px;
  }
`;

export const VariableButton = styled.button<{ isSelected?: boolean }>`
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid ${props => props.isSelected ? 'var(--color-primary)' : 'var(--color-border-light)'};
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.isSelected ? 'var(--color-primary-light)' : 'var(--color-card)'};
  color: ${props => props.isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  font-family: var(--font-family), serif;
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isSelected ? 'var(--color-primary-light)' : 'var(--color-background-third)'};
    border-color: var(--color-border);
  }
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: var(--space-md);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: var(--space-sm) var(--space-md);
  background-color: ${props => props.active ? 'var(--color-background-secondary)' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  cursor: pointer;
  transition: all 0.2s;
  font-weight: ${props => props.active ? '500' : 'normal'};
  
  &:hover {
    color: var(--color-primary);
    background-color: var(--color-background-third);
  }
  
  &:first-child {
    border-top-left-radius: var(--border-radius-sm);
  }
`;

export const FormatHelp = styled.div`
  margin-top: var(--space-sm);
  padding: var(--space-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-third);
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-sm);
  font-style: italic;
`;

export const ToolbarButton = styled.button`
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: var(--space-xs) var(--space-sm);
  font-family: var(--font-family), serif;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-background-third);
    border-color: var(--color-primary);
  }
`;

export const VariablesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
  padding: var(--space-xs) 0;
`;

export const VariableChip = styled.button`
  background-color: var(--color-background-third);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-background-secondary);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;