import React from 'react';
import { FaPlus } from 'react-icons/fa';

import { Title } from '../../../../../styles/typography';
import { AddButton, ScheduleHeaderContent } from './styles';

interface ScheduleHeaderProps {
  onAddClick: () => void;
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ onAddClick }) => {
  return (
    <ScheduleHeaderContent>
      <Title style={{ margin: 0 }}>Grade de Horários</Title>
      <AddButton onClick={onAddClick}>
        <FaPlus /> Adicionar Aula
      </AddButton>
    </ScheduleHeaderContent>
  );
};

export default ScheduleHeader;