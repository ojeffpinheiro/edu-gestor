import { useState } from "react";
import { DailyVerification, LayoutConfig, SeatType } from "../utils/types/Team";
import { StudentFormData } from "../utils/types/BasicUser";
import { getSeatPosition } from "../utils/seatUtils";

interface UseSeatingOperationsProps {
  layout: LayoutConfig;
  showNotification: (message: string, type: string) => void;
  setLayout: (layout: LayoutConfig | ((prev: LayoutConfig) => LayoutConfig)) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setCurrentVerification: (verification: DailyVerification | ((prev: DailyVerification) => DailyVerification)) => void;
}

interface UseSeatingOperationsReturn {
  swapMode: boolean;
  firstSeatToSwap: SeatType | null;
  selectedStudent: StudentFormData | null;
  selectedSeat: SeatType | null;
  verifyMode: boolean;
  setSelectedStudent: (student: StudentFormData | null) => void;
  setSelectedSeat: (seat: SeatType | null) => void;
  setVerifyMode: (mode: boolean) => void;
  handleSeatClickForSwap: (seat: SeatType) => void;
  handleSeatClick: (seat: SeatType) => void;
  removeStudentFromSeat: (seatId: string) => void;
  handleSaveSeat: (updatedSeat: SeatType) => void;
  verifySeating: () => void;
  handleSeatVerification: (seatId: string) => void;
}

export const useSeatingOperations = ({
  layout,
  showNotification,
  setLayout,
  setIsModalOpen,
  setCurrentVerification
}: UseSeatingOperationsProps): UseSeatingOperationsReturn => {
  const [swapMode, setSwapMode] = useState(false);
  const [firstSeatToSwap, setFirstSeatToSwap] = useState<SeatType | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentFormData | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);
  const [verifyMode, setVerifyMode] = useState(false);

  const handleSeatClickForSwap = (seat: SeatType) => {
    if (!swapMode) return;

    if (!firstSeatToSwap) {
      // Select first seat for swapping
      setFirstSeatToSwap(seat);
      showNotification(`Assento ${getSeatPosition(seat.id, layout.seats)} selecionado para troca`, 'info');
    } else {
      // Perform the swap
      if (firstSeatToSwap.id === seat.id) {
        showNotification('Selecione um assento diferente para trocar', 'warning');
        return;
      }

      setLayout((prev: LayoutConfig) => {
        const updatedSeats = prev.seats.map(s => {
          if (s.id === firstSeatToSwap.id) {
            return { ...s, studentId: seat.studentId };
          }
          if (s.id === seat.id) {
            return { ...s, studentId: firstSeatToSwap.studentId };
          }
          return s;
        });

        return { ...prev, seats: updatedSeats };
      });

      setFirstSeatToSwap(null);
      setSwapMode(false);
      showNotification('Assentos trocados com sucesso!', 'success');
    }
  };

  const handleSeatClick = (seat: SeatType) => {
    if (verifyMode) {
      handleSeatVerification(seat.id);
      return;
    }

    if (swapMode) {
      handleSeatClickForSwap(seat);
      return;
    }

    if (selectedStudent && !seat.studentId) {
      setLayout((prev: LayoutConfig) => ({
        ...prev,
        seats: prev.seats.map(s => 
          s.id === seat.id ? { ...s, studentId: selectedStudent.id } : s
        )
      }));
      setSelectedStudent(null);
      showNotification(`Aluno ${selectedStudent.name} atribuído ao assento`, 'success');
    } else if (seat.studentId) {
      setSelectedSeat(seat);
      setIsModalOpen(true);
    }
  };

  const removeStudentFromSeat = (seatId: string) => {
    setLayout((prev: LayoutConfig) => ({
      ...prev,
      seats: prev.seats.map(seat => 
        seat.id === seatId ? { ...seat, studentId: undefined } : seat
      )
    }));
    setSelectedSeat(null);
    showNotification('Aluno removido do assento', 'success');
  };

  const handleSaveSeat = (updatedSeat: SeatType) => {
    setLayout((prev: LayoutConfig) => ({
      ...prev,
      seats: prev.seats.map(seat => 
        seat.id === updatedSeat.id ? updatedSeat : seat
      )
    }));
    setIsModalOpen(false);
    showNotification('Assento atualizado com sucesso', 'success');
  };

  const verifySeating = () => {
    setVerifyMode(!verifyMode);
    showNotification(
      verifyMode ? 'Modo de verificação desativado' : 'Modo de verificação ativado',
      'info'
    );
  };

  const handleSeatVerification = (seatId: string) => {
    setCurrentVerification((prev: DailyVerification) => {
      const updated = { ...prev };
      if (updated.verifiedSeats.includes(seatId)) {
        updated.verifiedSeats = updated.verifiedSeats.filter(id => id !== seatId);
      } else {
        updated.verifiedSeats = [...updated.verifiedSeats, seatId];
      }
      return updated;
    });

    setLayout((prev: LayoutConfig) => ({
      ...prev,
      seats: prev.seats.map(seat =>
        seat.id === seatId ? { ...seat, lastVerified: new Date().toISOString() } : seat
      )
    }));
  };

  return {
    swapMode,
    firstSeatToSwap,
    selectedStudent,
    selectedSeat,
    verifyMode,
    setSelectedStudent,
    setSelectedSeat,
    setVerifyMode,
    handleSeatClickForSwap,
    handleSeatClick,
    removeStudentFromSeat,
    handleSaveSeat,
    verifySeating,
    handleSeatVerification
  };
};