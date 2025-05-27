import styled from "styled-components";
import { Card } from "../../../styles/card";

// Componentes estilizados adicionais
export const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg);
  background-color: var(--color-background-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
`;

export const TemplateCard = styled(Card)`
  cursor: pointer;
  padding: var(--space-lg);
  transition: all 0.2s ease;
  border: 2px solid transparent;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary-light);
  }
  
  &.selected {
    border-color: var(--color-primary);
    background-color: var(--color-background-third);
    box-shadow: var(--shadow-sm);
  }
  
  .card-header {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
    
    svg {
      color: var(--color-primary);
      font-size: 1.75rem;
      flex-shrink: 0;
    }
    
    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: var(--color-text-primary);
    }
  }
  
  .card-body {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    
    p {
      margin: 0.5rem 0;
    }
  }
`;

export const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionContainer = styled.div`
  margin-bottom: var(--space-xl);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  background-color: var(--color-background-secondary);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-xs);
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-md);
    border-bottom: 1px solid var(--color-border-light);
    
    h3 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: var(--space-md);
      font-size: 1.2rem;
      color: var(--color-text-primary);
      
      svg {
        color: var(--color-primary);
      }
    }
  }
  
  .section-specific-config {
    padding: var(--space-md);
    background-color: var(--color-background-third);
    border-radius: var(--border-radius-md);
    margin-top: var(--space-md);
  }
`;

export const InfoMessage = styled.div`
  padding: var(--space-lg);
  background-color: var(--color-background-third);
  border-left: 4px solid var(--color-info);
  margin-bottom: var(--space-xl);
  display: flex;
  align-items: flex-start;
  gap: var(--space-lg);
  border-radius: var(--border-radius-md);
  
  svg {
    color: var(--color-info);
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  div {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
  }
`;