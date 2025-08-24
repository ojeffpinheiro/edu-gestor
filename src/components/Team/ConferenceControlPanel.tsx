import React from 'react';
import { useClassroom } from '../../contexts/ClassroomContext';
import { 
    ConferenceStats, 
    SettingsPanel, 
    StatItem,
    ConferenceControlPanel,
    StatLabel,
    StatValue,
} from '../../pages/Team/ClassroomLayoutPage/styles';
import ConferencePanel from './ConferencePanel';
import { ActionButton } from '../../styles/buttons';
import VerificationHistory from './VerificationHistory';
import { DailyVerification } from '../../types/classroom/Team';

interface Props {
    conferenceMode: boolean;
    checkedSeats: number[];
    mismatchedSeats: number[];
    verificationHistory: DailyVerification[];
    getSeatPosition: (seatId: string) => string;
    finishDailyConference: () => void;
    viewDayDetails: (day: DailyVerification) => void;
}

export const ConferenceControl: React.FC<Props> = ({ 
    conferenceMode,
    checkedSeats,
    mismatchedSeats,
    verificationHistory,
    getSeatPosition,
    viewDayDetails,
    finishDailyConference
}) => {
    const {
        state: { layout, studentList }
    } = useClassroom();

    return (
        <SettingsPanel>
            {conferenceMode && (
                <>
                    <ConferencePanel
                        conferenceDate={new Date().toISOString().split('T')[0]}
                        checkedSeats={checkedSeats.length}
                        mismatchedSeats={mismatchedSeats.length}
                        absentees={layout.seats.filter(s => s.studentId && !checkedSeats.includes(parseInt(s.id))).length}
                        onFinish={finishDailyConference}
                    />
                    <ConferenceControlPanel>
                        <h4>Conferência do Dia: {conferenceMode && new Date().toISOString().split('T')[0]}</h4>
                        <ConferenceStats>
                            <StatItem>
                                <StatLabel>Verificados:</StatLabel>
                                <StatValue>{checkedSeats.length}</StatValue>
                            </StatItem>
                            <StatItem>
                                <StatLabel>Divergências:</StatLabel>
                                <StatValue>{mismatchedSeats.length}</StatValue>
                            </StatItem>
                            <StatItem>
                                <StatLabel>Faltantes:</StatLabel>
                                <StatValue>{layout.seats.filter(s => s.studentId && !checkedSeats.includes(parseInt(s.id))).length}</StatValue>
                            </StatItem>
                        </ConferenceStats>

                        <ActionButton
                            onClick={finishDailyConference}
                        >
                            Finalizar Conferência
                        </ActionButton>
                    </ConferenceControlPanel>
                </>
            )}

            <VerificationHistory
                history={verificationHistory}
                viewDayDetails={viewDayDetails}
                seats={layout.seats}
                students={studentList}
                getSeatPosition={getSeatPosition}
            />
        </SettingsPanel>
    );
};