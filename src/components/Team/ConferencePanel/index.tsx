import React from 'react';
import { ActionButton, CancelButton } from '../../../styles/buttons';
import { 
    ConferenceControlPanel, 
    ConferenceStats, 
    StatItem,
    StatLabel,
    StatValue
 } from './styles';

interface ConferencePanelProps {
  conferenceDate: string;
  checkedSeats: number;
  mismatchedSeats: number;
  absentees: number;
  onFinish: () => void;
  onCancel?: () => void;
}

const ConferencePanel: React.FC<ConferencePanelProps> = ({
  conferenceDate,
  checkedSeats,
  mismatchedSeats,
  absentees,
  onFinish,
  onCancel
}) => {
  return (
    <ConferenceControlPanel>
      <h4>Conferência do Dia: {conferenceDate}</h4>
      <ConferenceStats>
        <StatItem>
          <StatLabel>Verificados:</StatLabel>
          <StatValue>{checkedSeats}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Divergências:</StatLabel>
          <StatValue>{mismatchedSeats}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Faltantes:</StatLabel>
          <StatValue>{absentees}</StatValue>
        </StatItem>
      </ConferenceStats>

      <div style={{ display: 'flex', gap: '8px' }}>
        {onCancel && (
          <CancelButton 
            onClick={onCancel}>
            Cancelar
          </CancelButton>
        )}
        <ActionButton onClick={onFinish}>
          Finalizar Conferência
        </ActionButton>
      </div>
    </ConferenceControlPanel>
  );
};

export default ConferencePanel;