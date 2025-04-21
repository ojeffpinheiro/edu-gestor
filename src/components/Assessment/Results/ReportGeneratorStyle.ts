import styled from "styled-components";
import { Card } from "../../../styles/containers";

// Componentes estilizados adicionais
export const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

export const TemplateCard = styled(Card)`
  cursor: pointer;
  padding: var(--space-md);
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    border-color: var(--color-primary);
  }
  
  &.selected {
    border-color: var(--color-primary);
    background-color: var(--color-background-third);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
    
    svg {
      color: var(--color-primary);
      font-size: 1.5rem;
    }
    
    h3 {
      margin: 0;
    }
  }
  
  .card-body {
    color: var(--color-text-secondary);
  }
`;

export const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
`;

export const SectionContainer = styled.div`
  margin-bottom: var(--space-lg);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--color-border-light);
    
    h3 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-lg);
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: var(--space-md) var(--space-lg);
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-background-third);
  }
`;

export const InfoMessage = styled.div`
  padding: var(--space-md);
  background-color: var(--color-background-third);
  border-left: 4px solid var(--color-info);
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  
  svg {
    color: var(--color-info);
    font-size: 1.5rem;
  }
`;