import { useCallback, useState } from "react";
import { Question } from "../utils/types/Question";
import { createQuestionVariant } from "../utils/questionUtils";

export const useQuestionActions = () => {
  const [isCreatingVariant, setIsCreatingVariant] = useState(false);
  
  const handleCreateVariant = useCallback(async (question: Question) => {
    setIsCreatingVariant(true);
    try {
      const variant = createQuestionVariant(question);
      // Adicione a nova variação ao estado ou banco de dados
      console.log('Nova variação criada:', variant);
      console.log('Variação criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar variação');
    } finally {
      setIsCreatingVariant(false);
    }
  }, []);

  const handleEditQuestion = useCallback((question: Question) => {
    console.log('Editar questão:', question);
  }, []);

  const handleDeleteQuestion = useCallback((question: Question) => {
    console.log('Excluir questão:', question);
  }, []);

  return {
    isCreatingVariant,
    handleCreateVariant,
    handleEditQuestion,
    handleDeleteQuestion
  };
};