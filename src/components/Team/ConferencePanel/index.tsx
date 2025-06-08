import React, { useState } from 'react';
import Modal from '../../modals/Modal';

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

/**
 * Componente para controle da conferência diária de alunos
 * Exibe estatísticas e permite finalizar a conferência
 * @param {string} conferenceDate - Data da conferência no formato YYYY-MM-DD
 * @param {number} checkedSeats - Número de assentos verificados
 * @param {number} mismatchedSeats - Número de assentos com discrepâncias
 * @param {number} absentees - Número de alunos faltantes
 * @param {function} onFinish - Callback ao finalizar conferência
 * @param {function} [onCancel] - Callback opcional ao cancelar
 */
const ConferencePanel: React.FC<ConferencePanelProps> = ({
  conferenceDate,
  checkedSeats,
  mismatchedSeats,
  absentees,
  onFinish,
  onCancel
}) => {

  const [showConfirmation, setShowConfirmation] = useState(false);


  const handleFinishAttempt = () => {
    if (checkedSeats === 0) {
      setShowConfirmation(true);
    } else {
      onFinish();
    }
  };

  return (
    <>
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
          <ActionButton onClick={handleFinishAttempt}>
            Finalizar Conferência
          </ActionButton>

          <CancelButton onClick={onCancel}>
            Cancelar
          </CancelButton>
        </div>
      </ConferenceControlPanel>
      {showConfirmation && (
        <Modal
          isOpen={showConfirmation}
          title="Finalizar Conferência"
          cancelText='Continuar Verificando'
          showFooter
          submitText='Sim, Finalizar'
          onSubmit={() => {
            setShowConfirmation(false);
            onFinish();
          }}
          onClose={() => setShowConfirmation(false)}
        >
            <h3>Nenhum aluno verificado</h3>
            <p>Deseja realmente finalizar sem verificar nenhum aluno?</p>
        </Modal>
      )}
    </>
  );
};

export default ConferencePanel;