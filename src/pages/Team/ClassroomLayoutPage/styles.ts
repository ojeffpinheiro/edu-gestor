import styled, { css } from "styled-components";

export const ContentContainer = styled.div`
  margin-top: 2rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const StudentItem = styled.div<{ isDragging: boolean; isSelected: boolean }>`
  padding: 0.75rem;
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.isSelected ? 'var(--color-primary)' : 'var(--color-background-secondary)'};
  color: ${props => props.isSelected ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  cursor: grab;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  user-select: none;
  
  &:hover {
    background-color: ${props => props.isSelected ? 'var(--color-primary-hover)' : 'var(--color-background-third)'};
  }
`;

export const SeatContainer = styled.div<{ 
  hasStudent: boolean; 
  isSelected: boolean; 
  attendanceColor?: string;
  priority: 'low-vision' | 'intellectual-disability' | 'good-pair' | null;
  verification: boolean;
  isHighlighted?: boolean;
}>`
  padding: 1rem;
  border-radius: var(--border-radius-md);
  background-color: ${props => {
    if (props.hasStudent) {
      return props.attendanceColor;
    }
    
    if (props.priority === 'low-vision') return '#03A9F4';
    if (props.priority === 'intellectual-disability') return '#9C27B0';
    if (props.priority === 'good-pair') return '#FF9800';
    
    return 'var(--color-background-secondary)';
  }};
  color: ${props => props.hasStudent ? 'white' : 'var(--color-text)'};
  cursor: pointer;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: ${props => props.isSelected ? '3px solid var(--color-primary)' : 'none'};
  position: relative;
  
  ${props => props.verification && `
    &::after {
      content: '✓';
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 20px;
      color: white;
      text-shadow: 0 0 2px black;
      font-weight: bold;
    }
  `}

  ${props => props.onDoubleClick && css`
    &:active {
      transform: scale(0.98);
    }
  `}
  ${props => props.isHighlighted && css`
    box-shadow: 0 0 0 3px #ffeb3b;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(255, 235, 59, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(255, 235, 59, 0); }
      100% { box-shadow: 0 0 0 0 rgba(255, 235, 59, 0); }
    }
  `}
`;

export const StudentName = styled.div`
  font-weight: 500;
  font-size: var(--font-size-sm);
  margin-bottom: 0.25rem;
  word-break: break-word;
`;

export const AttendanceIndicator = styled.div`
  font-size: var(--font-size-xs);
  font-weight: 500;
`;

export const EmptySeatLabel = styled.div`
  opacity: 0.5;
`;

export const DropHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius-md);
  z-index: 10;
`;

export const SettingsPanel = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  
  h3 {
    margin-bottom: 1rem;
  }
`;

export const SeatDetails = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    margin-bottom: 0.5rem;
  }
`;

export const SeatActions = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PriorityOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const PriorityLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input {
    cursor: pointer;
  }
`;

export const LegendContainer = styled.div`
  margin-top: 2rem;
  
  h4 {
    margin-bottom: 0.5rem;
  }
`;

export const LegendItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
    background-color: ${props => props.color};
    border-radius: var(--border-radius-sm);
  }
`;

export const ConferenceControlPanel = styled.div`
  background: #f8f9fa;
  border-radius: var(--border-radius-md);
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
`;

export const ConferenceStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

export const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

// Add these styles to the existing file
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;

  h3 {
    margin-top: 0;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin: 1rem 0;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:first-child {
      background-color: #f0f0f0;
    }

    &:last-child {
      background-color: var(--color-primary);
      color: white;
    }
  }
`;

export const LayoutList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 1px solid #eee;

    div:first-child {
      display: flex;
      flex-direction: column;

      strong {
        margin-bottom: 0.25rem;
      }

      span {
        font-size: 0.8rem;
        color: #666;
      }
    }

    div:last-child {
      display: flex;
      gap: 0.5rem;

      button {
        padding: 0.25rem 0.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:first-child {
          background-color: var(--color-primary);
          color: white;
        }

        &.delete-btn {
          background-color: #f44336;
          color: white;
        }
      }
    }
  }
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--color-border-light);
  min-width: 250px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export const ClearSearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
  line-height: 1;

  &:hover {
    color: #333;
  }
`;