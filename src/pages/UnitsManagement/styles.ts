import styled from "styled-components";
import { fadeIn } from "../../styles/animations";
import { Flex } from "../../styles/layoutUtils";
import { Input } from "../../styles/inputs";
import { Card } from "../../styles/card";

// Componentes estilizados específicos para esta página
export const UnitCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const UnitSymbol = styled.span`
  font-weight: bold;
  color: var(--color-primary);
  margin-left: var(--space-xs);
`;

export const CategoryBadge = styled.span`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-xs);
  display: inline-block;
  margin-bottom: var(--space-sm);
`;

export const BaseUnitBadge = styled.span`
  background-color: var(--color-success);
  color: var(--color-text-on-primary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-xs);
  display: inline-block;
  margin-left: var(--space-sm);
`;

export const UnitsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-lg);
`;

export const SearchBar = styled(Flex)`
  margin-bottom: var(--space-lg);
  
  ${Input} {
    max-width: 300px;
  }
`;

export const UnitCategoriesSection = styled.div`
  margin-top: var(--space-xl);
`;

export const ConversionCalculator = styled(Card)`
  margin-top: var(--space-xl);
  padding: var(--space-lg);
`;

export const ConversionResult = styled.div`
  margin-top: var(--space-md);
  padding: var(--space-md);
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-lg);
  font-weight: 500;
  text-align: center;
`;