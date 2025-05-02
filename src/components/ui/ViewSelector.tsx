import React from 'react';
import styled from 'styled-components';
import { useCalendar } from '../../contexts/CalendarContext';

const ButtonGroup = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const Button = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${props => props.active ? '#1890ff' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  
  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }
`;

const ViewSelector: React.FC = () => {
  const { view, setView } = useCalendar();

  return (
    <ButtonGroup>
      <Button active={view === 'month'} onClick={() => setView('month')}>
        Mês
      </Button>
      <Button active={view === 'week'} onClick={() => setView('week')}>
        Semana
      </Button>
      <Button active={view === 'day'} onClick={() => setView('day')}>
        Dia
      </Button>
    </ButtonGroup>
  );
};

export default ViewSelector;