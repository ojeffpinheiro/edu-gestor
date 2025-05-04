// src/utils/types/CalendarEvent.ts
export type EventType = 
  | 'class' 
  | 'assessment' 
  | 'holiday' 
  | 'break' 
  | 'meeting'
  | 'results_delivery'
  | 'training'
  | 'important_date'
  | 'external_assessment'
  | 'thematic_week'
  | 'asynchronous_class'
  | 'participatory_council'
  | 'deadline'
  | 'saturday_class'
  | 'personal'
  | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date | string;
  end: Date | string;
  type: EventType;
  location?: string;
  isAllDay?: boolean;
  participants?: string[];
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date | string;
    occurrences?: number;
    count?: number;
  };
  reminders?: {
    time: number;
    unit: 'minutes' | 'hours' | 'days';
  }[];
  color?: string;
  attachments?: string[];
  schoolId?: string;
  classId?: string;
  gradeId?: string;
}

export type CalendarViewType = 'month' | 'week' | 'day' | 'semester' | 'quarter' | 'year';

export interface AcademicPeriod {
  id: string;
  name: string;
  start: Date;
  end: Date;
  type: 'bimester' | 'trimester' | 'semester' | 'year';
}

export interface SchoolCalendar {
  academicYear: {
    start: Date;
    end: Date;
  };
  periods: AcademicPeriod[];
  events: CalendarEvent[];
}