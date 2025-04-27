import styled from "styled-components";
import { constants } from "../utils/consts";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${constants.spacing.lg};
`;

export const PaginationInfo = styled.div`
  color: ${constants.colors.text.secondary};
  font-size: ${constants.fontSize.sm};
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
`;

export const PageButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${constants.borderRadius.full};
  border: 1px solid ${props => props.active ? constants.colors.primary : constants.colors.border};
  background-color: ${props => props.active ? constants.colors.primary : constants.colors.background.secondary};
  color: ${props => props.active ? constants.colors.text.onPrimary : constants.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? constants.colors.primary : constants.colors.background.third};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${constants.colors.background.third};
  }
`;