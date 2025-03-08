export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface Event {
  id: number;
  title: string;
  date: Date;
  type: 'activity' | 'assessment' | 'event';
  description: string;
}

export interface EventFilter {
  type?: 'activity' | 'assessment' | 'event' | 'all';
  startDate?: Date;
  endDate?: Date;
}


export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
