import { GroupFormationType, GroupFormationState, FORMATION_CONFIG, StudentAttendance } from '../utils/types'

/**
 * Valida os parâmetros antes da formação dos grupos
 */
export const validateFormationParams = (
    students: StudentAttendance[], 
    formationParams: GroupFormationState
): { isValid: boolean; errorMessage: string } => {
    try {
        // Verifica se há estudantes disponíveis
        if (!students || students.length === 0) {
            throw new Error('Não há estudantes disponíveis para formar grupos.');
        }

        const { formationType, groupSize, numberOfGroups } = formationParams;
        
        // Validação específica para cada tipo de formação
        if (formationType === GroupFormationType.BY_SIZE) {
            if (groupSize < FORMATION_CONFIG.MIN_GROUP_SIZE) {
                throw new Error(`O tamanho do grupo deve ser pelo menos ${FORMATION_CONFIG.MIN_GROUP_SIZE}.`);
            }
            if (groupSize > students.length) {
                throw new Error(`O tamanho do grupo não pode exceder o número de estudantes (${students.length}).`);
            }
        } else {
            if (numberOfGroups < FORMATION_CONFIG.MIN_GROUPS) {
                throw new Error(`É necessário ter pelo menos ${FORMATION_CONFIG.MIN_GROUPS} grupo.`);
            }
            if (numberOfGroups > students.length) {
                throw new Error(`O número de grupos não pode exceder o número de estudantes (${students.length}).`);
            }
        }

        return { isValid: true, errorMessage: '' };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido na validação';
        return { isValid: false, errorMessage };
    }
};