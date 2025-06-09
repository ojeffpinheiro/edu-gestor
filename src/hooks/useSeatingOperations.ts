import { useCallback } from 'react';
import { useClassroom } from '../contexts/ClassroomContext';
import { SeatType } from '../utils/types/Team';
import { StudentFormData } from '../utils/types/BasicUser';

export const useSeatOperations = () => {
  const { state, dispatch } = useClassroom();

  const handleSeatClick = useCallback((seat: SeatType) => {
    if (state.verifyMode) {
      // Handle verification logic
      return;
    }

    if (state.swapMode) {
      // Handle swap logic
      return;
    }

    if (state.selectedStudent && !seat.studentId) {
      // Assign student to seat
      const updatedSeat = { ...seat, studentId: state.selectedStudent.id };
      dispatch({ type: 'UPDATE_SEAT', payload: updatedSeat });
      dispatch({ type: 'SET_SELECTED_STUDENT', payload: null });
    } else if (seat.studentId) {
      // Select seat for editing
      dispatch({ type: 'SET_SELECTED_SEAT', payload: seat });
    }
  }, [state.verifyMode, state.swapMode, state.selectedStudent]);

  const removeStudentFromSeat = useCallback((seatId: string) => {
    const updatedSeat = state.layout.seats.find(seat => seat.id === seatId);
    if (updatedSeat) {
      dispatch({ type: 'UPDATE_SEAT', payload: { ...updatedSeat, studentId: undefined } });
    }
    dispatch({ type: 'SET_SELECTED_SEAT', payload: null });
  }, [state.layout.seats]);

  const handleSaveSeat = useCallback((updatedSeat: SeatType) => {
    dispatch({ type: 'UPDATE_SEAT', payload: updatedSeat });
    dispatch({ type: 'SET_SELECTED_SEAT', payload: null });
  }, []);

  return {
    handleSeatClick,
    removeStudentFromSeat,
    handleSaveSeat,
    setSelectedStudent: (student: StudentFormData | null) => 
      dispatch({ type: 'SET_SELECTED_STUDENT', payload: student }),
  };
};