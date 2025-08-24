import { useCallback, useState } from 'react';
import { DailyVerification } from '../../types/classroom/Team';
import { useClassroom } from '../../contexts/ClassroomContext';

export const useConferenceMode = () => {
  const { state, dispatch } = useClassroom();
  const [checkedSeats, setCheckedSeats] = useState<string[]>([]);
  const [mismatchedSeats, setMismatchedSeats] = useState<string[]>([]);
  const [verificationHistory, setVerificationHistory] = useState<DailyVerification[]>([]);
  
  const startDailyConference = useCallback(() => {
    dispatch({ type: 'TOGGLE_VERIFY_MODE' });
    setCheckedSeats([]);
    setMismatchedSeats([]);
  }, []);
  
  const finishDailyConference = useCallback(() => {
    if (checkedSeats.length === 0) return;
    
    const newVerification: DailyVerification = {
      date: new Date().toISOString().split('T')[0],
      verifiedSeats: checkedSeats,
      mismatchedSeats: mismatchedSeats,
    };

    setVerificationHistory([...verificationHistory, newVerification]);
    dispatch({ type: 'TOGGLE_VERIFY_MODE' });
  }, [checkedSeats, mismatchedSeats, verificationHistory]);
  
  const onVerifySeat = useCallback((seatId: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCheckedSeats(prev => [...prev, seatId]);
      setMismatchedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      setMismatchedSeats(prev => [...prev, seatId]);
      setCheckedSeats(prev => prev.filter(id => id !== seatId));
    }
  }, []);

  return {
    conferenceMode: state.verifyMode,
    checkedSeats,
    mismatchedSeats,
    verificationHistory,
    startDailyConference,
    finishDailyConference,
    onVerifySeat,
  };
};