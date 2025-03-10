import { Student } from '../utils/types';

/**
 * Realiza o sorteio de grupos com base no tamanho especificado.
 */
export const distributeStudentsIntoGroups = (alunos: Student[], tamanhoGrupo: number): Student[][] => {
    const alunosEmbaralhados = [...alunos].sort(() => Math.random() - 0.5);
    const grupos: Student[][] = [];

    for (let i = 0; i < alunosEmbaralhados.length; i += tamanhoGrupo) {
        grupos.push(alunosEmbaralhados.slice(i, i + tamanhoGrupo));
    }

    return grupos;
};

/**
 * Realiza o sorteio de um aluno aleatório.
 */
export const realizarSorteioAluno = (alunos: Student[]): Student | null => {
    if (alunos.length === 0) return null;
    const indiceAleatorio = Math.floor(Math.random() * alunos.length);
    return alunos[indiceAleatorio];
};
