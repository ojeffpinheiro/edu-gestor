// services/reportService.ts
import { DailyVerification, SeatType } from '../utils/types/Team';
import { StudentFormData } from '../utils/types/BasicUser';

export const generateAttendanceReport = (
  verification: DailyVerification,
  students: StudentFormData[],
  seats: SeatType[]
) => {
  const presentStudents = verification.verifiedSeats
    .map(seatId => seats.find(s => s.id === seatId)?.studentId)
    .map(studentId => students.find(s => s.id === studentId))
    .filter(Boolean);

  const absentStudents = (verification.absentees || [])
    .map(seatId => seats.find(s => s.id === seatId)?.studentId)
    .map(studentId => students.find(s => s.id === studentId))
    .filter(Boolean);

  const mismatchStudents = (verification.mismatchedSeats || [])
    .map(seatId => seats.find(s => s.id === seatId)?.studentId)
    .map(studentId => students.find(s => s.id === studentId))
    .filter(Boolean);

  return {
    date: verification.date,
    totalStudents: presentStudents.length + absentStudents.length,
    presentCount: presentStudents.length,
    absentCount: absentStudents.length,
    mismatchCount: mismatchStudents.length,
    attendancePercentage: Math.round(
      (presentStudents.length / 
      (presentStudents.length + absentStudents.length)) * 100
    ),
    absentStudents,
    mismatchStudents
  };
};

export const exportToPDF = (report: ReturnType<typeof generateAttendanceReport>) => {
  // Implementação da geração de PDF
  console.log('Generating PDF report for', report.date);
};