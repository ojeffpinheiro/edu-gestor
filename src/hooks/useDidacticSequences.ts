// src/hooks/useDidacticSequences.ts
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { DidacticSequence, SequenceStage, DisciplineType } from '../utils/types/DidacticSequence'
import { didacticSequencesService } from '../services/didacticSequencesService';

export const useDidacticSequences = () => {
  const queryClient = useQueryClient();
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineType | null>(null);

  // Obter todas as sequências ou filtradas por disciplina
  const { data: sequences, isLoading, error } = useQuery<DidacticSequence[]>(
    ['sequences', selectedDiscipline],
    () => selectedDiscipline 
      ? didacticSequencesService.getByDiscipline(selectedDiscipline)
      : didacticSequencesService.getAll(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutos
    }
  );

  // Mutation para criar uma nova sequência
  const createMutation = useMutation(
    (newSequence: Omit<DidacticSequence, 'id' | 'createdAt' | 'updatedAt' | 'totalDuration'>) => 
      didacticSequencesService.create(newSequence),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sequences']);
      }
    }
  );

  // Mutation para atualizar uma sequência
  const updateMutation = useMutation(
    ({ id, data }: { id: string, data: Partial<Omit<DidacticSequence, 'id' | 'createdAt' | 'updatedAt'>> }) => 
      didacticSequencesService.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sequences']);
      }
    }
  );

  // Mutation para adicionar uma etapa
  const addStageMutation = useMutation(
    ({ sequenceId, stageData }: { sequenceId: string, stageData: Omit<SequenceStage, 'id'> }) => 
      didacticSequencesService.addStage(sequenceId, stageData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sequences']);
      }
    }
  );

  // Mutation para deletar uma sequência
  const deleteMutation = useMutation(
    (id: string) => didacticSequencesService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sequences']);
      }
    }
  );

  // Função para filtrar por disciplina
  const filterByDiscipline = useCallback((discipline: DisciplineType | null) => {
    setSelectedDiscipline(discipline);
  }, []);

  return {
    sequences,
    isLoading,
    error,
    selectedDiscipline,
    filterByDiscipline,
    createSequence: createMutation.mutate,
    updateSequence: updateMutation.mutate,
    addStageToSequence: addStageMutation.mutate,
    deleteSequence: deleteMutation.mutate,
    isCreating: createMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
  };
};