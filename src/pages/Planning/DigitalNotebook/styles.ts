import styled, { keyframes } from "styled-components";
import { cardAppear, slideUp, spin } from "../../../styles/animations";
import { BaseCard } from "../../../styles/baseComponents";

interface ColorProps {
  color?: string;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--space-lg);
  background-color: var(--color-background);
  min-height: 100vh;
  width: 84vw;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: var(--space-lg);
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xl);
  }
`;

export const ClassList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: var(--space-lg);
  width: 100%;
  margin-top: var(--space-lg);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const ClassCard = styled(BaseCard) <ColorProps>`
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-top: 4px solid ${props => props.color || 'var(--color-primary)'};
  position: relative;
  
  &.card-animated {
    animation: ${cardAppear} 0.5s ease forwards;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3), var(--shadow-md);
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  .subject-tag {
    background-color: ${props => props.color ? `${props.color}20` : 'var(--color-background-third)'};
    color: ${props => props.color || 'var(--color-primary)'};
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-sm);
    font-weight: 500;
    margin-top: var(--space-sm);
  }
  
  .details-tag {
    font-size: var(--font-size-xs);
    color: var(--color-text-third);
    margin-top: var(--space-xs);
  }
`;

export const IconWrapper = styled.div<ColorProps>`
  background: ${props => props.color || 'var(--color-primary)'};
  padding: var(--space-md);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--space-sm);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  
  ${ClassCard}:hover & {
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
  }
`;

export const ClassTitle = styled.h2`
  font-size: var(--font-size-lg);
  color: var(--color-title-card);
  margin-bottom: var(--space-sm);
  font-weight: 600;
`;

export const ClassDescription = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  line-height: 1.4;
`;

/* COMPONENTES DE FILTRO */

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  justify-content: center;
  width: 100%;
  margin-bottom: var(--space-md);
  padding: var(--space-md);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  animation: ${slideUp} 0.5s ease-out;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  flex: 1;
`;

export const FilterLabel = styled.label`
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
`;

export const FilterSelect = styled.select`
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background);
  font-size: var(--font-size-md);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
  
  &:hover {
    border-color: var(--color-primary);
  }
  
  option {
    padding: var(--space-sm);
  }
`;

export const FilterButton = styled.button`
  background-color: var(--color-background-third);
  color: var(--color-text-secondary);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  
  &:hover {
    background-color: var(--color-border);
    color: var(--color-text);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  margin: var(--space-xl) auto;
  border: 3px solid var(--color-background-third);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  color: var(--color-text-secondary);
  padding: var(--space-lg);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  margin: var(--space-lg) 0;
  width: 100%;
  max-width: 600px;
  animation: ${fadeIn} 0.5s ease;
`;

export const FilterBadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin: var(--space-md) 0;
  width: 100%;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;
`;

export const FilterBadge = styled.div<ColorProps>`
  display: flex;
  align-items: center;
  background-color: ${props => props.color ? `${props.color}20` : 'var(--color-background-third)'};
  border: 1px solid ${props => props.color ? `${props.color}40` : 'var(--color-border)'};
  color: ${props => props.color || 'var(--color-text-secondary)'};
  border-radius: var(--border-radius-xl);
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
  gap: var(--space-xs);
`;

export const FilterBadgeText = styled.span`
  white-space: nowrap;
`;

export const ClearFilterButton = styled.button`
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;