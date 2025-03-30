// src/utils/types/CalendarEvent.ts

export type EventType = 'class' | 'meeting' | 'deadline' | 'holiday' | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date | string;
  end: Date | string;
  type: EventType;
  location?: string;
  isAllDay?: boolean;
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
}