import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as rubricService from '../../services/rubricService';

// Utilizando a interface EvaluationRubric já definida no documento
interface EvaluationRubric {
  id: string;
  title: string;
  criteria: {
    id: string;
    description: string;
    weight: number;
    levels: {
      score: number;
      description: string;
    }[];
  }[];
}

// Interface para aplicação de rubrica em avaliações
interface AppliedRubric {
  rubricId: string;
  examId: string;
  questionIds: string[]; // IDs das questões que usam esta rubrica
  createdAt: Date;
  updatedAt: Date;
}

export const useRubrics = () => {
  const queryClient = useQueryClient();
  
  // Consulta para carregar todas as rubricas
  const {
    data: rubrics = [],
    isLoading: isLoadingRubrics,
    isError: isRubricsError,
    error: rubricsError,
    refetch: refetchRubrics
  } = useQuery<EvaluationRubric[], Error>('rubrics', rubricService.getAllRubrics);

  // Consulta para rubricas aplicadas
  const {
    data: appliedRubrics = [],
    isLoading: isLoadingApplied,
    refetch: refetchApplied
  } = useQuery<AppliedRubric[], Error>('appliedRubrics', rubricService.getAppliedRubrics);

  // Mutação para criar uma nova rubrica
  const createRubricMutation = useMutation(
    (newRubric: Omit<EvaluationRubric, 'id'>) => rubricService.createRubric(newRubric),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rubrics');
      },
    }
  );

  // Mutação para atualizar uma rubrica existente
  const updateRubricMutation = useMutation(
    (updatedRubric: EvaluationRubric) => 
      rubricService.updateRubric(updatedRubric.id, updatedRubric),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rubrics');
      },
    }
  );

  // Mutação para excluir uma rubrica
  const deleteRubricMutation = useMutation(
    (rubricId: string) => rubricService.deleteRubric(rubricId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rubrics');
        queryClient.invalidateQueries('appliedRubrics');
      },
    }
  );

  // Mutação para aplicar uma rubrica a questões de uma prova
  const applyRubricMutation = useMutation(
    (params: { rubricId: string; examId: string; questionIds: string[] }) =>
      rubricService.applyRubricToExam(params.rubricId, params.examId, params.questionIds),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('appliedRubrics');
        queryClient.invalidateQueries('examResults');
      },
    }
  );

  // Função para criar uma nova rubrica
  const createRubric = useCallback(
    async (newRubric: Omit<EvaluationRubric, 'id'>) => {
      try {
        await createRubricMutation.mutateAsync(newRubric);
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error };
      }
    },
    [createRubricMutation]
  );

  // Função para atualizar uma rubrica existente
  const updateRubric = useCallback(
    async (rubric: EvaluationRubric) => {
      try {
        await updateRubricMutation.mutateAsync(rubric);
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error };
      }
    },
    [updateRubricMutation]
  );

  // Função para excluir uma rubrica
  const deleteRubric = useCallback(
    async (rubricId: string) => {
      try {
        await deleteRubricMutation.mutateAsync(rubricId);
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error };
      }
    },
    [deleteRubricMutation]
  );

  // Função para aplicar uma rubrica a questões específicas de uma prova
  const applyRubricToExam = useCallback(
    async (rubricId: string, examId: string, questionIds: string[]) => {
      try {
        await applyRubricMutation.mutateAsync({ rubricId, examId, questionIds });
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error };
      }
    },
    [applyRubricMutation]
  );

  // Função para obter uma rubrica específica por ID
  const getRubricById = useCallback(
    (rubricId: string) => {
      return rubrics.find((rubric) => rubric.id === rubricId) || null;
    },
    [rubrics]
  );

  // Função para calcular pontuação com base em uma rubrica
  const calculateScoreWithRubric = useCallback(
    (rubricId: string, criteriaScores: { criteriaId: string; levelScore: number }[]) => {
      const rubric = getRubricById(rubricId);
      
      if (!rubric) {
        return { score: 0, error: 'Rubrica não encontrada' };
      }
      
      let totalScore = 0;
      let maxPossibleScore = 0;
      
      criteriaScores.forEach(({ criteriaId, levelScore }) => {
        const criteria = rubric.criteria.find((c) => c.id === criteriaId);
        
        if (criteria) {
          // Verifica se o score escolhido existe nos níveis do critério
          const levelExists = criteria.levels.some((level) => level.score === levelScore);
          
          if (levelExists) {
            totalScore += levelScore * criteria.weight;
          }
          
          // Calcula a pontuação máxima possível para este critério
          const maxLevelScore = Math.max(...criteria.levels.map((level) => level.score));
          maxPossibleScore += maxLevelScore * criteria.weight;
        }
      });
      
      // Normaliza a pontuação para uma escala de 0-100
      const normalizedScore = maxPossibleScore > 0 
        ? (totalScore / maxPossibleScore) * 100 
        : 0;
      
      return { 
        score: normalizedScore, 
        rawScore: totalScore,
        maxPossible: maxPossibleScore,
        error: null 
      };
    },
    [getRubricById]
  );

  // Função para obter rubricas aplicadas a uma prova específica
  const getRubricsForExam = useCallback(
    (examId: string) => {
      const applied = appliedRubrics.filter((ar) => ar.examId === examId);
      
      return applied.map((ar) => {
        const rubric = getRubricById(ar.rubricId);
        return {
          ...ar,
          rubric,
          questionIds: ar.questionIds
        };
      }).filter((item) => item.rubric !== null);
    },
    [appliedRubrics, getRubricById]
  );

  // Função para clonar uma rubrica existente
  const cloneRubric = useCallback(
    async (rubricId: string, newTitle: string) => {
      try {
        const sourceRubric = getRubricById(rubricId);
        
        if (!sourceRubric) {
          return { success: false, error: 'Rubrica de origem não encontrada' };
        }
        
        const clonedRubric: Omit<EvaluationRubric, 'id'> = {
          title: newTitle || `${sourceRubric.title} (Cópia)`,
          criteria: sourceRubric.criteria.map((criteria) => ({
            ...criteria,
            id: `${criteria.id}_clone_${Date.now()}`
          }))
        };
        
        return await createRubric(clonedRubric);
      } catch (error) {
        return { success: false, error };
      }
    },
    [getRubricById, createRubric]
  );

  // Exporta todas as funções e estados necessários
  return {
    // Estados
    rubrics,
    isLoadingRubrics,
    isRubricsError,
    rubricsError,
    appliedRubrics,
    isLoadingApplied,
    
    // Operações CRUD
    createRubric,
    updateRubric,
    deleteRubric,
    getRubricById,
    refetchRubrics,
    
    // Operações de aplicação
    applyRubricToExam,
    getRubricsForExam,
    refetchApplied,
    
    // Funções utilitárias
    calculateScoreWithRubric,
    cloneRubric,
    
    // Estados de mutação para feedback de UI
    isCreating: createRubricMutation.isLoading,
    isUpdating: updateRubricMutation.isLoading,
    isDeleting: deleteRubricMutation.isLoading,
    isApplying: applyRubricMutation.isLoading
  };
};

export default useRubrics;