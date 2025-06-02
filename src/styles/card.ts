import styled from "styled-components";
import { cardAppear } from "./animations";
import { BaseCard } from "./baseComponents";
import { constants } from "../utils/consts";

interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive';
  padding?: keyof typeof constants.spacing | string;
  animated?: boolean;
  elevation?: "none" | "low" | "medium" | "high";
  background?: keyof typeof constants.colors | string;
  border?: boolean;
  borderTop?: string;
  borderRadius?: keyof typeof constants.borderRadius | string;
}

const getShadow = (elevation: CardProps["elevation"]) => {
  switch (elevation) {
    case "none": return "none";
    case "low": return constants.shadows.sm;
    case "high": return constants.shadows.lg;
    case "medium":
    default: return constants.shadows.md;
  }
};

export const HoverCard = styled(BaseCard)`
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }
`;

export const SelectableCard = styled(HoverCard)`
  cursor: pointer;
  border: 2px solid transparent;
  
  &.selected {
    border-color: var(--color-primary);
    background-color: var(--color-background-third);
  }
`;

export const Card = styled.div<CardProps>`
  margin-bottom: 1.5rem;
  gap: var(--space-xs);
  box-shadow: ${props => getShadow(props.elevation || 'medium')};
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  border: ${props => props.border ? `1px solid ${constants.colors.border}` : "none"};
  border-top: ${props => props.borderTop || "none"};
  overflow: hidden;
  animation: ${props => props.animated ? `${cardAppear} 0.5s ease forwards` : "none"};
  
  ${props => {
    switch (props.variant) {
      case 'elevated':
        return `
          box-shadow: var(--shadow-md);
        `;
      case 'bordered':
        return `
          border: 1px solid var(--color-border-light);
        `;
      case 'interactive':
        return `
          display: flex;
          flex-direction: row;
  align-items: center;
  justify-content: center;
  background: var(--color-card);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  &:hover {
    background: var(--color-primary-hover);
    color: var(--color-text-third);
  }

  svg {
    margin-bottom: var(--space-sm);
  }

  span {
    font-size: var(--font-size-md);
    font-weight: bold;
  }
        `;
      default:
        return `
          box-shadow: var(--shadow-sm);
        `;
    }
  }}
  
  padding: ${props =>
    props.padding
      ? (constants.spacing[props.padding as keyof typeof constants.spacing] || props.padding)
      : constants.spacing.md
  };
  background-color: ${props =>
    props.background
      ? (constants.colors[props.background as keyof typeof constants.colors] || props.background)
      : constants.colors.background.secondary
  };
  border-radius: ${props =>
    props.borderRadius
      ? (constants.borderRadius[props.borderRadius as keyof typeof constants.borderRadius] || props.borderRadius)
      : constants.borderRadius.md
  };
  
  border: ${props => props.border ? `1px solid ${constants.colors.border}` : "none"};
  border-top: ${props => props.borderTop || "none"};
  transition: all 0.3s ease;
  animation: ${props => props.animated ? `${cardAppear} 0.5s ease forwards` : "none"};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.elevation === "none" ? "none" : constants.shadows.md};
  }

  span {
    margin: 1rem;
  }
`;

export const CardHeader = styled.div`
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
        margin: 0;
        font-size: 1.1rem;
    }
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-title-card);
`;

export const CardContent = styled.div`
  padding: var(--space-md);
`;

export const CardFooter = styled.div`
  padding: var(--space-md);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  align-items: center;
  margin-top: ${constants.spacing.md};
  padding-top: ${constants.spacing.sm};
  border-top: 1px solid ${constants.colors.border.light};
`;

export const CardBody = styled.div`
    p {
        margin: var(--space-xs) 0;
        color: var(--color-text-secondary);
    }
`;

export const StyledCard = styled.div<{ $fullWidth?: boolean }>`
  background: var(--color-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  .card-header {
    border-bottom: 1px solid var(--color-border-light);
    padding-bottom: 1rem;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;