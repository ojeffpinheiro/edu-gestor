import React from 'react';
import { DailyVerification, SeatType } from '../../../utils/types/Team';
import { StudentFormData } from '../../../utils/types/BasicUser';
import {
  HistoryContainer,
  HistoryItem,
  HistoryHeader,
  HistoryDetails,
  VerificationBadge,
  AbsenceList,
  MismatchList
} from './styles';

interface ConferenceHistoryProps {
  history: DailyVerification[];
  students: StudentFormData[];
  seats: SeatType[];
}

const ConferenceHistory: React.FC<ConferenceHistoryProps> = ({
  history,
  students,
  seats
}) => {
  const getStudentName = (id?: number) => {
    if (!id) return 'N/A';
    const student = students.find(s => s.id === id);
    return student ? student.name : 'Aluno não encontrado';
  };

  const getSeatPosition = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    return seat ? `F${seat.position.row + 1}C${seat.position.column + 1}` : 'N/A';
  };

  return (
    <HistoryContainer>
      <h2>Histórico de Conferências</h2>
      {history.map((record, index) => (
        <HistoryItem key={index}>
          <HistoryHeader>
            <h3>{new Date(record.date).toLocaleDateString()}</h3>
            <VerificationBadge>
              {record.verifiedSeats.length} verificados
            </VerificationBadge>
          </HistoryHeader>
          
          <HistoryDetails>
            {record.absentees?.length > 0 && (
              <AbsenceList>
                <h4>Ausentes:</h4>
                {record.absentees.map(seatId => {
                  const seat = seats.find(s => s.id === seatId);
                  return (
                    <li key={seatId}>
                      {getStudentName(seat?.studentId)} ({getSeatPosition(seatId)})
                    </li>
                  );
                })}
              </AbsenceList>
            )}

            {record.mismatchedSeats?.length > 0 && (
              <MismatchList>
                <h4>Discrepâncias:</h4>
                {record.mismatchedSeats.map(seatId => {
                  const seat = seats.find(s => s.id === seatId);
                  return (
                    <li key={seatId}>
                      {getStudentName(seat?.studentId)} ({getSeatPosition(seatId)})
                    </li>
                  );
                })}
              </MismatchList>
            )}
          </HistoryDetails>
        </HistoryItem>
      ))}
    </HistoryContainer>
  );
};

export default ConferenceHistory;