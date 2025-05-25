import React from 'react';
import { FiEye } from "react-icons/fi";
import { DailyVerification, SeatType } from '../../../utils/types/Team';
import { StudentFormData } from '../../../utils/types/BasicUser';
import { 
    DetailButton, 
    HistoryContainer, 
    HistoryCount, 
    HistoryDate, 
    HistoryDay, 
    HistoryList, 
    MismatchItem, 
    MismatchList
} from './styles';

interface Props {
    history: DailyVerification[];
    viewDayDetails: (day: DailyVerification) => void;
    seats: SeatType[];
    students: StudentFormData[];
}

const VerificationHistory: React.FC<Props> = ({ 
    history, 
    seats, 
    students,
    viewDayDetails, 
}) => {
    const getStudentName = (studentId?: number): string => {
        if (!studentId) return 'N/A';
        const student = students.find(s => s.id === studentId);
        return student ? student.name : 'Aluno não encontrado';
    };
    
    const getSeatPosition = (seatId: string): string => {
        const seat = seats.find(s => s.id === seatId);
        return seat ? `F${seat.position.row + 1}C${seat.position.column + 1}` : '';
    };

    return (
        <HistoryContainer>
            <h3>Histórico de Conferência</h3>
            <HistoryList>
                {history.map((day, index) => (
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
                ))}
            </HistoryList>
        </HistoryContainer>
    );
};

export default VerificationHistory;