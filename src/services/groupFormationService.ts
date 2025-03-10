import { Student, GroupFormationState, GroupFormationType  } from '../utils/types'

import { distributeStudentsIntoGroups } from '../hooks/useRandomSelection';

/**
 * Distribui os estudantes em grupos baseado nos parâmetros selecionados
 */
export const createStudentGroups = (
    students: Student[], 
    formationParams: GroupFormationState
): Student[][] => {
    try {
        const { formationType, groupSize, numberOfGroups } = formationParams;

        if (formationType === GroupFormationType.BY_NUMBER) {
            // Calcula o tamanho do grupo com base no número total de grupos
            const calculatedGroupSize = Math.ceil(students.length / numberOfGroups);
            return distributeStudentsIntoGroups(students, calculatedGroupSize);
        } else {
            return distributeStudentsIntoGroups(students, groupSize);
        }
    } catch (error) {
        console.error('Erro ao criar grupos:', error);
        return [];
    }
};