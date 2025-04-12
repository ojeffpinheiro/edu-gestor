import styled from "styled-components";
import { cardAppear, fadeIn } from "../../styles/animations";
import { Input } from "../../styles/inputs";
import { Card } from "../../styles/layoutUtils";

export const EquationSelectorContainer = styled.div`
  margin-bottom: var(--space-xl);
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: var(--space-md);
  
  svg {
    position: absolute;
    left: var(--space-md);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-third);
  }
`;

export const SearchInput = styled(Input)`
  padding-left: var(--space-xl);
  width: 100%;
`;

export const EquationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-md);
  max-height: 300px;
  overflow-y: auto;
  padding: var(--space-sm);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-background-secondary);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 10px;
  }
`;

export const EquationCard = styled(Card)`
  padding: var(--space-md);
  cursor: pointer;
  position: relative;
  animation: ${cardAppear} 0.3s ease-in-out;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid var(--color-border-light);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  .equation-name {
    font-weight: 600;
    margin-bottom: var(--space-xs);
    color: var(--color-title-card);
  }
  
  .equation-latex {
    background-color: var(--color-background-third);
    padding: var(--space-sm);
    border-radius: var(--border-radius-sm);
    margin: var(--space-sm) 0;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .equation-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-sm);
  }
  
  .equation-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-top: var(--space-sm);
  }
`;

export const EquationTag = styled.span`
  background-color: var(--color-background-third);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
`;

export const SelectedEquationsContainer = styled.div`
  margin-top: var(--space-md);
`;

export const SelectedEquation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-sm);
  animation: ${fadeIn} 0.3s ease-in-out;
  
  .equation-info {
    display: flex;
    flex-direction: column;
  }
  
  .equation-name {
    font-weight: 500;
  }
  
  .equation-latex {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
`;

export const EmptyState = styled.div`
  padding: var(--space-xl);
  text-align: center;
  color: var(--color-text-secondary);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  border: 1px dashed var(--color-border);
`;