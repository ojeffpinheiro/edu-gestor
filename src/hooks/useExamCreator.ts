// hooks/useExamCreator.ts
import { useState, useEffect, useCallback } from 'react';
import { Exam } from '../utils/types/Exam';
import { DifficultyLevelType, Question } from '../utils/types/Question';

export const useExamCreator = (initialQuestions: Question[] = []) => {
  // Inicializa os dados da prova com valores padrão
  const initializeExamData = (): Exam => {
    return {
      id: 0,
      title: '',
      description: '',
      discipline: '',
      topicId: '',
      totalQuestions: 6,
      questions: [],
      selectionMode: 'manual',
      accessCode: '',
      applicationDate: new Date(),
      classIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: '',
      updatedBy: '',
      grade: 0,
      isPublic: false,
      password: '',
      requirePassword: false,
      status: '',
      totalPoints: 10,
      useBarCode: false,
      variants: [],
      correctionType: 'automatic',
      identificationMethod: 'barcode',
      questionDistribution: [
        { difficulty: 'easy', count: 0, selected: 0 },
        { difficulty: 'medium', count: 0, selected: 0 },
        { difficulty: 'hard', count: 0, selected: 0 }
      ],
      instructions: [
      'A avaliação é individual',
      'Leia os enunciados com atenção',
      'Não é permitido o uso de aparelhos eletrônicos',
    ],
      questionLayout: 'grid',
      documentType: 'exam',
      headerSubtitle: '',
      headerTitle: '',
      schoolName: 'ESCOLA ESTADUAL',
      schoolSubtitle: 'Ensino Médio',
      institutionLogo: null,
      showAnswerGrid: false,
      showDate: false,
      showGrade: false,
      showStudentId: false,
      showStudentName: true,
      withGradeSpace: false,
      shuffleAlternatives: false,
      shuffleQuestions: false,
    };
  };
  
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [examData, setExamData] = useState<Exam>(initializeExamData());
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Atualiza a distribuição de questões quando o total muda
  useEffect(() => {
    if (examData.totalQuestions > 0) {
      const easyCount = Math.round(examData.totalQuestions * 0.4);
      const mediumCount = Math.round(examData.totalQuestions * 0.4);
      const hardCount = examData.totalQuestions - easyCount - mediumCount;

      setExamData(prev => ({
        ...prev,
        questionDistribution: [
          { difficulty: 'easy', count: easyCount, selected: 0 },
          { difficulty: 'medium', count: mediumCount, selected: 0 },
          { difficulty: 'hard', count: hardCount, selected: 0 }
        ]
      }));
    }
  }, [examData.totalQuestions]);

  // Atualiza as contagens de questões selecionadas por dificuldade
  useEffect(() => {
    const difficultyCounts = selectedQuestions.reduce((acc, question) => {
      acc[question.difficultyLevel] = (acc[question.difficultyLevel] || 0) + 1;
      return acc;
    }, { easy: 0, medium: 0, hard: 0 } as Record<DifficultyLevelType, number>);

    setExamData(prev => ({
      ...prev,
      questions: selectedQuestions,
      questionDistribution: prev.questionDistribution.map(dist => ({
        ...dist,
        selected: difficultyCounts[dist.difficulty as DifficultyLevelType] || 0
      }))
    }));
  }, [selectedQuestions]);

  // Funções de gerenciamento de seleção de questões
  const toggleSelectAll = useCallback((questions: Question[]) => {
    if (selectAll) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions([...questions]);
    }
    setSelectAll(!selectAll);
  }, [selectAll]);

  const toggleQuestionSelection = useCallback((question: Question) => {
    setSelectedQuestions(prev => {
      const isSelected = prev.some(q => q.id === question.id);
      if (isSelected) {
        return prev.filter(q => q.id !== question.id);
      }
      return [...prev, question];
    });
    setSelectAll(false);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedQuestions([]);
    setSelectAll(false);
  }, []);

  const handleTotalQuestionsChange = useCallback((value: number): void => {
    const parsedValue = parseInt(value.toString()) || 0;
    setExamData(prev => ({ ...prev, totalQuestions: parsedValue }));
  }, []);

  const handleDifficultyChange = useCallback((difficulty: DifficultyLevelType, value: number) => {
    const newDistribution = examData.questionDistribution.map(dist =>
      dist.difficulty === difficulty ? { ...dist, count: value } : dist
    );

    setExamData(prev => ({
      ...prev,
      questionDistribution: newDistribution
    }));
  }, [examData.questionDistribution]);

  const navigateToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 5)));
  }, []);

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const saveExam = async () => {
    setIsSaving(true);
    try {
      // Simula uma requisição de salvamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Prova salva:', { ...examData, questions: selectedQuestions });
      // Aqui você pode adicionar a lógica real de salvamento
    } catch (error) {
      console.error('Erro ao salvar prova:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const printExam = () => {
    // Esta função será chamada quando o usuário clicar em "Imprimir"
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const isFormValid = Boolean(examData.title) && Boolean(examData.discipline);
  const isReadyForPreview = selectedQuestions.length === examData.totalQuestions;

  const handleSubmitExam = useCallback(() => {
    // Aqui você implementaria a lógica para enviar a prova para o backend
    alert('Prova criada com sucesso!');
  }, []);

  const updateExamData = useCallback((newData: Partial<Exam>) => {
    setExamData(prev => ({
      ...prev,
      ...newData
    }));
  }, []);

  return {
    currentStep,
    examData,
    selectedQuestions,
    selectAll,
    isFormValid,
    isReadyForPreview,
    isSaving,
    previewMode,
    saveExam,
    printExam,
    togglePreviewMode,
    navigateToStep,
    setExamData: updateExamData,
    setSelectedQuestions,
    toggleSelectAll,
    toggleQuestionSelection,
    clearSelection,
    handleTotalQuestionsChange,
    handleDifficultyChange,
    handleSubmitExam
  };
};

