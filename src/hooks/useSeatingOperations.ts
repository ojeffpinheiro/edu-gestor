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

/**
 * Hook para gerenciar operações de assentos na sala de aula.
 * Permite trocar assentos, atribuir alunos, verificar presença e editar detalhes do assento.
 * 
 * @param {LayoutConfig} layout - Configuração atual do layout da sala de aula.
 * @param {function} showNotification - Função para exibir notificações ao usuário.
 * @param {function} setLayout - Função para atualizar o layout da sala.
 * @param {function} setIsModalOpen - Função para abrir/fechar o modal de edição de assento.
 * @param {function} setCurrentVerification - Função para atualizar a verificação diária.
 * 
 * @returns {UseSeatingOperationsReturn} Objeto com estados e funções para manipulação dos assentos.
 */
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

  /**
   * Lida com o clique em um assento no modo de troca.
   * Seleciona o primeiro assento ou realiza a troca se o segundo for selecionado.
   * 
   * @param {SeatType} seat - Assento clicado.
   * @returns {void}
   */
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

  /**
   * Lida com o clique em um assento.
   * Atribui aluno, edita ou troca assento, ou ativa verificação dependendo do modo.
   * 
   * @param {SeatType} seat - Assento clicado.
   * @returns {void}
   */
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

  /**
   * Remove o aluno atribuído a um assento. 
   * @param {string} seatId - ID do assento.
   * @returns {void}
   */
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

  /**
 * Salva as alterações feitas em um assento.
 * 
 * @param {SeatType} updatedSeat - Dados atualizados do assento.
 * @returns {void}
 */
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

  /**
   * @function verifySeating
   * @description Ativa ou desativa o modo de verificação de presença.
   * Permite ao usuário verificar a presença dos alunos nos assentos.
   * Exibe uma notificação informando o estado atual do modo de verificação.
   * @throws {Error} Se ocorrer um erro ao alternar o modo de verificação.
   * Se o modo de verificação estiver ativo, desativa-o e exibe uma notificação.
   * Se o modo de verificação estiver inativo, ativa-o e exibe uma notificação.
   * 
   */
  const verifySeating = () => {
    setVerifyMode(!verifyMode);
    showNotification(
      verifyMode ? 'Modo de verificação desativado' : 'Modo de verificação ativado',
      'info'
    );
  };

  /**
 * Alterna a verificação de presença de um assento.
 * Atualiza o histórico e o layout.
 * 
 * @param {string} seatId - ID do assento a ser verificado.
 * @returns {void}
 */
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