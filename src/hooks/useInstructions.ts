import { useState, useCallback } from 'react';

/**
 * Hook personalizado para gerenciar as instruções do exame
 * Facilita adição, remoção e edição de instruções
 * 
 * @param initialInstructions - Array inicial de instruções
 * @returns Métodos e estado para gerenciar as instruções
 */
export const useInstructions = (initialInstructions: string[] = ['', '', '']) => {
  const [instructions, setInstructions] = useState<string[]>(initialInstructions);

  /**
   * Atualiza o valor de uma instrução específica
   * @param index - Índice da instrução a ser atualizada
   * @param value - Novo valor para a instrução
   */
  const handleInstructionChange = useCallback((index: number, value: string) => {
    setInstructions(prev => {
      const newInstructions = [...prev];
      newInstructions[index] = value;
      return newInstructions;
    });
  }, []);

  /**
   * Adiciona uma nova instrução vazia à lista
   */
  const addInstruction = useCallback(() => {
    setInstructions(prev => [...prev, '']);
  }, []);

  /**
   * Remove uma instrução pelo índice
   * @param index - Índice da instrução a ser removida
   */
  const removeInstruction = useCallback((index: number) => {
    setInstructions(prev => {
      // Não remover se houver apenas uma instrução
      if (prev.length <= 1) return prev;
      
      const newInstructions = [...prev];
      newInstructions.splice(index, 1);
      return newInstructions;
    });
  }, []);

  return {
    instructions,
    setInstructions,
    handleInstructionChange,
    addInstruction,
    removeInstruction
  };
};