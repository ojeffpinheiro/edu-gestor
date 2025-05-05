import styled from "styled-components";
import { constants } from "../../../../utils/consts";

export const ActionButton = styled.button<{ color?: string }>`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.xs};
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  background-color: transparent;
  color: ${({ color }) => color || constants.colors.text.secondary};
  border: 1px solid constants.colors.border.light;
  border-radius: ${constants.borderRadius.sm};
  cursor: pointer;
  transition: all ${constants.transitions.fast};
  font-size: ${constants.fontSize.xs};

  &:hover {
    background-color: ${({ color }) => color ? `${color}20` : constants.colors.background.secondary};
  }
`;

export const EventActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${constants.spacing.sm};
`;


export const EventItem = styled.div`
  padding: ${constants.spacing.sm};
  margin-bottom: ${constants.spacing.xs};
  border-radius: ${constants.borderRadius.sm};
  background-color: ${constants.colors.background.secondary};
  transition: all ${constants.transitions.fast};
  
  &:hover {
    background-color: ${constants.colors.background.third};
  }
`;