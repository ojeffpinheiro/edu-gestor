// pages/Team/ClassroomLayoutPage/styles.ts
import styled, { css, keyframes } from 'styled-components';
import { PriorityType, SeatStatus } from '../../../types/classroom/Team';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface SeatContainerProps {
  onClick?: (e: React.MouseEvent) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  
  $hasStudent?: boolean;
  $isSelected?: boolean;
  $isHighlighted?: boolean;
  $isInvalid?: boolean;

  
  $priority?: PriorityType;
  $compactView?: boolean;
  $verifyMode?: boolean;
  $editMode?: boolean;
  
  $attendanceColor?: string;
  $conferenceMode?: boolean;
  $isChecked?: boolean;
  $isMismatched?: boolean;
}

export const SeatContainer = styled.div<SeatContainerProps>`
  border-radius: var(--border-radius-md);
  cursor: pointer;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all var(--transition-fast);
  position: relative;
  width: 10vw;
  padding: ${props => props.$compactView ? '8px' : '16px'};
  border: ${props => props.$editMode ? '2px dashed #ccc' : '1px solid #eee'};
  background-color: ${props => {
    if (props.$verifyMode) return '#fff8e1';
    return '#fff';
  }};
  
  background: ${props => props.$hasStudent ? '#e3f2fd' : '#f5f5f5'};
  border: 2px solid ${props => {
    if (props.$isInvalid) return '#f44336';
    if (props.$isHighlighted) return '#4a90e2';
    if (props.$isSelected) return '#2196f3';
    return '#e0e0e0';
  }};

  /* Ícone de prioridade */
  &::before {
    content: ${props => props.$priority ? `"${props.$priority}"` : '""'};
    color: #fff;
    background: #4a90e2;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 12px;
  }
  
  ${props => props.$hasStudent && `
    background: ${props.$attendanceColor || '#eee'};
    color: white;
  `}
  
  ${props => !props.$hasStudent && `
    background: #eee;
    color: var(--color-text);
  `}
  
  ${props => props.$isSelected && `
    border: 3px solid var(--color-primary);
    box-shadow: var(--shadow-focus);
    transform: scale(1.02);
  `}
  
  // Prioridades
  ${props => props.$priority === 'low_vision' && `
    &::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      width: 12px;
      height: 12px;
      background: #03A9F4;
      border-radius: 50%;
    }
  `}

  ${props => props.$conferenceMode && css`
    border: 2px solid ${props.$isChecked ? '#4CAF50' : props.$isMismatched ? '#F44336' : '#FFC107'};
    box-shadow: ${props.$isChecked ? '0 0 0 3px rgba(76, 175, 80, 0.3)' : 
      props.$isMismatched ? '0 0 0 3px rgba(244, 67, 54, 0.3)' : 'none'};
  `}
  
  ${props => props.$isChecked && css`
    &::after {
      content: '✓';
      position: absolute;
      top: 4px;
      right: 4px;
      color: #4CAF50;
      font-weight: bold;
      font-size: 16px;
    }
  `}
  
  ${props => props.$isMismatched && css`
    &::before {
      content: '!';
      position: absolute;
      top: 4px;
      left: 4px;
      color: #F44336;
      font-weight: bold;
      font-size: 16px;
      background: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
      @media (max-width: 768px) {
    height: 60px;
    padding: var(--space-sm);
  }
  `}
`;

interface StudentNameProps {
  $compactView?: boolean;
  $attendanceStatus?: SeatStatus;
}

export const StudentName = styled.div<StudentNameProps>`
  font-weight: var(--font-weight-medium);
  font-size: ${props => props.$compactView ? 'var(--font-size-xs)' : 'var(--font-size-sm)'};
  text-align: center;
  line-height: 1.2;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${props => props.$compactView ? 'nowrap' : 'normal'};

  color: ${props => {
    switch (props.$attendanceStatus) {
      case 'excellent':
      case 'good':
        return '#ffffff';
      case 'warning':
        return '#663c00';
      case 'critical':
        return '#ffffff';
      default:
        return '#333333';
    }
  }};
`;

interface AttendanceIndicatorProps {
  $attendanceStatus?: SeatStatus;
  $color?: string;
}

export const AttendanceIndicator = styled.div<AttendanceIndicatorProps>`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  margin-top: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-md);
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  color: ${props => {
    switch (props.$attendanceStatus) {
      case 'excellent':
      case 'good':
        return '#ffffff';
      case 'warning':
        return '#663c00';
      case 'critical':
        return '#ffffff';
      default:
        return '#666666';
    }
  }};
  backdrop-filter: blur(4px);
`;

interface EmptySeatLabelProps {
  $editMode?: boolean;
}

export const EmptySeatLabel = styled.div<EmptySeatLabelProps>`
  color: ${props => props.$editMode ? '#2196f3' : '#999999'};
  font-size: ${props => props.$editMode ? '10px' : '11px'};
  font-weight: ${props => props.$editMode ? '600' : '400'};
  text-align: center;
  opacity: ${props => props.$editMode ? '0.8' : '0.6'};
`;

interface PriorityIndicatorProps {
  color: string;
}

export const PriorityIndicator = styled.div<PriorityIndicatorProps>`
  position: absolute;
  top: -6px;
  left: -6px;
  width: 20px;
  height: 20px;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

export const SeatTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 1.4;
  white-space: nowrap;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }
`;

interface InteractionOverlayProps {
  editMode?: boolean;
  verifyMode?: boolean;
  isSelected?: boolean;
}

export const InteractionOverlay = styled.div<InteractionOverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  pointer-events: none;
  
  ${props => props.editMode && css`
    background: linear-gradient(45deg, transparent 30%, rgba(33, 150, 243, 0.1) 30%, rgba(33, 150, 243, 0.1) 70%, transparent 70%);
  `}
  
  ${props => props.verifyMode && props.isSelected && css`
    background: radial-gradient(circle, rgba(76, 175, 80, 0.2) 0%, transparent 70%);
  `}
`;

// Container principal para o layout da sala
export const ClassroomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  min-height: 100vh;
`;

export const ClassroomGrid = styled.div<{ rows: number; columns: number; compactView?: boolean }>`
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, 1fr);
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: ${props => props.compactView ? '8px' : '12px'};
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 20px 0;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
`;

export const LegendColor = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${props => props.color};
`;