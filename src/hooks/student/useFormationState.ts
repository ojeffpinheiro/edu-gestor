import { useState, useCallback } from 'react';
import { FORMATION_CONFIG, GroupFormationState, GroupFormationType } from '../../utils/types/GroupFormation';
import { FeedbackState } from '../../utils/types/FeedbackState';
import { StudentFormData } from '../../utils/types/BasicUser';

/**
 * Hook personalizado para gerenciar o estado de formação de grupos
 */
export const useFormationState = (students: StudentFormData[]) => {
    // Estado para os parâmetros de formação de grupos
    const [formationParams, setFormationParams] = useState<GroupFormationState>({
        groupSize: FORMATION_CONFIG.MIN_GROUP_SIZE,
        numberOfGroups: Math.max(
            FORMATION_CONFIG.MIN_GROUPS, 
            Math.ceil(students.length / FORMATION_CONFIG.MIN_GROUP_SIZE)
        ),
        formationType: GroupFormationType.BY_SIZE
    });
    
    // Estado para feedback e resultados
    const [feedback, setFeedback] = useState<FeedbackState>({
        errorMessage: '',
        successMessage: '',
        isProcessing: false,
        showResults: false,
        hasUnsavedChanges: false
    });
    
    // Estado para os grupos formados
    const [studentGroups, setStudentGroups] = useState<StudentFormData[][]>([]);

    /**
     * Atualiza parcialmente o estado de feedback
     */
    const updateFeedback = useCallback((partialState: Partial<FeedbackState>) => {
        setFeedback(prevState => ({ ...prevState, ...partialState }));
    }, []);

    /**
     * Atualiza parcialmente os parâmetros de formação
     */
    const updateFormationParams = useCallback((partialState: Partial<GroupFormationState>) => {
        setFormationParams(prevState => ({ ...prevState, ...partialState }));
    }, []);

    return {
        formationParams,
        feedback,
        studentGroups,
        setStudentGroups,
        updateFeedback,
        updateFormationParams
    };
};