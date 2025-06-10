import { transparentize } from "polished";
import styled from "styled-components";
import { ItemType } from "../communStyles";

export const NavItem = styled.div<{ 
  level: number; 
  isSelected: boolean; 
  isHigherLevel: boolean 
}>`
  padding: var(--space-sm) var(--space-md);
  padding-left: ${props => `calc(${props.level} * var(--space-lg) + var(--space-md))`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: var(--color-text);
  border-left: 3px solid transparent;
  transition: all var(--transition-fast);
  margin: var(--space-xs) 0;
  border-radius: var(--border-radius-md);
  
  ${props => props.isSelected && `
    background-color: var(--color-primary-hover);
    border-left-color: var(--color-primary);
    color: var(--color-text-on-primary);
    
    ${ItemType} {
      color: var(--color-text-on-primary);
      background-color: ${transparentize(0.7, props.theme.colors.primary)};
    }
  `}
  
  ${props => props.isHigherLevel && !props.isSelected && `
    font-weight: var(--font-weight-medium);
  `}
  
  &:hover {
    background-color: var(--color-button);
  }
`;

export const ItemLabel = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ExpandButton = styled.span`
  display: inline-flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
  
  &:hover {
    color: var(--color-primary);
    background-color: var(--color-button);
  }
`;

export const ItemIcon = styled.span`
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  min-width: 24px;
`;