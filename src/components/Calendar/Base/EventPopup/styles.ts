import styled from "styled-components";
import { fadeIn, slideUp } from "../../../../styles/animations";
import { mixins } from "../../../../styles/mixins";

export const EventPopupContainer = styled.div<{ top?: number; left?: number; }>`
  position: fixed;
  top: ${props => props.top ? `${props.top}px` : '50%'};
  left: ${props => props.left ? `${props.left}px` : '50%'};
  transform: ${props => !props.top && !props.left ? 'translate(-50%, -50%)' : 'none'};
  z-index: 1000;
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-xl);
  width: 400px;
  max-width: 95vw;
  max-height: 80vh;
  overflow-y: auto;
  animation: ${fadeIn} 0.2s ease-out, ${slideUp} 0.3s ease-out;
`;

export const EventPopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  background-color: var(--color-background-third, #f7f9fc);
  color: var(--color-text-on-primary);
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
  height: 4rem;
`;

export const ExpandedDayView = styled.div`
  grid-column: 1 / -1;
  background-color: var(--color-background-secondary);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-md);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const EventPopup = styled.div`
  position: absolute;
  z-index: 10;
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  width: 35rem;
  max-width: 50vw;
  padding: var(--space-md);
  animation: ${slideUp} 0.2s ease-out;
`;

export const EventPopupTitle = styled.h2<{ eventType?: string; eventColor?: string; }>`
  margin: 0;
  font-size: var(--font-size-md);
  margin-bottom: var(--space-md);
    
    ${props => mixins.getEventStyles(props.eventType, props.eventColor)}
    
  background-color: transparent;
  border-color: transparent;
`;

export const EventPopupActions = styled.div`
  display: flex;
  gap: var(--space-sm);
  justify-content: flex-end;
`;

export const EventPopupActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-on-primary);
  transition: opacity 0.2s ease;
  font-size: var(--font-size-md);
  
  &:hover {
    opacity: 0.8;
  }
`;

export const EventPopupContent = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  padding: var(--space-md);
`;

export const ExpandAllDayButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-xs);
  margin-top: var(--space-xs);
  
  &:hover {
    text-decoration: underline;
  }
`;

export const EventDetailRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--space-md);
  gap: var(--space-sm);
`;

export const EventDetailIcon = styled.div`
  color: var(--color-primary);
  font-size: var(--font-size-md);
  margin-top: 2px;
`;

export const EventDetailText = styled.div`
  flex: 1;
`;

export const EventDetailTitle = styled.strong`
  display: block;
  margin-bottom: var(--space-xs);
  color: var(--color-text);
`;

export const EventDetailValue = styled.div`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

export const EventParticipants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
`;

export const ParticipantTag = styled.span`
  background-color: var(--color-background-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
`;