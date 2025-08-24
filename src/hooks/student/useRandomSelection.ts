import { StudentFormData } from "../../utils/types/BasicUser";

/**
 * Realiza o sorteio de grupos com base no tamanho especificado.
 */
export const distributeStudentsIntoGroups = (student: StudentFormData[], tamanhoGrupo: number): StudentFormData[][] => {
    const studentShuffler = [...student].sort(() => Math.random() - 0.5);
    const groups: StudentFormData[][] = [];

    for (let i = 0; i < studentShuffler.length; i += tamanhoGrupo) {
        groups.push(studentShuffler.slice(i, i + tamanhoGrupo));
    }

    return groups;
};

/**
 * Realiza o sorteio de um aluno aleatório.
 */
export const drawStudent= (student: StudentFormData[]): StudentFormData | null => {
    if (student.length === 0) return null;
    const randomIndex    = Math.floor(Math.random() * student.length);
    return student[randomIndex];
};
