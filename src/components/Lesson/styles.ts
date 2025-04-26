
import styled from 'styled-components';
import { IconButton } from '../../styles/buttons';
import { fadeIn } from '../../styles/animations';


export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background-color: var(--color-background-secondary);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  padding: var(--space-sm);
  background-color: var(--color-background-third);
  border-bottom: 1px solid var(--color-border);
`;

export const ToolbarGroup = styled.div`
  display: flex;
  gap: var(--space-xs);
  margin-right: var(--space-sm);
  padding-right: var(--space-sm);
  border-right: 1px solid var(--color-border);
  
  &:last-child {
    border-right: none;
  }
`;

export const ToolbarButton = styled(IconButton)`
  width: 36px;
  height: 36px;
  font-size: var(--font-size-md);
  
  &.active {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
  }
`;

export const EditorContent = styled.div`
  padding: var(--space-md);
  min-height: 300px;
  background-color: var(--color-input);
  border: none;
  outline: none;
  flex: 1;
  resize: vertical;
  overflow-y: auto;
  
  & * {
    margin-bottom: var(--space-sm);
  }
  
  & h1, & h2, & h3, & h4, & h5, & h6 {
    font-weight: 600;
  }
  
  & h1 {
    font-size: var(--font-size-2xl);
  }
  
  & h2 {
    font-size: var(--font-size-xl);
  }
  
  & h3 {
    font-size: var(--font-size-lg);
  }
  
  & ul, & ol {
    padding-left: var(--space-xl);
  }
  
  & blockquote {
    padding-left: var(--space-md);
    border-left: 3px solid var(--color-border-dark);
    color: var(--color-text-secondary);
    font-style: italic;
  }
  
  & img {
    max-width: 100%;
    height: auto;
  }
  
  & table {
    width: 100%;
    border-collapse: collapse;
    
    & th, & td {
      border: 1px solid var(--color-border);
      padding: var(--space-sm);
    }
    
    & th {
      background-color: var(--color-background-third);
    }
  }
  
  & a {
    color: var(--color-primary);
    text-decoration: underline;
  }
  
  & code {
    font-family: monospace;
    background-color: var(--color-background-third);
    padding: 2px 4px;
    border-radius: var(--border-radius-sm);
  }
  
  & pre {
    background-color: var(--color-background-third);
    padding: var(--space-sm);
    border-radius: var(--border-radius-sm);
    overflow-x: auto;
    
    & code {
      background-color: transparent;
      padding: 0;
    }
  }
`;

export const EditorTextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: var(--space-md);
  border: none;
  outline: none;
  background-color: var(--color-input);
  color: var(--color-text);
  font-family: var(--font-family);
  resize: vertical;
`;

export const TabHeader = styled.div`
  display: flex;
  background-color: var(--color-background-third);
  border-bottom: 1px solid var(--color-border);
`;
