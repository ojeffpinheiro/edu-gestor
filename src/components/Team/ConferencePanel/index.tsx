/* 
    // Painel de controle da conferência
- Props: conferenceMode, conferenceDate, checkedSeats, 
  mismatchedSeats, layout, onFinish, onCancel
- Render do ConferenceControlPanel
- Render das ConferenceStats
**/
import React from 'react'
import { ConferenceControlPanel, ConferenceStats, StatItem, StatLabel, StatValue } from "./styles";
import { ActionButton } from '../../../styles/buttons';

interface Props {
    conferenceMode: boolean;
    checkedSeats: number;
    mismatchedSeats: number;
    absentees: number;
    onFinish: () => void;
}

const ConferencePanel: React.FC<Props> = ({
    conferenceMode,
    checkedSeats,
    mismatchedSeats,
    absentees,
    onFinish,
}) => {
    return (
        <ConferenceControlPanel>
            <h4>Conferência do Dia: {conferenceMode && new Date().toISOString().split('T')[0]}</h4>
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

            <ActionButton
                onClick={onFinish}
            >
                Finalizar Conferência
            </ActionButton>
        </ConferenceControlPanel>
    )
}

export default ConferencePanel;