import styled from 'styled-components';
import { Grid } from '../../../../styles/layoutUtils';

export const Card = styled.div`
  background: rgba(var(--glass-background-rgb), 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-xl);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-2xl);
  }
`;

export const Content = styled(Grid)`
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding: 1rem 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const CardTitle = styled.h3`
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.025em;
  margin-bottom: 1.5rem;
  color: var(--color-title-card);
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: var(--gradient-primary);
    border-radius: var(--border-radius-full);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: rgba(var(--glass-background-rgb), 0.4);
  border-radius: var(--space-md);
  border: 1px dashed var(--glass-border);
  
  h4 {
    font-size: var(--font-size-lg);
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }
  
  p {
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }
  
  .primary-button {
    background: var(--gradient-primary);
    color: var(--color-text-on-primary);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius-full);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  gap: 1rem;
  background: #f5f5f5;
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ShiftSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const GridContainer = styled.div`
  flex: 1;
  overflow: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;