// Event Interface
export interface Event {
    id: number;
    title: string;
    date: Date;
    type: 'activity' | 'assessment' | 'event';
    description: string;
}

// Event Filter Interface
export interface EventFilter {
    type?: 'activity' | 'assessment' | 'event' | 'all';
    startDate?: Date;
    endDate?: Date;
}