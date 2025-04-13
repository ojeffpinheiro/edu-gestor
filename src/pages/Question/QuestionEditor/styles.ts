import styled from "styled-components";
import { cardAppear } from "../../../styles/animations";

export const EditorContainer = styled.div`
  animation: ${cardAppear} 0.3s ease-out;
  margin-bottom: var(--space-lg);
  
  .DraftEditor-root {
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    padding: var(--space-md);
    min-height: 200px;
    background-color: var(--color-input);
  }
  
  .DraftEditor-editorContainer {
    min-height: 180px;
  }
`;

export const ToolbarButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  color: var(--color-text);
  
  &:hover {
    color: var(--color-primary);
  }
  
  &.active {
    color: var(--color-primary);
  }
`;

export const Toolbar = styled.div`
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-sm) 0;
  margin-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border-light);
`;

export const EditorTabs = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
`;

export const EditorTab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'var(--color-border)'};
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? 'var(--color-primary)' : 'var(--color-background-third)'};
  }
`;