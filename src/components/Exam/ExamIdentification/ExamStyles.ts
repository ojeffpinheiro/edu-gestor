import styled, { css } from "styled-components";
import { BaseCard } from "../../../styles/baseComponents";
import { mobile } from "../../../styles/layoutUtils";

export const Container = styled.div`
  padding: var(--space-lg);
  border: 2px dashed var(--color-border);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background);
  box-shadow: var(--shadow-sm);

  
  ${mobile(css`
    flex-direction: column;
  `)}
`;

export const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: calc(-1 * var(--space-sm));
`;

export const Card = styled.div`
  padding: var(--space-sm);
  width: 100%;
  
  @media (min-width: var(--breakpoint-md)) {
    width: 50%;
  }
  
  @media (min-width: var(--breakpoint-lg)) {
    width: 33.333%;
  }
`;

export const CardContent = styled(BaseCard)`
  padding: var(--space-md);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export const InfoCard = styled(CardContent)`
  align-items: flex-start;
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
  font-weight: 600;
`;

export const CardDescription = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-top: var(--space-sm);
  text-align: center;
`;

export const InfoItem = styled.p`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
  font-size: var(--font-size-xs);
  
  strong {
    font-weight: 600;
    color: var(--color-text);
  }
`;