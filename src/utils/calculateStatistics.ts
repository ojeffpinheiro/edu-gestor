import { ExamResult } from '../types/academic/Assessment';

interface StatisticsData {
  mean: number;
  median: number;
  standardDeviation: number;
  min: number;
  max: number;
  quartiles: { 
    q1: number; 
    q2: number; 
    q3: number; 
  };
  passRate?: number;
  correctRate?: number;
  distributionData: Array<{
    range: string;
    count: number;
  }>;
  performanceBySection: Array<{
    section: string;
    averageScore: number;
  }>;
  timeSpentData: Array<{
    range: string;
    count: number;
  }>;
  questionAnalysis?: Array<{
    questionId: string;
    successRate: number;
    averageTime: number;
  }>;
}

/**
 * Calcula estatísticas detalhadas para resultados de exames
 * @param results Resultados de exames
 * @param metric Métrica para analisar (score, percentCorrect, timeSpent)
 * @returns Objeto com estatísticas calculadas
 */
export const calculateStatistics = (results: ExamResult[], metric: string = 'score'): StatisticsData => {
  if (!results.length) {
    return {
      mean: 0,
      median: 0,
      standardDeviation: 0,
      min: 0,
      max: 0,
      quartiles: { q1: 0, q2: 0, q3: 0 },
      distributionData: [],
      performanceBySection: [],
      timeSpentData: []
    };
  }

  // Extrair valores com base na métrica selecionada
  let values: number[] = [];
  
  switch (metric) {
    case 'score':
      values = results.map(result => result.totalScore);
      break;
    case 'percentCorrect':
      // Assumindo que cada resposta tenha uma pontuação máxima possível
      values = results.map(result => {
        const totalPossiblePoints = result.answers.length > 0 ? result.answers.length * 100 : 100;
        return (result.totalScore / totalPossiblePoints) * 100;
      });
      break;
    case 'timeSpent':
      // Calculando tempo gasto (em minutos) se disponível nos resultados
      // Assumindo que há informação de tempo em completedAt vs. algum campo de início
      values = results.map(result => {
        // Simulando extração de tempo, ajuste conforme seus dados reais
        const timeSpent = Math.random() * 90; // Simulação: entre 0 e 90 minutos
        return timeSpent;
      });
      break;
    default:
      values = results.map(result => result.totalScore);
  }

  // Ordenar valores para cálculos estatísticos
  const sortedValues = [...values].sort((a, b) => a - b);
  
  // Estatísticas básicas
  const min = sortedValues[0];
  const max = sortedValues[sortedValues.length - 1];
  const mean = sortedValues.reduce((sum, val) => sum + val, 0) / sortedValues.length;
  
  // Mediana
  const midIndex = Math.floor(sortedValues.length / 2);
  const median = sortedValues.length % 2 === 0
    ? (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2
    : sortedValues[midIndex];
  
  // Desvio padrão
  const variance = sortedValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / sortedValues.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Quartis
  const q1Index = Math.floor(sortedValues.length / 4);
  const q3Index = Math.floor((3 * sortedValues.length) / 4);
  
  const quartiles = {
    q1: sortedValues[q1Index],
    q2: median,
    q3: sortedValues[q3Index]
  };
  
  // Taxa de aprovação (assumindo 60% do máximo como nota de corte)
  const passingThreshold = max * 0.6;
  const passCount = sortedValues.filter(val => val >= passingThreshold).length;
  const passRate = (passCount / sortedValues.length) * 100;
  
  // Taxa de acerto (média das taxas de acerto por resposta)
  let correctCount = 0;
  let totalQuestions = 0;
  
  results.forEach(result => {
    result.answers.forEach(answer => {
      // Assumindo um score máximo de 100 por questão
      if (answer.score >= 70) {
        correctCount++;
      }
      totalQuestions++;
    });
  });
  
  const correctRate = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  
  // Distribuição de pontuações
  const distributionRanges = [
    { min: 0, max: 20, label: '0-20%' },
    { min: 20, max: 40, label: '21-40%' },
    { min: 40, max: 60, label: '41-60%' },
    { min: 60, max: 80, label: '61-80%' },
    { min: 80, max: 100, label: '81-100%' }
  ];
  
  const distributionData = distributionRanges.map(range => {
    const normalizedMin = (range.min / 100) * max;
    const normalizedMax = (range.max / 100) * max;
    const count = sortedValues.filter(val => val > normalizedMin && val <= normalizedMax).length;
    
    return {
      range: range.label,
      count
    };
  });
  
  // Desempenho por seção (simulado)
  // Na implementação real, você obteria esses dados da estrutura do exame
  const sectionNames = ['Section A', 'Section B', 'Section C', 'Section D'];
  
  const performanceBySection = sectionNames.map(section => {
    // Simulando dados de seção
    const averageScore = Math.floor(50 + Math.random() * 40); // Simulação entre 50-90%
    return {
      section,
      averageScore
    };
  });
  
  // Distribuição de tempo gasto
  const timeRanges = [
    { min: 0, max: 15, label: '0-15 min' },
    { min: 15, max: 30, label: '15-30 min' },
    { min: 30, max: 45, label: '30-45 min' },
    { min: 45, max: 60, label: '45-60 min' },
    { min: 60, max: 100, label: '60+ min' }
  ];
  
  const timeSpentData = timeRanges.map(range => {
    // Usando os mesmos valores de antes se a métrica for timeSpent, ou simulando
    const timeValues = metric === 'timeSpent' ? values : results.map(() => Math.random() * 90);
    const count = timeValues.filter(val => val >= range.min && val < range.max).length;
    
    return {
      range: range.label,
      count
    };
  });
  
  // Análise de questões
  const questionIds = new Set<string>();
  results.forEach(result => {
    result.answers.forEach(answer => {
      questionIds.add(answer.questionId);
    });
  });
  
  const questionAnalysis = Array.from(questionIds).map(qId => {
    // Coletar dados sobre essa questão específica
    let successCount = 0;
    let totalAttempts = 0;
    let totalTime = 0;
    
    results.forEach(result => {
      const answer = result.answers.find(a => a.questionId === qId);
      if (answer) {
        // Assumindo pontuação máxima de 100 por questão
        if (answer.score >= 70) {
          successCount++;
        }
        totalAttempts++;
        
        // Simulando tempo médio gasto
        totalTime += Math.floor(30 + Math.random() * 120); // Entre 30 e 150 segundos
      }
    });
    
    const successRate = totalAttempts > 0 ? (successCount / totalAttempts) * 100 : 0;
    const averageTime = totalAttempts > 0 ? totalTime / totalAttempts : 0;
    
    return {
      questionId: qId,
      successRate,
      averageTime
    };
  });
  
  return {
    mean,
    median,
    standardDeviation,
    min,
    max,
    quartiles,
    passRate,
    correctRate,
    distributionData,
    performanceBySection,
    timeSpentData,
    questionAnalysis
  };
};