import { StudentFormData } from "./types/BasicUser";
import { LayoutConfig, SeatType } from "./types/Team";

// utils/classroomUtils.ts
export const initializeLayout = (rows: number, columns: number): LayoutConfig => {
    const seats: SeatType[] = [];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            seats.push({
                id: `seat-${row}-${col}`,
                position: { row, column: col },
                studentId: undefined,
                priority: null,
            });
        }
    }
    
    return { rows, columns, seats };
};

export const findBestSeatForStudent = (student: StudentFormData, seats: SeatType[]): SeatType | undefined => {
    if (student.specialNeeds === 'low_vision') {
        return seats.find(s => !s.studentId && s.position.row === 0);
    }
    // Outras lógicas de prioridade...
    return seats.find(s => !s.studentId);
};

export const generateAutomaticLayout = (layout: LayoutConfig, studentList: StudentFormData[]): LayoutConfig => {
    const newSeats = [...layout.seats];
    const unassignedStudents = [...studentList]
        .filter(student => !newSeats.some(s => s.studentId === student.id));

    // 1. Atribuir alunos com prioridades primeiro
    const priorityStudents = unassignedStudents.filter(student => student.specialNeeds);
    priorityStudents.forEach(student => {
        const bestSeat = findBestSeatForStudent(student, newSeats);
        if (bestSeat) {
            bestSeat.studentId = student.id;
        }
    });

    // 2. Atribuir alunos restantes
    const remainingStudents = unassignedStudents.filter(student =>
        !priorityStudents.includes(student)
    );

    remainingStudents.forEach(student => {
        const emptySeat = newSeats.find(s => !s.studentId);
        if (emptySeat) {
            emptySeat.studentId = student.id;
        }
    });

    return { ...layout, seats: newSeats };
};

export const getSeatPositionText = (seatId: string, seats: SeatType[]): string => {
    const seat = seats.find(s => s.id === seatId);
    return seat ? `F${seat.position.row + 1}C${seat.position.column + 1}` : '';
};

export const getStudentAttendanceColor = (attendance: number): string => {
    if (attendance >= 90) return '#4CAF50';
    if (attendance >= 75) return '#FFC107';
    return '#F44336';
};