import styled from "styled-components";

export const NavigationPanel = styled.div`
  flex: 0 0 300px;
  background-color: var(--color-background-secondary);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);
`;

export const PanelHeader = styled.div`
  padding: var(--space-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-title-card);
  border-bottom: 1px solid var(--color-border-light);
  background-color: var(--color-background-third);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CollapseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--border-radius-sm);
  
  &:hover {
    background-color: var(--color-button);
  }
`;

export const NavigationTree = styled.div`
  padding: var(--space-md) 0;
  overflow-y: auto;
  flex: 1;
`;

export const SearchBar = styled.div`
  display: flex;
  margin-bottom: var(--space-lg);
  position: relative;
  
  input {
    padding-left: var(--space-xl);
    width: 100%;
  }
  
  svg {
    position: absolute;
    left: var(--space-md);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-third);
  }
`;