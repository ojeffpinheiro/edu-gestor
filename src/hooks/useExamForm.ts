// hooks/useExamForm.ts
import { useState, useEffect } from 'react';
import { ExamGenerationParams, Question } from '../services/examsService';

interface UseExamFormProps {
  initialParams: ExamGenerationParams;
  availableQuestions: Question[];
}

export const useExamForm = ({ initialParams, availableQuestions }: UseExamFormProps) => {
  const [formData, setFormData] = useState<ExamGenerationParams>(initialParams);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  // Validação centralizada
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let formIsValid = true;

    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Título é obrigatório';
      formIsValid = false;
    }

    if (formData.numberOfExams <= 0) {
      newErrors.numberOfExams = 'Número de variantes deve ser maior que zero';
      formIsValid = false;
    }

    if (formData.questionsPerExam <= 0) {
      newErrors.questionsPerExam = 'Número de questões por prova deve ser maior que zero';
      formIsValid = false;
    }

    if (formData.selectedQuestionIds.length === 0) {
      newErrors.questions = 'Selecione pelo menos uma questão';
      formIsValid = false;
    }

    if (formData.questionsPerExam > formData.selectedQuestionIds.length) {
      newErrors.questionsPerExam = `Número de questões por prova não pode ser maior que questões selecionadas (${formData.selectedQuestionIds.length})`;
      formIsValid = false;
    }

    // Validação da distribuição de dificuldade
    if (formData.difficultyDistribution) {
      const { easy, medium, hard } = formData.difficultyDistribution;
      const total = easy + medium + hard;

      if (total !== formData.questionsPerExam) {
        newErrors.difficultyDistribution = `A soma das questões por dificuldade (${total}) deve ser igual ao número de questões por prova (${formData.questionsPerExam})`;
        formIsValid = false;
      }

      if (easy < 0 || medium < 0 || hard < 0) {
        newErrors.difficultyDistribution = 'O número de questões não pode ser negativo';
        formIsValid = false;
      }

      // Verificar se há questões suficientes disponíveis
      const easyQuestions = availableQuestions.filter(q => q.difficulty === 'easy');
      const mediumQuestions = availableQuestions.filter(q => q.difficulty === 'medium');
      const hardQuestions = availableQuestions.filter(q => q.difficulty === 'hard');

      if (easy > easyQuestions.length || medium > mediumQuestions.length || hard > hardQuestions.length) {
        newErrors.difficultyDistribution = `Questões insuficientes. Disponíveis: Fácil(${easyQuestions.length}), Média(${mediumQuestions.length}), Difícil(${hardQuestions.length})`;
        formIsValid = false;
      }
    }
    // Nova validação para tópicos/questões
    if (formData.selectedTopics.length === 0 && formData.selectedQuestionIds.length === 0) {
      newErrors.topics = 'Selecione pelo menos um tópico ou questões específicas';
      newErrors.questions = 'Selecione pelo menos um tópico ou questões específicas';
      formIsValid = false;
    }

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  // Atualizações do formulário
  const updateFormData = (updates: Partial<ExamGenerationParams>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Atualizar questões selecionadas
  const updateSelectedQuestions = (questionIds: string[]) => {
    updateFormData({ selectedQuestionIds: questionIds });
  };

  // Atualizar tópicos selecionados
  const updateSelectedTopics = (topics: string[]) => {
    updateFormData({ selectedTopics: topics });
  };

  // Efeito para validação automática
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return {
    formData,
    errors,
    isValid,
    updateFormData,
    updateSelectedQuestions,
    updateSelectedTopics,
    validateForm
  };
};