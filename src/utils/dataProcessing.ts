import { ClassPerformance, ExamSummary, StudentResult } from '../types/academic/Assessment';

interface ProcessedProgressData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
  }[];
}

interface ProcessedRadarData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    pointBackgroundColor: string;
  }[];
}

/**
 * Processa dados de progresso temporal para gráficos
 */
export const processProgressData = (classPerformance: ClassPerformance): ProcessedProgressData => {
  const sortedExams = classPerformance.examResults
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return {
    labels: sortedExams.map(exam => exam.title),
    datasets: [
      {
        label: 'Média da Turma',
        data: sortedExams.map(exam => exam.averageScore),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Taxa de Aprovação',
        data: sortedExams.map(exam => exam.passingRate),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.1
      }
    ]
  };
};

/**
 * Processa dados de radar chart baseado em habilidades
 */
export const processRadarData = (classPerformance: ClassPerformance): ProcessedRadarData => {
  const skillCategories = Object.keys(classPerformance.skillBreakdown);
  
  return {
    labels: skillCategories,
    datasets: [
      {
        label: classPerformance.className,
        data: skillCategories.map(skill => classPerformance.skillBreakdown[skill]),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)'
      }
    ]
  };
};

/**
 * Processa dados de distribuição de notas
 */
export const processScoreDistribution = (examSummaries: ExamSummary[]) => {
  // Agrupa notas em faixas
  const scoreRanges = ['0-20', '21-40', '41-60', '61-80', '81-100'];
  const distribution = scoreRanges.map(() => 0);

  examSummaries.forEach(exam => {
    exam.results?.forEach(result => {
      const score = result.totalScore;
      const rangeIndex = Math.min(Math.floor(score / 20), 4);
      distribution[rangeIndex]++;
    });
  });

  return {
    labels: scoreRanges,
    datasets: [
      {
        label: 'Distribuição de Notas',
        data: distribution,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };
};

/**
 * Calcula métricas de risco para estudantes
 */
export const calculateStudentRisk = (student: StudentResult): 'low' | 'medium' | 'high' => {
  let riskScore = 0;

  // Fatores de risco
  if (student.overallAverage < 50) riskScore += 3;
  else if (student.overallAverage < 70) riskScore += 2;

  if (student.attendanceRate && student.attendanceRate < 75) riskScore += 2;
  if (student.progressTrend === 'declining') riskScore += 2;

  // Classificação
  if (riskScore >= 5) return 'high';
  if (riskScore >= 3) return 'medium';
  return 'low';
};

/**
 * Filtra e agrega dados por período
 */
export const filterByPeriod = (
  classes: ClassPerformance[], 
  period: string
): ClassPerformance[] => {
  if (period === 'all') return classes;
  
  return classes.filter(c => c.academicPeriod === period);
};

/**
 * Calcula tendência de performance
 */
export const calculatePerformanceTrend = (
  exams: { averageScore: number; date: Date | string }[]
): 'improving' | 'declining' | 'stable' => {
  if (exams.length < 2) return 'stable';

  // Garantir que as datas são objetos Date
  const processedExams = exams.map(exam => ({
    ...exam,
    date: typeof exam.date === 'string' ? new Date(exam.date) : exam.date
  }));

  // Ordenar por data
  const sortedExams = [...processedExams].sort((a, b) => 
    a.date.getTime() - b.date.getTime()
  );

  const firstHalf = sortedExams.slice(0, Math.ceil(sortedExams.length / 2));
  const secondHalf = sortedExams.slice(Math.floor(sortedExams.length / 2));
  
  const firstAvg = firstHalf.reduce((sum, exam) => sum + exam.averageScore, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, exam) => sum + exam.averageScore, 0) / secondHalf.length;
  
  const difference = secondAvg - firstAvg;
  
  if (difference > 5) return 'improving';
  if (difference < -5) return 'declining';
  return 'stable';
};

export const generateHeatmapData = (classPerformance: ClassPerformance) => {
  const skills = Object.keys(classPerformance.skillBreakdown);
  const subjects = classPerformance.subjects || [];
  
  // Matriz de correlação entre habilidades e disciplinas
  const data = skills.map(skill => {
    return subjects.map(subject => {
      // Lógica para calcular correlação (exemplo simplificado)
      const relevantExams = classPerformance.examResults
        .filter(exam => exam.subject === subject.name);
      
      const correlation = relevantExams.length > 0 
        ? Math.random() * 2 - 1 // Exemplo - substituir por cálculo real
        : 0;
      
      return correlation;
    });
  });

  return {
    labels: {
      x: subjects,
      y: skills
    },
    data
  };
};

export const generateCohortAnalysis = (
  classPerformances: ClassPerformance[],
  cohortType: 'week' | 'month' | 'semester' = 'month'
) => {
  // Agrupar por período
  const cohorts = classPerformances.reduce((acc, curr) => {
    const period = getPeriodKey(curr.academicPeriod, cohortType);
    if (!acc[period]) {
      acc[period] = [];
    }
    acc[period].push(curr);
    return acc;
  }, {} as Record<string, ClassPerformance[]>);

  // Processar métricas para cada coorte
  return Object.entries(cohorts).map(([period, classes]) => ({
    period,
    averageScore: classes.reduce((sum, c) => sum + c.averageScore, 0) / classes.length,
    passingRate: classes.reduce((sum, c) => sum + c.passingRate, 0) / classes.length,
    studentCount: classes.reduce((sum, c) => sum + c.studentCount, 0)
  }));
};

export const getPeriodKey = (dateString: string | undefined, cohortType: string): string => {
  if (!dateString) return 'Sem período';
  
  const date = new Date(dateString);
  
  switch(cohortType) {
    case 'week':
      const weekNumber = Math.ceil(date.getDate() / 7);
      return `${date.getFullYear()}-W${weekNumber}`;
    case 'month':
      return `${date.getFullYear()}-${date.getMonth() + 1}`;
    case 'quarter':
      const quarter = Math.floor(date.getMonth() / 3) + 1;
      return `${date.getFullYear()}-Q${quarter}`;
    case 'semester':
      const semester = Math.floor(date.getMonth() / 6) + 1;
      return `${date.getFullYear()}-S${semester}`;
    case 'year':
      return date.getFullYear().toString();
    default:
      return date.toISOString().split('T')[0];
  }
};

// utils/dataProcessing.ts
export const predictPerformance = (
  student: StudentResult,
  exams: ExamSummary[]
): {
  predictedScore: number;
  confidence: number;
  keyAreas: string[];
} => {
  // Obter resultados do aluno
  const studentResults = exams
    .flatMap(exam => exam.results || [])
    .filter(result => result.studentId === student.studentId);
  
  if (studentResults.length === 0) {
    return {
      predictedScore: student.overallAverage,
      confidence: 0,
      keyAreas: []
    };
  }

  const trend = calculatePerformanceTrend(
    studentResults.map(result => ({
      averageScore: result.totalScore,
      date: result.completedAt
    }))
  );
  
  // Cálculo simplificado (substituir por modelo real)
  const predictedScore = trend === 'improving' 
    ? student.overallAverage * 1.1 
    : trend === 'declining' 
      ? student.overallAverage * 0.9 
      : student.overallAverage;
  
  return {
    predictedScore: Math.min(100, Math.max(0, predictedScore)),
    confidence: Math.min(0.9, studentResults.length / 10), // Baseado na quantidade de dados
    keyAreas: Object.entries(student.skillProfile || {})
      .sort((a, b) => a[1] - b[1])
      .slice(0, 2)
      .map(([skill]) => skill)
  };
};