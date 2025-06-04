import { useMemo } from 'react';
import { ClassPerformance, ExamSummary, StudentResult } from '../utils/types/Assessment';

interface InstitutionalMetrics {
  totalStudents: number;
  totalClasses: number;
  overallAverage: number;
  passingRate: number;
  attendanceRate: number;
  riskStudents: number;
  improvingStudents: number;
  decliningStudents: number;
  benchmarkComparison: {
    regional: number;
    national: number;
  };
  goals: {
    averageScore: number;
    passingRate: number;
    attendanceRate: number;
  };
}

export interface LearningGap {
  skill: string;
  category: string;
  gapPercentage: number;
  affectedStudents: number;
  affectedClasses: number;
  averageScore: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  recommendations: string[];
}

export interface PerformancePrediction {
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  currentScore: number;
  predictedScore: number;
  confidence: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  keyFactors: string[];
  interventionNeeded: boolean;
}

export interface ClassAlert {
  id: string;
  type: 'performance' | 'attendance' | 'risk';
  severity: 'critical' | 'high' | 'medium' | 'low';
  classId: string;
  className: string;
  message: string;
  studentsAffected: number;
  actionItems: string[];
  createdAt: Date;
  acknowledged: boolean;
}

export const useStrategicData = (
  examSummaries: ExamSummary[],
  classPerformances: ClassPerformance[],
  studentResults: StudentResult[],
  institutionalGoals = {
    averageScore: 70,
    passingRate: 85,
    attendanceRate: 90
  }
) => {
  return useMemo(() => {
    // 1. Cálculo das métricas institucionais
    const totalStudents = studentResults.length;
    const totalClasses = classPerformances.length;
    
    const institutionalMetrics: InstitutionalMetrics = {
      totalStudents,
      totalClasses,
      overallAverage: classPerformances.reduce((sum, c) => sum + c.averageScore, 0) / totalClasses || 0,
      passingRate: classPerformances.reduce((sum, c) => sum + c.passingRate, 0) / totalClasses || 0,
      attendanceRate: classPerformances.reduce((sum, c) => sum + (c.attendanceRate || 0), 0) / totalClasses || 0,
      riskStudents: studentResults.filter(s => {
        const riskLevel = s.riskAssessment?.level;
        return riskLevel === 'high' || riskLevel === 'critical';
    }).length,
      improvingStudents: studentResults.filter(s => s.progressTrend === 'improving').length,
      decliningStudents: studentResults.filter(s => s.progressTrend === 'declining').length,
      benchmarkComparison: {
        regional: 75, // Dados mockados - em produção viria de uma API
        national: 70
      },
      goals: institutionalGoals
    };

    // 2. Análise de gaps de aprendizagem
    const skillAnalysis: Record<string, { 
      total: number; 
      correct: number; 
      students: Set<string>;
      classes: Set<string>;
    }> = {};

    studentResults.forEach(student => {
      if (student.skillProfile) {
        Object.entries(student.skillProfile).forEach(([skill, score]) => {
          if (!skillAnalysis[skill]) {
            skillAnalysis[skill] = { 
              total: 0, 
              correct: 0, 
              students: new Set(),
              classes: new Set()
            };
          }
          skillAnalysis[skill].total += 1;
          skillAnalysis[skill].correct += score;
          skillAnalysis[skill].students.add(student.studentId);
          skillAnalysis[skill].classes.add(student.classId);
        });
      }
    });

    const learningGaps: LearningGap[] = Object.entries(skillAnalysis)
      .map(([skill, data]) => {
        const averageScore = data.correct / data.total;
        const gapPercentage = (1 - averageScore) * 100;
        
        return {
          skill,
          category: classifySkill(skill),
          gapPercentage,
          affectedStudents: data.students.size,
          affectedClasses: data.classes.size,
          averageScore: averageScore * 100,
          priority: determinePriority(gapPercentage, data.students.size),
          recommendations: generateRecommendations(skill, gapPercentage)
        };
      })
      .filter(gap => gap.gapPercentage > 20) // Considera apenas gaps relevantes
      .sort((a, b) => b.gapPercentage - a.gapPercentage);

    // 3. Cálculo de rankings e percentis
    const sortedClasses = [...classPerformances].sort((a, b) => b.averageScore - a.averageScore);
    const classRankings = sortedClasses.map((classPerf, index) => {
      const percentile = ((sortedClasses.length - index) / sortedClasses.length) * 100;
      const valueAdded = calculateValueAdded(classPerf, examSummaries);
      
      return {
        classId: classPerf.classId,
        className: classPerf.className,
        percentile,
        valueAdded,
        trendDirection: classPerf.performanceTrend || 'stable',
        performanceCategory: getPerformanceCategory(percentile),
        currentScore: classPerf.averageScore,
        baselineScore: classPerf.examResults[0]?.averageScore || classPerf.averageScore - 5
      };
    });

    // 4. Análise preditiva
    const predictions: PerformancePrediction[] = studentResults
      .map(student => {
        const currentScore = student.overallAverage;
        const predictedScore = predictNextScore(student);
        const confidence = calculatePredictionConfidence(student);
        const riskLevel = determineRiskLevel(student);
        const keyFactors = identifyKeyFactors(student);
        
        return {
          studentId: student.studentId,
          studentName: student.studentName,
          classId: student.classId,
          className: classPerformances.find(c => c.classId === student.classId)?.className || '',
          currentScore,
          predictedScore,
          confidence,
          riskLevel,
          keyFactors,
          interventionNeeded: needsIntervention(student)
        };
      })
      .filter(p => p.interventionNeeded)
      .sort((a, b) => {
        // Ordena por risco e depois por diferença preditiva
        const riskOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel] || 
               (b.predictedScore - b.currentScore) - (a.predictedScore - a.currentScore);
      });

    // 5. Geração de alertas
    const alerts = generateAlerts(classPerformances, predictions, institutionalGoals);

    return {
      metrics: institutionalMetrics,
      learningGaps,
      classRankings,
      predictions,
      alerts
    };

    // Funções auxiliares (implementadas dentro do useMemo para evitar dependências externas)
    function classifySkill(skill: string): string {
      // Lógica simplificada - em produção poderia usar um mapeamento mais complexo
      if (skill.toLowerCase().includes('matemática')) return 'Matemática';
      if (skill.toLowerCase().includes('leitura')) return 'Linguagens';
      if (skill.toLowerCase().includes('ciência')) return 'Ciências';
      return 'Outras';
    }

    function determinePriority(gapPercentage: number, affectedStudents: number): 'critical' | 'high' | 'medium' | 'low' {
      if (gapPercentage > 50 && affectedStudents > 20) return 'critical';
      if (gapPercentage > 35 || affectedStudents > 30) return 'high';
      if (gapPercentage > 25 || affectedStudents > 15) return 'medium';
      return 'low';
    }

    function generateRecommendations(skill: string, gapPercentage: number): string[] {
      const baseRecs = [
        `Reforço em ${skill}`,
        'Atividades práticas complementares',
        'Acompanhamento individualizado'
      ];
      
      if (gapPercentage > 40) {
        baseRecs.push('Intervenção pedagógica especializada');
        baseRecs.push('Plano de recuperação intensiva');
      }
      
      return baseRecs;
    }

    function calculateValueAdded(classPerf: ClassPerformance, exams: ExamSummary[]): number {
      if (exams.length < 2) return 0;
      
      const firstExam = exams[0].averageScore;
      const lastExam = exams[exams.length - 1].averageScore;
      const expectedGrowth = 5; // Crescimento esperado padrão (poderia ser configurável)
      
      return ((lastExam - firstExam) - expectedGrowth) / expectedGrowth * 100;
    }

    function getPerformanceCategory(percentile: number): 'top' | 'above-average' | 'average' | 'below-average' | 'bottom' {
      if (percentile >= 80) return 'top';
      if (percentile >= 60) return 'above-average';
      if (percentile >= 40) return 'average';
      if (percentile >= 20) return 'below-average';
      return 'bottom';
    }

    function predictNextScore(student: StudentResult): number {
      const trend = student.progressTrend === 'improving' ? 1.1 : 
                   student.progressTrend === 'declining' ? 0.9 : 1.0;
      const riskFactor = student.riskAssessment?.level === 'high' ? 0.85 : 1.0;
      return Math.min(100, student.overallAverage * trend * riskFactor);
    }

    function calculatePredictionConfidence(student: StudentResult): number {
      const examCount = student.examResults?.length || 1;
      const consistency = examCount > 1 ? 
        1 - (student.examResults?.reduce((sum, exam) => 
          sum + Math.abs(exam.totalScore - student.overallAverage), 0) / (examCount * student.overallAverage)) || 0 : 0.7;
      
      return Math.min(100, 70 + (consistency * 30) + (examCount * 2));
    }

    function determineRiskLevel(student: StudentResult): 'critical' | 'high' | 'medium' | 'low' {
      if (student.riskAssessment?.level === 'critical') return 'critical';
      if (student.overallAverage < 50) return 'high';
      if (student.overallAverage < 60 || student.riskAssessment?.level === 'medium') return 'medium';
      return 'low';
    }

    function identifyKeyFactors(student: StudentResult): string[] {
      const factors = [];
      
      if (student.overallAverage < 60) factors.push('Desempenho abaixo da média');
      if (student.attendanceRate && student.attendanceRate < 80) factors.push('Frequência baixa');
      if (student.progressTrend === 'declining') factors.push('Tendência de queda');
      if (student.riskAssessment?.factors) factors.push(...student.riskAssessment.factors);
      
      return factors.slice(0, 3);
    }

    function needsIntervention(student: StudentResult): boolean {
      return student.overallAverage < 60 || 
             student.riskAssessment?.level === 'high' || 
             student.progressTrend === 'declining';
    }

    function generateAlerts(
      classes: ClassPerformance[], 
      predictions: PerformancePrediction[],
      goals: { averageScore: number; passingRate: number; attendanceRate: number }
    ): ClassAlert[] {
      const classAlerts = classes.flatMap(classPerf => {
        const alerts: ClassAlert[] = [];
        
        // Alertas de desempenho
        if (classPerf.averageScore < goals.averageScore) {
          alerts.push({
            id: `perf-${classPerf.classId}`,
            type: 'performance',
            severity: classPerf.averageScore < 50 ? 'critical' : 'high',
            classId: classPerf.classId,
            className: classPerf.className,
            message: `Desempenho abaixo da meta (${classPerf.averageScore.toFixed(1)}% vs ${goals.averageScore}%)`,
            studentsAffected: Math.floor(classPerf.studentCount * (1 - classPerf.passingRate / 100)),
            actionItems: [
              'Revisar metodologia de ensino',
              'Implementar reforço escolar',
              'Reunião com coordenação pedagógica'
            ],
            createdAt: new Date(),
            acknowledged: false
          });
        }
        
        // Alertas de frequência
        if (classPerf.attendanceRate && classPerf.attendanceRate < goals.attendanceRate) {
          alerts.push({
            id: `att-${classPerf.classId}`,
            type: 'attendance',
            severity: classPerf.attendanceRate < 70 ? 'critical' : 'high',
            classId: classPerf.classId,
            className: classPerf.className,
            message: `Frequência abaixo da meta (${classPerf.attendanceRate.toFixed(1)}% vs ${goals.attendanceRate}%)`,
            studentsAffected: Math.floor(classPerf.studentCount * (1 - classPerf.attendanceRate / 100)),
            actionItems: [
              'Contatar responsáveis',
              'Investigar causas da ausência',
              'Implementar estratégias de engajamento'
            ],
            createdAt: new Date(),
            acknowledged: false
          });
        }
        
        return alerts;
      });
      
      // Alertas de alunos em risco
      const criticalStudents = predictions
        .filter(p => p.riskLevel === 'critical')
        .reduce((acc: ClassAlert[], student) => {
          const classAlert = acc.find(a => a.classId === student.classId);
          if (classAlert) {
            classAlert.studentsAffected++;
          } else {
            acc.push({
              id: `risk-${student.classId}`,
              type: 'risk',
              severity: 'critical',
              classId: student.classId,
              className: student.className,
              message: 'Alunos em risco crítico',
              studentsAffected: 1,
              actionItems: [
                'Acompanhamento individualizado',
                'Plano de intervenção pedagógica',
                'Reunião com equipe multidisciplinar'
              ],
              createdAt: new Date(),
              acknowledged: false
            });
          }
          return acc;
        }, []);
      
      return [...classAlerts, ...criticalStudents].sort((a, b) => {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      });
    }
  }, [examSummaries, classPerformances, studentResults, institutionalGoals]);
};