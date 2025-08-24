import { Alternative, DifficultyLevelType, Question } from "../types/evaluation/Question";

export const calculateAverageDifficulty = (questions: Question[]): DifficultyLevelType => {
  if (!questions.length) return 'easy'; // fallback para lista vazia

  const difficultyLevels: Record<DifficultyLevelType, number> = {
    easy: 1,
    medium: 2,
    hard: 3
  };

  const total = questions.reduce((sum, q) => sum + difficultyLevels[q.difficultyLevel], 0);
  const avg = total / questions.length;

  if (avg < 1.5) return 'easy';
  if (avg < 2.5) return 'medium';
  return 'hard';
};


export const getMostCommonValue = <T,>(items: T[]): T | string => {
  const counts = items.reduce((acc, item) => {
    acc[String(item)] = (acc[String(item)] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
};

export const shuffleAlternatives = (alternatives: Alternative[]): Alternative[] => {
  return [...alternatives].sort(() => Math.random() - 0.5);
};

export const getMostCommonDiscipline = (questions: Question[]): string => {
  const disciplineCounts = questions.reduce((acc, q) => {
    acc[q.discipline] = (acc[q.discipline] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(disciplineCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
};

export const getCombinedTags = (questions: Question[]): string[] => {
  const allTags = questions.flatMap(q => q.tags || []);
  return Array.from(new Set(allTags));
};

export const createQuestionVariant = ((baseQuestion: Question): Question => {
  return {
    ...baseQuestion,
    id: `variant-${Date.now()}-${baseQuestion.id}`,
    contentId: `variant-${Date.now()}-${baseQuestion.contentId}`,
    statement: `${baseQuestion.statement} (Variação)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isVariant: true,
    sourceQuestionId: baseQuestion.id,
    // Modifique outros campos conforme necessário para a variação
    alternatives: shuffleAlternatives(baseQuestion.alternatives), // Exemplo: embaralhar alternativas
  };
});


export const combineQuestions = (questionIds: string[], questions: Question[]): Question => {
  const selectedQuestionsData = questions.filter(q => q.id !== undefined && questionIds.includes(q.id.toString()));
  // Obter as questões selecionadas
  const difficulty = calculateAverageDifficulty(selectedQuestionsData);

  const totalAttempts = selectedQuestionsData.reduce((sum, q) => sum + (q.answerStats?.totalAttempts || 0), 0);
  const correctAttempts = selectedQuestionsData.reduce((sum, q) => sum + (q.answerStats?.correctAttempts || 0), 0);
  const totalRating = selectedQuestionsData.reduce((sum, q) => sum + (q.rating || 0), 0);
  const avgRating = selectedQuestionsData.length > 0 ? totalRating / selectedQuestionsData.length : 0;

  const newCompositeQuestion: Question = {
    // Identificação
    id: `composite-${Date.now()}`,
    contentId: `composite-${Date.now()}`,

    // Conteúdo principal
    statement: `Questão composta (${questionIds.length} partes):\n\n${selectedQuestionsData.map((q, i) => `${i + 1}. ${q.statement}`).join('\n\n')
      }`,
    questionType: 'composite',
    explanation: 'Esta é uma questão composta criada a partir de outras questões.',

    difficultyLevel: difficulty,
    rating: Math.round(avgRating * 2) / 2, // Arredonda para 0.5

    // Metadados
    discipline: getMostCommonDiscipline(selectedQuestionsData),
    tags: getCombinedTags(selectedQuestionsData),
    source: 'Sistema (Combinada)',
    accessDate: new Date().toISOString(),


    // Estatísticas
    answerStats: {
      totalAttempts,
      correctAttempts
    },
    correctRate: totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0,
    timesUsed: 0,
    usageCount: 0,

    // Alternativas e respostas
    alternatives: [],
    correctAnswer: undefined,
    correctAnswers: undefined,
    answers: [],

    // Layout e visual
    optionsLayout: 'one-column',
    imageUrl: selectedQuestionsData.find(q => q.imageUrl)?.imageUrl || undefined,

    // Datas
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    // Status e favoritos
    status: 'active',
    isFavorite: selectedQuestionsData.some(q => q.isFavorite),
    pinned: selectedQuestionsData.every(q => q.pinned),

    // Questão composta
    isComposite: true,
    componentQuestions: questionIds
  };

  return newCompositeQuestion;
};