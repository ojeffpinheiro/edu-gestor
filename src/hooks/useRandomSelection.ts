import { StudentAttendance } from "../utils/types/BasicUser";

/**
 * Realiza o sorteio de grupos com base no tamanho especificado.
 */
export const distributeStudentsIntoGroups = (student: StudentAttendance[], tamanhoGrupo: number): StudentAttendance[][] => {
    const studentShuffler = [...student].sort(() => Math.random() - 0.5);
    const groups: StudentAttendance[][] = [];

    for (let i = 0; i < studentShuffler.length; i += tamanhoGrupo) {
        groups.push(studentShuffler.slice(i, i + tamanhoGrupo));
    }

    return groups;
};

/**
 * Realiza o sorteio de um aluno aleatório.
 */
export const drawStudent= (student: StudentAttendance[]): StudentAttendance | null => {
    if (student.length === 0) return null;
    const randomIndex    = Math.floor(Math.random() * student.length);
    return student[randomIndex];
};
