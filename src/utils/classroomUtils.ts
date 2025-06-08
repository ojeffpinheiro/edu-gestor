import { StudentFormData } from "./types/BasicUser";
import { LayoutConfig, SeatType } from "./types/Team";

export type Template  = 'U' | 'circle' | 'groups' | 'rows';

/**
 * Inicializa o layout da sala de aula com um número específico de fileiras e colunas.
 * Cria assentos vazios com IDs únicos e posições definidas.
 * @param rows Número de fileiras na sala de aula.
 * @param columns Número de colunas na sala de aula.
 * @returns Um objeto LayoutConfig contendo o número de fileiras, colunas e uma lista de assentos.
 */
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

/** 
 * Encontra o melhor assento disponível para um aluno com base em suas necessidades especiais.
 * Por exemplo, alunos com baixa visão podem precisar de um assento na frente da sala.
 * @param student O objeto StudentFormData do aluno.
 * @param seats A lista de assentos disponíveis na sala de aula.
 * @returns O assento mais adequado para o aluno, ou undefined se não houver assentos disponíveis.
 */
export const findBestSeatForStudent = (student: StudentFormData, seats: SeatType[]): SeatType | undefined => {
    if (student.specialNeeds === 'low_vision') {
        return seats.find(s => !s.studentId && s.position.row === 0);
    }
    // Outras lógicas de prioridade...
    return seats.find(s => !s.studentId);
};

/**
 * @function generateAutomaticLayout
 * @description Gera um layout automático para a sala de aula, atribuindo alunos a assentos disponíveis.
 * * Primeiro, atribui alunos com necessidades especiais a assentos prioritários,
 * * depois preenche os assentos restantes com os alunos restantes.
 * @param layout O layout atual da sala de aula.
 * @param studentList A lista de alunos a serem atribuídos aos assentos.
 * @returns O layout atualizado com os alunos atribuídos aos assentos.
 */
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

/**
 * @function getSeatPositionText
 * @description Retorna uma string representando a posição de um assento no formato "F{linha}C{coluna}".
 * @param seatId O ID do assento.
 * @param seats A lista de assentos disponíveis.
 * @return Uma string representando a posição do assento, ou uma string vazia se o assento não for encontrado.
 */
export const getSeatPositionText = (seatId: string, seats: SeatType[]): string => {
    const seat = seats.find(s => s.id === seatId);
    return seat ? `F${seat.position.row + 1}C${seat.position.column + 1}` : '';
};

/**
 * @function getStudentAttendanceColor
 * @description Retorna uma cor baseada na taxa de presença do aluno.
 * - Verde para 90% ou mais
 * - Amarelo para 75% a 89%
 * - Vermelho para menos de 75%
 * @param attendance A taxa de presença do aluno.
 * @returns Uma string representando a cor correspondente à taxa de presença.
 */
export const getStudentAttendanceColor = (attendance: number): string => {
    if (attendance >= 90) return '#4CAF50';
    if (attendance >= 75) return '#FFC107';
    return '#F44336';
};

/**
 * @function generateLayout
 * @description Gera um layout de assentos com base nos alunos e suas respectivas taxas de pres
 */
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

/** 
 * @function createSeat
 * @description Cria um assento 
 * @param {number} row - Linha do assento
 * @param {number} col - Coluna do assento
 * @return {object} - Assento 
 */
const createSeat = (row: number, column: number): SeatType => ({
  id: `seat-${row}-${column}`,
  position: { row, column },
  studentId: undefined,
  priority: null
});

/**
 * @function validateLayout
 * @description Valida o layout de assentos
 * @param {object} layout - Layout de assentos
 * * @param {number} layout.rows - Número de linhas
 * * @param {number} layout.columns - Número de colunas
 * * @param {SeatType[]} layout.seats - Assentos
 * @return {boolean} - True se o layout for válido, false caso contrário
 * 
 */
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