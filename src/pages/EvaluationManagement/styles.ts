import styled from 'styled-components';

export const Container = styled.div`
  padding: var(--space-lg);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  display: grid;
    grid-template-areas:
      "header header"
      "sidebar main";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
`;

export const SideBar = styled.nav`
  grid-area: sidebar;
  background-color: var(--color-background-secondary);
  border-right: 1px solid var(--color-border);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

export const NavButton = styled.button<{ active: boolean }>`
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

export const Section = styled.section`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-lg);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
`;

export const SectionTitle = styled.h2`
  color: var(--color-title-card);
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-md);
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

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const FilterLabel = styled.label`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

export const FilterSelect = styled.select`
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-input);
  color: var(--color-text);
  
  &:focus {
    border-color: var(--color-input-focus);
    outline: none;
    box-shadow: var(--shadow-focus);
  }
`;