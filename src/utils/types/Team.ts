export type SeatType = {
    id: string;
    row: number;
    column: number;
    studentId?: number;
    priority?: 'low-vision' | 'intellectual-disability' | 'good-pair' | null;
};

export type LayoutConfig = {
    rows: number;
    columns: number;
    seats: SeatType[];
};