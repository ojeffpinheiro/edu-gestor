export type ReportType = 'studentList' | 'seatingChart' | 'attendance' | 'changes';

export interface SelectedReports {
  studentList: boolean;
  seatingChart: boolean;
  attendance: boolean;
  changes: boolean;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Filters {
  class: string;
  period: string;
  dateRange: DateRange;
}

export interface ReportField {
  label: string;
  type: 'select' | 'date' | 'checkbox';
  options?: string[];
}

export interface GeneratedReport {
  type: ReportType;
  filters: Record<string, any>;
  generatedAt: Date;
}

export interface Student {
  id: number;
  name: string;
  seat: string;
  photo: string;
  contact: string;
  notes: string;
}

export interface SeatingLayout {
  rows: number;
  columns: number;
  totalSeats: number;
  occupiedSeats: number;
  occupancyRate: number;
  emptySeats: number;
  seats: { student: Student | null; }[];
}

export interface AttendanceData {
  id: number;
  name: string;
  totalClasses: number;
  attendance: number;
  classes: number;
  absences: number;
}

export interface ChangeRecord {
  id: number;
  type: 'seat' | 'class' | 'config' | string;
  description: string;
  author: string;
  date: string;
  time: string;
  reason: string;
}
