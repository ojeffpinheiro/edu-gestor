// Attendance Status Types
export type AttendanceStatus = 'Presente' | 'Ausente' | 'Justificada';

// Attendance Record Interface
export interface AttendanceRecord {
    date: string;
    status: AttendanceStatus;
}