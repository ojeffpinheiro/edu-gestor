import styled from "styled-components";
import { constants } from "../../../../utils/consts";

export const FilterSectionContainer = styled.div`
  background-color: ${constants.colors.background.secondary};
  border-radius: ${constants.borderRadius.md};
  padding: ${constants.spacing.md};
  margin-bottom: ${constants.spacing.lg};
`;

export const FilterSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${constants.spacing.sm};
  background-color: ${constants.colors.background.third};
  cursor: pointer;
  user-select: none;
`;

export const FilterSectionTitle = styled.div`
display: flex;
align-items: center;
gap: ${constants.spacing.sm}
`;

export const FilterSectionToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: ${constants.borderRadius.sm};
  background-color: ${constants.colors.background.secondary};
  cursor: pointer;
  transition: all ${constants.transitions.fast};

  &:hover {
    background-color: ${constants.colors.background.third};
    color: ${constants.colors.text.main};
  }

  transform: collapsedSections.allFilters ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: 'transform 0.2s'
`;