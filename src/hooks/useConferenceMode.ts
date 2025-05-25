import { useCallback, useState } from "react";
import { DailyVerification, LayoutConfig, SeatType } from "../utils/types/Team";

interface UseConferenceModeProps {
  showNotification: (message: string, type: string) => void;
  setVerifyMode: (active: boolean) => void;
  setLayout: (layout: LayoutConfig | ((prev: LayoutConfig) => LayoutConfig)) => void;
}

export const useConferenceMode = ({
  showNotification,
  setVerifyMode,
  setLayout
}: UseConferenceModeProps) => {
  const [conferenceMode, setConferenceMode] = useState(false);
  const [conferenceDate, setConferenceDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkedSeats, setCheckedSeats] = useState<string[]>([]);
  const [mismatchedSeats, setMismatchedSeats] = useState<string[]>([]);
  const [verificationHistory, setVerificationHistory] = useState<DailyVerification[]>([]);

  const startDailyConference = () => {
    setConferenceMode(true);
    setCheckedSeats([]);
    setMismatchedSeats([]);
    setConferenceDate(new Date().toISOString().split('T')[0]);
    showNotification('Modo conferência ativado. Verifique os alunos presentes.', 'info');
  };

  const finishDailyConference = () => {
    if (checkedSeats.length === 0) {
      showNotification('Nenhum aluno foi verificado. Deseja mesmo finalizar?', 'warning');
      return;
    }

    const newVerification: DailyVerification = {
      date: conferenceDate,
      verifiedSeats: checkedSeats,
      mismatchedSeats: mismatchedSeats
    };

    setVerificationHistory([...verificationHistory, newVerification]);
    setConferenceMode(false);
    showNotification(`Conferência do dia ${conferenceDate} salva com sucesso!`, 'success');
  };

  const onVerifySeat = useCallback((seatId: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCheckedSeats(prev => [...prev, seatId]);
      setMismatchedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      setMismatchedSeats(prev => [...prev, seatId]);
      setCheckedSeats(prev => prev.filter(id => id !== seatId));
    }
  }, []);

  const viewDayDetails = (day: DailyVerification) => {
    showNotification(
      `Em ${day.date}: ${day.verifiedSeats.length} alunos verificados`, 
      'info'
    );

    // Atualização correta do layout
    setLayout((prev: LayoutConfig) => {
      const updatedSeats = prev.seats.map((seat: SeatType) => ({
        ...seat,
        isHighlighted: day.verifiedSeats.includes(seat.id)
      }));
      
      return {
        rows: prev.rows,
        columns: prev.columns,
        seats: updatedSeats
      };
    });
  };

  return {
    conferenceMode,
    conferenceDate,
    checkedSeats,
    mismatchedSeats,
    verificationHistory,
    startDailyConference,
    finishDailyConference,
    onVerifySeat,
    viewDayDetails
  };
};