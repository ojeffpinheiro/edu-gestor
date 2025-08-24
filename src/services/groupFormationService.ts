import { distributeStudentsIntoGroups } from '../hooks/student/useRandomSelection';
import { StudentFormData } from '../utils/types/BasicUser';
import { GroupFormationState, GroupFormationType } from '../utils/types/GroupFormation';

/**
 * Distribui os estudantes em grupos baseado nos parâmetros selecionados
 */
export const createStudentGroups = (
    students: StudentFormData[], 
    formationParams: GroupFormationState
): StudentFormData[][] => {
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