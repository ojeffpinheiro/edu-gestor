// styles/eventStyles.ts
import styled from "styled-components";
import { constants } from "../../utils/consts";

export const EventItemBase = styled.div`
  padding: ${constants.spacing.sm};
  margin-bottom: ${constants.spacing.xs};
  border-radius: ${constants.borderRadius.sm};
  background-color: ${constants.colors.background.secondary};
  transition: all ${constants.transitions.fast};
  
  &:hover {
    background-color: ${constants.colors.background.third};
  }
`;

export const EventPopupContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  top: ${props => props.visible ? '50%' : '-100%'};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${constants.zIndex.modal};
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background: ${constants.colors.background.main};
  border-radius: ${constants.borderRadius.md};
  box-shadow: ${constants.shadows.md};
  padding: ${constants.spacing.md};
  transition: top ${constants.transitions.normal};
`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${constants.spacing.sm};
  margin-bottom: ${constants.spacing.sm};
  border-bottom: 1px solid ${constants.colors.border.light};
`;