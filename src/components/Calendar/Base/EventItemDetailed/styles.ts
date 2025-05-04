import styled from "styled-components";
import { constants } from "../../../../utils/consts";

export const DayDivider = styled.div`
  padding: ${constants.spacing.sm} 0;
  margin: ${constants.spacing.md} 0 ${constants.spacing.sm};
  border-bottom: 1px solid var(--color-border-light);
  position: relative;
`;

export const DayTitle = styled.h3`
  margin: 0;
  font-size: ${constants.fontSize.lg};
  color: var(--color-text);
  font-weight: 600;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--color-primary);
  }
`;

export const EventContainer = styled.div<{ eventType?: string; eventColor?: string }>`
  background-color: ${({ eventColor }) => eventColor ? `${eventColor}10` : 'var(--color-card)'};
  border-left: 3px solid ${({ eventType, eventColor }) => 
    eventColor || constants.colors.event[eventType as keyof typeof constants.colors.event]?.border || 'var(--color-primary)'};
  border-radius: var(--border-radius-md);
  padding: var(--space-sm) var(--space-md);
  margin-bottom: var(--space-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }
`;

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
  margin-bottom: ${constants.spacing.sm};
`;

export const EventTime = styled.span`
  font-size: ${constants.fontSize.sm};
  color: var(--color-text-secondary);
  background: rgba(0,0,0,0.05);
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  border-radius: ${constants.borderRadius.sm};
  display: flex;
  align-items: center;
  gap: ${constants.spacing.xs};
`;

export const EventTitle = styled.h4`
  margin: 0;
  font-size: ${constants.fontSize.md};
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
  flex-grow: 1;
`;

export const DetailsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${constants.spacing.md};
  margin-top: ${constants.spacing.sm};
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
  font-size: ${constants.fontSize.sm};
  color: var(--color-text-secondary);
`;

export const ParticipantsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${constants.spacing.xs};
`;

export const ParticipantBadge = styled.span<{ isTeacher?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.xs};
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  border-radius: ${constants.borderRadius.full};
  font-size: ${constants.fontSize.xs};
  background-color: ${({ isTeacher }) => 
    isTeacher ? 'var(--color-info-soft)' : 'var(--color-success-soft)'};
  color: ${({ isTeacher }) => 
    isTeacher ? 'var(--color-info)' : 'var(--color-success)'};
`;