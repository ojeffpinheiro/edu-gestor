export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export interface Event {
    id: number,
    title: string;
    date: string;
    type: string;
}

export interface Lesson {
    id: number;
    team: string;
    day: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
    timeSlot: string;
    discipline: string;
}

export interface Team {
    id: number;
    name: string;
    session: 'Manhã' | 'Tarde' | 'Noite';
    numStudent: number;
}