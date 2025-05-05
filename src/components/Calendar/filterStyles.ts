// styles/filterStyles.ts
import styled from "styled-components";
import { constants } from "../../utils/consts";

const activeFilterOpacity = '0.9';
const inactiveFilterOpacity = '0.4';

export const FiltersContainer = styled.div`
  background-color: ${constants.colors.background.secondary};
  border-radius: ${constants.borderRadius.md};
  padding: ${constants.spacing.md};
  margin-bottom: ${constants.spacing.lg};
`;

export const FilterButton = styled.button<{ 
  color: string;
  isActive: boolean;
}>`
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  background-color: ${props => props.isActive ? `${props.color}20` : 'transparent'};
  color: ${props => props.isActive ? props.color : constants.colors.text.secondary};
  border: 1px solid ${props => props.isActive ? props.color : constants.colors.border.light};
  border-radius: ${constants.borderRadius.md};
  cursor: pointer;
  transition: all ${constants.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${constants.spacing.xs};
  font-size: ${constants.fontSize.sm};
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  opacity: ${props => props.isActive ? activeFilterOpacity : inactiveFilterOpacity};
  max-height: 2rem;
  min-width: 10vw;

  &:hover {
    background-color: ${props => `${props.color}10`};
    opacity: ${activeFilterOpacity};
  }
`;