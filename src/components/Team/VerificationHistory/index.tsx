import React, { useMemo, useState } from 'react';
import { FiEye, FiCalendar } from "react-icons/fi";
import { DailyVerification, SeatType } from '../../../types/classroom/Team';
import { StudentFormData } from '../../../utils/types/BasicUser';
import {
    DetailButton,
    HistoryContainer,
    HistoryCount,
    HistoryDate,
    HistoryDay,
    HistoryList,
    MismatchItem,
    MismatchList,
    EmptyState
} from './styles';

interface Props {
    history: DailyVerification[];
    seats: SeatType[];
    students: StudentFormData[];
    getSeatPosition: (seatId: string) => string;
    viewDayDetails: (day: DailyVerification) => void;
}

const VerificationHistory: React.FC<Props> = ({
    history,
    seats,
    students,
    viewDayDetails,
    getSeatPosition
}) => {
    const [dateFilter, setDateFilter] = useState('')

    const getStudentName = (studentId?: number): string => {
        if (!studentId) return 'N/A';
        const student = students.find(s => s.id === studentId);
        return student ? student.name : 'Aluno não encontrado';
    };

    const filteredHistory = useMemo(() => {
        return history.filter(day =>
            day.date.includes(dateFilter)
        );
    }, [history, dateFilter]);

    return (
        <HistoryContainer>
            <h3>Histórico de Conferência</h3>

            {/* Adicionar campo de filtro por data */}
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Filtrar por data (YYYY-MM-DD)"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
            </div>

            <HistoryList>
                {filteredHistory.length === 0 ? (
                    <EmptyState> {/* 4. Usar o componente EmptyState */}
                        <FiCalendar size={32} />
                        <p>Nenhum registro de conferência encontrado</p>
                        {dateFilter && (
                            <button onClick={() => setDateFilter('')}>
                                Limpar filtro
                            </button>
                        )}
                    </EmptyState>
                ) : (
                    filteredHistory.map((day, index) => (
                        <HistoryDay key={index} onClick={() => viewDayDetails(day)}>
                            <div>
                                <HistoryDate>{day.date}</HistoryDate>
                                <HistoryCount>
                                    {day.verifiedSeats.length} verificados •
                                    {(day.mismatchedSeats?.length ?? 0)} divergências
                                </HistoryCount>
                                {day.mismatchedSeats && day.mismatchedSeats.length > 0 && (
                                    <MismatchList>
                                        {day.mismatchedSeats.map(seatId => {
                                            const seat = seats.find(s => s.id === seatId);
                                            return (
                                                <MismatchItem key={seatId}>
                                                    {getStudentName(seat?.studentId)} ({getSeatPosition(seatId)})
                                                </MismatchItem>
                                            );
                                        })}
                                    </MismatchList>
                                )}
                            </div>
                            <DetailButton onClick={(e) => {
                                e.stopPropagation();
                                viewDayDetails(day);
                            }}>
                                <FiEye size={16} />
                            </DetailButton>
                        </HistoryDay>
                    ))
                )}
            </HistoryList>
        </HistoryContainer>
    );
};

export default VerificationHistory;