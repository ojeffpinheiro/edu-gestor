import { useCallback, useState } from "react";
import { Question } from "../../types/evaluation/Question";
import { combineQuestions as combineQuestionsUtil, createQuestionVariant } from "../../utils/questionUtils";

interface UseQuestionActionsProps {
  questions?: Question[];
  selectedQuestionIds?: Set<string>;
  onUpdateQuestions?: (updatedQuestions: Question[]) => void;
  onClearSelection?: () => void;
  onCombineSuccess?: (newQuestion: Question) => void;
}

export const useQuestionActions = ({
  questions = [],
  selectedQuestionIds = new Set(),
  onUpdateQuestions = () => { },
  onClearSelection = () => { },
  onCombineSuccess = () => { },
}: UseQuestionActionsProps = {}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ações individuais
  const createVariant = useCallback(async (question: Question) => {
    setIsProcessing(true);
    setError(null);
    try {
      const variant = createQuestionVariant(question);
      console.log('Nova variação criada:', variant);
      return variant;
    } catch (e) {
      setError('Erro ao criar variação');
      throw e;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const editQuestion = useCallback((question: Question, updates: Partial<Question>) => {
    setIsProcessing(true);
    setError(null);
    try {
      const updatedQuestion = { ...question, ...updates };
      console.log('Questão editada:', updatedQuestion);
      return updatedQuestion;
    } catch (e) {
      setError('Erro ao editar questão');
      throw e;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const deleteQuestion = useCallback((question: Question) => {
    setIsProcessing(true);
    setError(null);
    try {
      console.log('Questão excluída:', question);
    } catch (e) {
      setError('Erro ao excluir questão');
      throw e;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Ações em massa
  const deleteQuestions = useCallback(() => {
    setIsProcessing(true);
    setError(null);
    try {
      onUpdateQuestions(questions.filter(q => !selectedQuestionIds.has(q.id)));
      onClearSelection();
    } catch (e) {
      setError('Erro ao excluir questões');
      throw e;
    } finally {
      setIsProcessing(false);
    }
  }, [questions, selectedQuestionIds, onUpdateQuestions, onClearSelection]);

  const editQuestions = useCallback((updates: Partial<Question>) => {
    setIsProcessing(true);
    setError(null);
    try {
      onUpdateQuestions(questions.map(q =>
        selectedQuestionIds.has(q.id) ? { ...q, ...updates } : q
      ));
    } catch (e) {
      setError('Erro ao editar questões');
      throw e;
    } finally {
      setIsProcessing(false);
    }
  }, [questions, selectedQuestionIds, onUpdateQuestions]);

  const exportQuestions = useCallback(() => {
    setIsProcessing(true);
    setError(null);
    try {
      const questionsToExport = questions.filter(q => selectedQuestionIds.has(q.id));
      const exportData = {
        version: '1.0',
        generatedAt: new Date().toISOString(),
        count: questionsToExport.length,
        questions: questionsToExport
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `questoes-exportadas-${new Date().toLocaleDateString()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError('Erro ao exportar questões');
      throw e;
    } finally {
      setIsProcessing(false);
    }
  }, [questions, selectedQuestionIds]);

  // Combinação de questões
  const combineQuestions = useCallback(async (questionIds: string[]): Promise<Question> => {
    setIsProcessing(true);
    setError(null);
    try {
      const newQuestion: Question = combineQuestionsUtil(questionIds, questions);
      onCombineSuccess(newQuestion);
      onClearSelection();
      return newQuestion;
    } catch (e) {
      setError('Falha ao combinar questões');
      throw e;
    } finally {
      setIsProcessing(false);
    }
  }, [questions, onCombineSuccess, onClearSelection]);

  return {
    // Estados
    isProcessing,
    error,

    // Ações individuais
    createVariant,
    editQuestion,
    deleteQuestion,

    // Ações em massa
    deleteQuestions,
    editQuestions,
    exportQuestions,

    // Combinação
    combineQuestions,

    // Utilitários
    clearError: () => setError(null),
  };
};