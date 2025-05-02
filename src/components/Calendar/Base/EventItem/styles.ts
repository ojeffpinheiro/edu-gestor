import styled from "styled-components";

export const EventContainer = styled.div<{ type: string; compact: boolean }>`
  padding: ${props => props.compact ? '2px 4px' : '4px 8px'};
  margin: 2px 0;
  border-radius: 4px;
  font-size: ${props => props.compact ? '0.8rem' : '0.9rem'};
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  ${({ type }) => {
    switch (type) {
      case 'class': return 'background-color: #d4edda; color: #155724;';
      case 'meeting': return 'background-color: #bbdefb; color: #0d47a1;';
      case 'deadline': return 'background-color: #ffccbc; color: #bf360c;';
      case 'holiday': return 'background-color: #d1c4e9; color: #4527a0;';
      default: return 'background-color: #e1f5fe; color: #0288d1;';
    }
  }}
  
  &:hover {
    opacity: 0.9;
  }
`;

export const TimeLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  margin-right: 0.5rem;
`;

export const EventTitle = styled.span`
  font-weight: 500;
`;