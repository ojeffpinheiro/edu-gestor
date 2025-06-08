import { StudentFormData } from "./types/BasicUser";
import { LayoutConfig, SeatType } from "./types/Team";

export type Template  = 'U' | 'circle' | 'groups' | 'rows';

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


export const generateLayout = (
  rows: number,
  columns: number,
  template?: 'U' | 'circle' | 'groups' | 'rows'
): LayoutConfig => {
  const seats: SeatType[] = [];

  switch (template) {
    case 'U':
      // Layout em formato de U
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          if (row === 0 || col === 0 || col === columns - 1) {
            seats.push(createSeat(row, col));
          }
        }
      }
      break;
    
    case 'circle':
      // Layout circular (aproximado)
      const center = { x: columns / 2, y: rows / 2 };
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const distance = Math.sqrt(
            Math.pow(col - center.x, 2) + Math.pow(row - center.y, 2)
          );
          if (distance <= Math.min(columns, rows) / 2) {
            seats.push(createSeat(row, col));
          }
        }
      }
      break;
    
    case 'groups':
      // Grupos de 4 assentos
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          if (col % 2 === 0 && row % 2 === 0) {
            seats.push(createSeat(row, col));
          }
        }
      }
      break;
    
    default:
      // Layout padrão retangular
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          seats.push(createSeat(row, col));
        }
      }
  }

  return { rows, columns, seats };
};

const createSeat = (row: number, column: number): SeatType => ({
  id: `seat-${row}-${column}`,
  position: { row, column },
  studentId: undefined,
  priority: null
});

export const validateLayout = (layout: LayoutConfig) => {
  const errors: string[] = [];
  
  if (layout.rows < 3) errors.push("Mínimo de 3 fileiras");
  if (layout.rows > 10) errors.push("Máximo de 10 fileiras");
  if (layout.columns < 3) errors.push("Mínimo de 3 colunas");
  if (layout.columns > 8) errors.push("Máximo de 8 colunas");
  
  return {
    isValid: errors.length === 0,
    errors
  };
};