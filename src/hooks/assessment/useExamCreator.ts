import { useState, useCallback, useMemo, useEffect } from 'react';
import { Exam, ExamTypes, ExamVariant } from '../../utils/types/Exam';
import { Question, DifficultyLevelType } from '../../utils/types/Question';
import { generateAccessCode } from '../../utils/examHelpers';

interface QuestionDistributionAnalysis {
  difficulty: DifficultyLevelType;
  required: number;
  available: number;
  selected: number;
  canFulfill: boolean;
  shortage: number;
}

interface AutoSelectionResult {
  success: boolean;
  selectedQuestions: Question[];
  analysis: QuestionDistributionAnalysis[];
  warnings: string[];
  errors: string[];
}

export const useExamCreator = () => {
  const initialExamData: Exam = {
    id: 0,
    title: 'Exame 1',
    description: 'Descrição padrão',
    discipline: '',
    topicId: '',
    documentType: ExamTypes.Exam,
    totalQuestions: 6,
    totalPoints: 10,
    questions: [],
    questionDistribution: [
      { difficulty: 'easy', count: 2, selected: 0 },
      { difficulty: 'medium', count: 3, selected: 0 },
      { difficulty: 'hard', count: 1, selected: 0 },
    ],
    selectionMode: 'manual',
    instructions: [
      'A avaliação é individual;',
      'Faça com tranquilidade e empenho para ter um bom resultado;',
      'Leia os enunciados com atenção, a interpretação faz parte da avaliação;',
      'É permitido o uso de calculadora (não é válido em formato digital);',
      'Não é permitido nenhum outro tipo de consulta externa (cola), celulares ou qualquer aparelho eletrônico;',
      'Reserve tempo suficiente para preencher a grade de respostas',
      'Preencha o cabeçalho de forma correta. Letra ilegível ou informações faltantes impedem a correção.',
      'Marque apenas uma das opções que lhe são apresentadas em cada questão.',
      'Marque suas respostas na grade de respostas utilizando apenas caneta esferográfica azul ou preta conforme o exemplo.',
      'Somente será considerado como marcação válida na grade de respostas a questão que apresentar apenas uma marcação conforme o exemplo.',
      'Se a questão não apresentar resolução completa e devidamente identificada, será considerada como errada, mesmo que a resposta assinalada corretamente no cartão resposta.',
      'Não é permitido rasurar ou alterar a marcação feita na grade de respostas.',
      'Para efeito de correção, serão consideradas 10 questões, então, se preferir, escolha 2 questões para não responder ou anular.'
    ],
    questionLayout: 'list',
    shuffleQuestions: false,
    shuffleAlternatives: false,
    schoolName: 'ESCOLA ESTADUAL DE ENSINO MÉDIO 9 DE OUTUBRO',
    headerStyle: 'standard',
    headerTitle: '',
    headerSubtitle: '',
    institutionLogo: null,
    showAnswerGrid: true,
    showStudentName: true,
    showStudentId: true,
    showDate: true,
    showGrade: true,
    withGradeSpace: true,
    isPublic: false,
    requirePassword: false,
    password: '',
    accessCode: generateAccessCode(6),
    useBarCode: false,
    correctionType: 'manual',
    identificationMethod: 'manual',
    applicationDate: new Date(),
    classIds: [],
    grade: 0,
    variants: [],
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'João Leivas',
    updatedBy: '',
    customHeaderImage: '',
    preventCopying: false,
    schoolInfos: ['ESTADO DO RIO GRANDE DO SUL', 'SECRETARIA DA EDUCAÇÃO – 2ª CRE'],
    compactMode: false,
    fontFamily: 'serif',
    fontSize: 'medium',
    showQuestionNumber: true,
    showQuestionTypeIndicator: true,
    variantsCount: 0,
    variantsEnabled: false,
    variantsGenerationMethod: 'questionBank',
  };

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [examData, setExamData] = useState<Exam>(initialExamData);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [lastAutoSelectionResult, setLastAutoSelectionResult] = useState<AutoSelectionResult | null>(null);

  const questions = examData.questions;

  // Análise da distribuição de dificuldade
  const distributionAnalysis = useMemo((): QuestionDistributionAnalysis[] => {
    const availableByDifficulty = questions.reduce((acc, question) => {
      if (examData.discipline && question.discipline !== examData.discipline) {
        return acc;
      }
      acc[question.difficultyLevel] = (acc[question.difficultyLevel] || 0) + 1;
      return acc;
    }, {} as Record<DifficultyLevelType, number>);

    const selectedByDifficulty = selectedQuestions.reduce((acc, question) => {
      acc[question.difficultyLevel] = (acc[question.difficultyLevel] || 0) + 1;
      return acc;
    }, {} as Record<DifficultyLevelType, number>);

    return examData.questionDistribution.map(dist => {
      const difficulty = dist.difficulty as DifficultyLevelType;
      const available = availableByDifficulty[difficulty] || 0;
      const selected = selectedByDifficulty[difficulty] || 0;
      const required = dist.count;
      const shortage = Math.max(0, required - available);

      return {
        difficulty,
        required,
        available,
        selected,
        canFulfill: available >= required,
        shortage
      };
    });
  }, [examData.questionDistribution, examData.discipline, questions, selectedQuestions]);

  // Validações melhoradas
  const isFormValid = useMemo(() => (
    examData.title.trim() !== '' &&
    examData.discipline.trim() !== '' &&
    examData.totalQuestions > 0
  ), [examData.title, examData.discipline, examData.totalQuestions]);

  const isDistributionValid = useMemo(() => {
    const totalFromDistribution = examData.questionDistribution.reduce(
      (sum, dist) => sum + dist.count, 0
    );
    return totalFromDistribution === examData.totalQuestions;
  }, [examData.questionDistribution, examData.totalQuestions]);

  const canGenerateAutomatically = useMemo(() => {
    return distributionAnalysis.every(analysis => analysis.canFulfill) && isDistributionValid;
  }, [distributionAnalysis, isDistributionValid]);

  const isReadyForPreview = useMemo(() => (
    selectedQuestions.length === examData.totalQuestions &&
    (examData.selectionMode === 'manual' || isDistributionValid)
  ), [selectedQuestions.length, examData.totalQuestions, examData.selectionMode, isDistributionValid]);

  const availableQuestions = useMemo(() => {
    return examData.discipline
      ? questions.filter(q => q.discipline === examData.discipline)
      : questions;
  }, [examData.discipline, questions]);

  // Função melhorada para geração automática
  const generateAutomaticSelection = useCallback((): AutoSelectionResult => {
    const result: AutoSelectionResult = {
      success: false,
      selectedQuestions: [],
      analysis: distributionAnalysis,
      warnings: [],
      errors: []
    };

    // Verificar se a distribuição é válida
    if (!isDistributionValid) {
      result.errors.push('A soma das questões por dificuldade não corresponde ao total de questões.');
      return result;
    }

    // Verificar se há questões suficientes para cada dificuldade
    const insufficientDifficulties = distributionAnalysis.filter(analysis => !analysis.canFulfill);

    if (insufficientDifficulties.length > 0) {
      insufficientDifficulties.forEach(analysis => {
        result.errors.push(
          `Questões ${analysis.difficulty}: necessárias ${analysis.required}, disponíveis ${analysis.available} (faltam ${analysis.shortage})`
        );
      });
      return result;
    }

    // Gerar seleção automática
    const newSelectedQuestions: Question[] = [];
    const usedQuestionIds = new Set<number>();

    try {
      for (const dist of examData.questionDistribution) {
        const difficulty = dist.difficulty as DifficultyLevelType;
        const questionsOfDifficulty = availableQuestions
          .filter(q =>
            q.difficultyLevel === difficulty &&
            (q.id !== undefined && !usedQuestionIds.has(Number(q.id)))
          )

        if (questionsOfDifficulty.length < dist.count) {
          result.errors.push(`Não foi possível selecionar ${dist.count} questões de dificuldade ${difficulty}`);
          return result;
        }

        // Embaralhar e selecionar as questões necessárias
        const shuffledQuestions = [...questionsOfDifficulty]
          .sort(() => Math.random() - 0.5)
          .slice(0, dist.count);

        shuffledQuestions.forEach(q => {
          newSelectedQuestions.push(q);
          usedQuestionIds.add(Number(q.id));
        });

        // Adicionar aviso se há poucas questões disponíveis
        if (questionsOfDifficulty.length <= dist.count * 1.5) {
          result.warnings.push(
            `Poucas questões disponíveis para dificuldade ${difficulty} (${questionsOfDifficulty.length} disponíveis, ${dist.count} selecionadas)`
          );
        }
      }

      result.selectedQuestions = newSelectedQuestions;
      result.success = true;

      // Atualizar análise com a nova seleção
      result.analysis = distributionAnalysis.map(analysis => ({
        ...analysis,
        selected: newSelectedQuestions.filter(q => q.difficultyLevel === analysis.difficulty).length
      }));

    } catch (error) {
      result.errors.push('Erro interno durante a geração automática');
    }

    return result;
  }, [examData.questionDistribution, availableQuestions, distributionAnalysis, isDistributionValid]);

  // Atualização automática da distribuição quando questões selecionadas mudam
  useEffect(() => {
    const updatedDistribution = examData.questionDistribution.map(dist => {
      const difficulty = dist.difficulty as DifficultyLevelType;
      const selected = selectedQuestions.filter(q => q.difficultyLevel === difficulty).length;
      return { ...dist, selected };
    });

    setExamData(prev => ({
      ...prev,
      questionDistribution: updatedDistribution,
      questions: selectedQuestions
    }));
  }, [selectedQuestions]);

  // Funções de manipulação
  const updateExamConfig = useCallback((newConfig: Partial<Exam>) => {
    setExamData(prev => ({ ...prev, ...newConfig }));
  }, []);

  const navigateToStep = useCallback((step: number) => {
    if (step < 1 || step > 6) return;

    if (step === 4 && !isFormValid) {
      alert('Preencha todos os campos obrigatórios antes de continuar.');
      return;
    }
    setCurrentStep(step);
  }, [isFormValid]);

  const handleTotalQuestionsChange = useCallback((value: number) => {
    if (value < 1) value = 1;

    setExamData(prev => ({
      ...prev,
      totalQuestions: value
    }));

    // Limpar seleção se o total mudou significativamente
    if (selectedQuestions.length > value) {
      setSelectedQuestions(selectedQuestions.slice(0, value));
    }
  }, [selectedQuestions]);

  const handleDifficultyChange = useCallback((difficulty: DifficultyLevelType, value: number) => {
    if (value < 0) value = 0;

    setExamData(prev => {
      const updatedDistribution = prev.questionDistribution.map(dist => {
        if (dist.difficulty === difficulty) {
          return { ...dist, count: value };
        }
        return dist;
      });

      return {
        ...prev,
        questionDistribution: updatedDistribution
      };
    });

    // Se estamos em modo automático, regerar a seleção
    if (examData.selectionMode === 'random') {
      // Aguardar um tick para que a distribuição seja atualizada
      setTimeout(() => {
        const result = generateAutomaticSelection();
        if (result.success) {
          setSelectedQuestions(result.selectedQuestions);
          setLastAutoSelectionResult(result);
        }
      }, 0);
    }
  }, [examData.selectionMode, generateAutomaticSelection]);

  const handleSelectQuestion = useCallback((questions: Question | Question[]) => {
    setSelectedQuestions(prev => {
      const newQuestions = Array.isArray(questions) ? questions : [questions];
      const questionIds = newQuestions.map(q => q.id);

      // Se estamos substituindo toda a seleção (modo automático)
      if (Array.isArray(questions) && questions.length > 1) {
        return newQuestions;
      }

      // Modo manual: toggle individual
      const filteredPrev = prev.filter(q => !questionIds.includes(q.id));
      const shouldAdd = newQuestions.some(q => !prev.some(p => p.id === q.id));
      return shouldAdd ? [...filteredPrev, ...newQuestions] : filteredPrev;
    });
  }, []);

  const handleRandomSelection = useCallback(() => {
    const result = generateAutomaticSelection();

    if (result.success) {
      setSelectedQuestions(result.selectedQuestions);
      setLastAutoSelectionResult(result);

      // Mostrar avisos se houver
      if (result.warnings.length > 0) {
        console.warn('Avisos na seleção automática:', result.warnings);
      }
    } else {
      // Mostrar erros
      const errorMessage = result.errors.join('\n');
      alert(`Não foi possível gerar a seleção automática:\n${errorMessage}`);
      setSelectedQuestions([]);
      setLastAutoSelectionResult(result);
    }
  }, [generateAutomaticSelection]);

  // Função para validar e ajustar a distribuição automaticamente
  const autoAdjustDistribution = useCallback(() => {
    const totalQuestions = examData.totalQuestions;
    const availableByDifficulty = availableQuestions.reduce((acc, q) => {
      acc[q.difficultyLevel] = (acc[q.difficultyLevel] || 0) + 1;
      return acc;
    }, {} as Record<DifficultyLevelType, number>);

    // Distribuição proporcional baseada na disponibilidade
    const difficulties: DifficultyLevelType[] = ['easy', 'medium', 'hard'];
    const totalAvailable = Object.values(availableByDifficulty).reduce((sum, count) => sum + count, 0);

    if (totalAvailable === 0) return;

    const newDistribution = difficulties.map(difficulty => {
      const available = availableByDifficulty[difficulty] || 0;
      const proportion = available / totalAvailable;
      const idealCount = Math.round(proportion * totalQuestions);
      const maxPossible = Math.min(idealCount, available);

      return {
        difficulty,
        count: maxPossible,
        selected: 0
      };
    });

    // Ajustar para garantir que a soma seja exata
    const currentSum = newDistribution.reduce((sum, dist) => sum + dist.count, 0);
    const difference = totalQuestions - currentSum;

    if (difference !== 0) {
      // Distribuir a diferença começando pelas dificuldades com mais questões disponíveis
      const sortedByAvailable = newDistribution
        .map((dist, index) => ({ ...dist, index, available: availableByDifficulty[dist.difficulty as DifficultyLevelType] || 0 }))
        .sort((a, b) => b.available - a.available);

      let remaining = Math.abs(difference);
      const adjustment = difference > 0 ? 1 : -1;

      for (const dist of sortedByAvailable) {
        if (remaining === 0) break;

        const canAdjust = adjustment > 0
          ? dist.count < dist.available
          : dist.count > 0;

        if (canAdjust) {
          newDistribution[dist.index].count += adjustment;
          remaining--;
        }
      }
    }

    setExamData(prev => ({
      ...prev,
      questionDistribution: newDistribution
    }));
  }, [examData.totalQuestions, availableQuestions]);

  // Outras funções existentes...
  const regenerateAccessCode = useCallback(() => {
    const newCode = generateAccessCode();
    setExamData(prev => ({
      ...prev,
      accessCode: newCode
    }));
    return newCode;
  }, []);

  const validateAccessCode = useCallback((code: string) => {
    const validFormat = /^[A-Z0-9]{6}$/.test(code);
    if (!validFormat) {
      return {
        valid: false,
        message: 'O código deve ter 6 caracteres alfanuméricos maiúsculos'
      };
    }
    return { valid: true, message: 'Código válido' };
  }, []);

  const handleSubmitExam = useCallback(() => {
    const finalExam = {
      ...examData,
      questions: selectedQuestions,
      updatedAt: new Date(),
    };

    console.log('Exame finalizado:', finalExam);
    alert('Exame criado com sucesso!');
  }, [examData, selectedQuestions]);

  const handlePrintVariant = (variantId: string) => {
    const variant = examData.variants.find(v => v.id === variantId);
    if (!variant) return;
    console.log(`Imprimindo ${variant.name}`);
  };

  const handleDownloadVariant = (variantId: string) => {
    const variant = examData.variants.find(v => v.id === variantId);
    if (!variant) return;
    console.log(`Baixando ${variant.name}`);
  };

  const generateExamVariants = (exam: Exam): Exam => {
    if (!exam.variantsEnabled || exam.variantsCount < 1) {
      return { ...exam, variants: [] };
    }

    const variants: ExamVariant[] = [];
    const baseQuestions = [...exam.questions];

    for (let i = 0; i < exam.variantsCount; i++) {
      const variantLetter = String.fromCharCode(65 + i);
      const variantName = `Variante ${variantLetter}`;

      let questions = JSON.parse(JSON.stringify(baseQuestions));

      if (exam.shuffleQuestions) {
        questions = shuffleArray(questions);
      }

      if (exam.shuffleAlternatives) {
        questions = questions.map((q: Question) => ({
          ...q,
          alternatives: q.questionType === 'multiple_choice' ?
            shuffleArray(q.alternatives) :
            q.alternatives,
        }));
      }

      const answerKey: Record<number, string> = {};
      questions.forEach((q: Question, index: number) => {
        if (q.questionType === 'multiple_choice') {
          const correctIndex = q.alternatives.findIndex(alt => alt.isCorrect);
          answerKey[index + 1] = String.fromCharCode(65 + correctIndex);
        }
      });

      variants.push({
        id: `variant-${i}`,
        name: variantName,
        questions,
        answerKey,
      });
    }

    return { ...exam, variants };
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return {
    examData,
    currentStep,
    selectedQuestions,
    isFormValid,
    isReadyForPreview,
    availableQuestions,
    isDistributionValid,
    canGenerateAutomatically,
    distributionAnalysis,
    lastAutoSelectionResult,
    setExamData,
    updateExamConfig,
    handleTotalQuestionsChange,
    handleDifficultyChange,
    handleSelectQuestion,
    handleRandomSelection,
    navigateToStep,
    setSelectedQuestions,
    handleSubmitExam,
    handlePrintVariant,
    handleDownloadVariant,
    generateExamVariants,
    generateAutomaticSelection,
    autoAdjustDistribution,
    regenerateAccessCode,
    validateAccessCode
  };
};