// hooks/useExamCreator.ts corrigido
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Exam, ExamTypes, ExamVariant } from '../utils/types/Exam';
import { Question, DifficultyLevelType } from '../utils/types/Question';
import { generateAccessCode } from '../utils/examHelpers';

export const useExamCreator = () => {
  const inittialExamData: Exam = {
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
      { difficulty: 'easy', count: 4, selected: 0 },
      { difficulty: 'medium', count: 4, selected: 0 },
      { difficulty: 'hard', count: 2, selected: 0 },
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
  }
  // Step atual do processo de criação
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Dados do exame sendo criado
  const [examData, setExamData] = useState<Exam>(inittialExamData);

  // Questões selecionadas
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const questions = examData.questions;

  // Validações
  // Verificar se o formulário tem dados mínimos válidos
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

  // Verificar se já pode pré-visualizar o exame
  const isReadyForPreview = useMemo(() => (
    selectedQuestions.length === examData.totalQuestions &&
    (examData.selectionMode === 'manual' || isDistributionValid)
  ), [selectedQuestions.length, examData.totalQuestions, examData.selectionMode, isDistributionValid]);

  // Filtra questões baseado na disciplina selecionada
  const filteredQuestions = useMemo(() => {
    return examData.discipline
      ? examData.questions.filter(q => q.discipline === examData.discipline)
      : examData.questions;
  }, [examData.discipline, examData.questions]);

  // Atualiza a distribuição de dificuldade quando as questões selecionadas mudam
  useEffect(() => {
    const updatedDistribution = examData.questionDistribution.map(dist => ({
      ...dist,
      selected: selectedQuestions.filter(q => q.difficultyLevel === dist.difficulty).length
    }));

    setExamData(prev => ({
      ...prev,
      questionDistribution: updatedDistribution,
      questions: selectedQuestions
    }));
  }, [selectedQuestions]);

  // Funções de manipulação do exame
  const updateExamConfig = useCallback((newConfig: Partial<Exam>) => {
    setExamData(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Navegação
  // Função para navegar entre os passos
  const navigateToStep = useCallback((step: number) => {
    // Validação para evitar passos inválidos
    if (step < 1 || step > 6) return;

    // Validação específica para certos passos
    if (step === 4 && !isFormValid) {
      alert('Preencha todos os campos obrigatórios antes de continuar.');
      return;
    }
    setCurrentStep(step);
  }, [isFormValid]);

  // Função para alterar o total de questões
  const handleTotalQuestionsChange = useCallback((value: number) => {
    // Não permitir valor menor que 1
    if (value < 1) value = 1;

    setExamData(prev => ({
      ...prev,
      totalQuestions: value
    }));
  }, []);

  // Função para alterar a distribuição de dificuldade
  const handleDifficultyChange = useCallback((difficulty: DifficultyLevelType, value: number) => {
    // Não permitir valor negativo
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
  }, []);

  // Função para regenerar o código de acesso
  const regenerateAccessCode = useCallback(() => {
    const newCode = generateAccessCode();
    setExamData(prev => ({
      ...prev,
      accessCode: newCode
    }));
    return newCode;
  }, []);

  // Função para validar o código de acesso
  const validateAccessCode = useCallback((code: string) => {
    // Códigos devem ter 6 caracteres alfanuméricos maiúsculos
    const validFormat = /^[A-Z0-9]{6}$/.test(code);
    if (!validFormat) {
      return {
        valid: false,
        message: 'O código deve ter 6 caracteres alfanuméricos maiúsculos'
      };
    }

    // Simular validação de unicidade (em produção seria uma chamada à API)
    return { valid: true, message: 'Código válido' };
  }, []);

  // Função para enviar o exame
  const handleSubmitExam = useCallback(() => {
    // Atualiza as questões do exame com as selecionadas
    const finalExam = {
      ...examData,
      questions: selectedQuestions,
      updatedAt: new Date(),
    };

    console.log('Exame finalizado:', finalExam);
    // Aqui você implementaria a lógica para salvar o exame no backend
    alert('Exame criado com sucesso!');
    // Redirecionar para a lista de exames, por exemplo
  }, [examData, selectedQuestions]);

  // Verificar se a distribuição de dificuldade está correta
  const isDifficultyDistributionValid = useMemo(() => {
    const totalFromDistribution = examData.questionDistribution.reduce(
      (sum, dist) => sum + dist.count, 0
    );

    return totalFromDistribution === examData.totalQuestions;
  }, [examData.questionDistribution, examData.totalQuestions]);

  // Altera o modo de seleção de questões
  const setSelectionMode = useCallback((mode: 'manual' | 'random') => {
    setExamData(prev => ({
      ...prev,
      selectionMode: mode
    }));

    // Limpa as questões selecionadas quando muda o modo
    setSelectedQuestions([]);
  }, []);

  const handleSelectQuestion = useCallback((questions: Question | Question[]) => {
    setSelectedQuestions(prev => {
      const newQuestions = Array.isArray(questions) ? questions : [questions];
      const questionIds = newQuestions.map(q => q.id);

      // Remove as questões que estão sendo adicionadas (caso já existam)
      const filteredPrev = prev.filter(q => !questionIds.includes(q.id));

      // Adiciona as novas questões (se não estiverem todas presentes)
      const shouldAdd = newQuestions.some(q => !prev.some(p => p.id === q.id));
      return shouldAdd ? [...filteredPrev, ...newQuestions] : filteredPrev;
    });
  }, []);

  const availableQuestions = useMemo(() => {
    return examData.discipline
      ? questions.filter(q => q.discipline === examData.discipline)
      : questions;
  }, [examData.discipline, questions]);

  const handleRandomSelection = useCallback(() => {
    const { questionDistribution } = examData;
    const newSelectedQuestions: Question[] = [];

    questionDistribution.forEach(dist => {
      const questionsOfDifficulty = filteredQuestions
        .filter(q => q.difficultyLevel === dist.difficulty)
        .sort(() => Math.random() - 0.5)
        .slice(0, dist.count);

      newSelectedQuestions.push(...questionsOfDifficulty);
    });

    setSelectedQuestions(newSelectedQuestions);
  }, [examData.questionDistribution, filteredQuestions]);

  const handlePrintVariant = (variantId: string) => {
    const variant = examData.variants.find(v => v.id === variantId);
    if (!variant) return;

    // Implemente a lógica de impressão aqui
    // Pode usar bibliotecas como react-to-print
    console.log(`Imprimindo ${variant.name}`);
  };

  const handleDownloadVariant = (variantId: string) => {
    const variant = examData.variants.find(v => v.id === variantId);
    if (!variant) return;

    // Implemente a lógica de download aqui
    // Pode gerar PDF com bibliotecas como jspdf ou html2pdf
    console.log(`Baixando ${variant.name}`);
  };

  const generateExamVariants = (exam: Exam): Exam => {
    if (!exam.variantsEnabled || exam.variantsCount < 1) {
      return { ...exam, variants: [] };
    }

    const variants: ExamVariant[] = [];
    const baseQuestions = [...exam.questions];

    for (let i = 0; i < exam.variantsCount; i++) {
      const variantLetter = String.fromCharCode(65 + i); // A, B, C, ...
      const variantName = `Variante ${variantLetter}`;

      // Clone as questões para não modificar a original
      let questions = JSON.parse(JSON.stringify(baseQuestions));

      // Embaralhar questões se configurado
      if (exam.shuffleQuestions) {
        questions = shuffleArray(questions);
      }

      // Embaralhar alternativas se configurado
      if (exam.shuffleAlternatives) {
        questions = questions.map((q: Question) => ({
          ...q,
          alternatives: q.questionType === 'multiple_choice' ?
            shuffleArray(q.alternatives) :
            q.alternatives,
        }));
      }

      // Gerar gabarito
      const answerKey: Record<number, string> = {};
      questions.forEach((q: Question, index: number) => {
        if (q.questionType === 'multiple_choice') {
          const correctIndex = q.alternatives.findIndex(alt => alt.isCorrect);
          answerKey[index + 1] = String.fromCharCode(65 + correctIndex); // A, B, C, ...
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

  // Função auxiliar para embaralhar arrays
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
    filteredQuestions,
    isFormValid,
    isReadyForPreview,
    availableQuestions,
    isDistributionValid,
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
    generateExamVariants
  };
};