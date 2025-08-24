// src/hooks/useDidacticSequences.ts

import { useState, useEffect, useCallback } from 'react';
import { DidacticSequence, DisciplineType } from '../../types/academic/DidacticSequence';
import { didacticSequencesService } from '../../services/didacticSequencesService';

export const useDidacticSequences = () => {
  const [sequences, setSequences] = useState<DidacticSequence[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineType | null>(null);

  // Carregar sequências
  const loadSequences = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let data: DidacticSequence[];
      
      if (selectedDiscipline) {
        data = await didacticSequencesService.getSequencesByDiscipline(selectedDiscipline);
      } else {
        data = await didacticSequencesService.getSequences();
      }
      
      setSequences(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Ocorreu um erro desconhecido'));
    } finally {
      setIsLoading(false);
    }
  }, [selectedDiscipline]);

  // Filtrar por disciplina
  const filterByDiscipline = (discipline: DisciplineType | null) => {
    setSelectedDiscipline(discipline);
  };

  // Criar nova sequência
  const createSequence = async (data: Omit<DidacticSequence, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newSequence = await didacticSequencesService.createSequence(data);
      setSequences(prev => [...prev, newSequence]);
      return newSequence;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao criar sequência'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar sequência
  const updateSequence = async ({ id, data }: { id: string, data: Partial<Omit<DidacticSequence, 'id' | 'createdAt' | 'updatedAt'>> }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedSequence = await didacticSequencesService.updateSequence(id, data);
      
      if (updatedSequence) {
        setSequences(prev => prev.map(seq => seq.id === id ? updatedSequence : seq));
      }
      
      return updatedSequence;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao atualizar sequência'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Excluir sequência
  const deleteSequence = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await didacticSequencesService.deleteSequence(id);
      
      if (success) {
        setSequences(prev => prev.filter(seq => seq.id !== id));
      }
      
      return success;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao excluir sequência'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar sequências quando o componente montar ou quando a disciplina selecionada mudar
  useEffect(() => {
    loadSequences();
  }, [loadSequences]);

  return {
    sequences,
    isLoading,
    error,
    selectedDiscipline,
    filterByDiscipline,
    createSequence,
    updateSequence,
    deleteSequence,
    refreshSequences: loadSequences
  };
};