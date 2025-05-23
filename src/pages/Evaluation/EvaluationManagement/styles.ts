import styled from 'styled-components';

interface NavButtonProps {
  active?: boolean;
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 24px;
  padding: var(--space-lg);
  min-height: 100vh;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  grid-template-areas:
    "header header"
    "sidebar main";
  
  grid-template-rows: auto 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

export const SideBar = styled.nav`
  grid-area: sidebar;
  background-color: var(--color-background);
  border-right: 1px solid var(--color-border);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

export const NavButton = styled.button<NavButtonProps>`
  background-color: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'var(--color-border)'};
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--color-primary-hover)' : 'var(--color-button)'};
  }
`;

export const MainContent = styled.main`
  grid-area: main;
  padding: var(--space-lg);
  background-color: var(--color-background);
  overflow-y: auto;
`;

export const ActionButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

export const FilterInput = styled.input`
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  width: 100%;
  margin-bottom: var(--space-md);
`;