import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ExamResult } from '../../types/academic/Assessment';

interface UseExamResultsProps {
  examId?: string;
  studentId?: string;
  classId?: string;
}

interface ExamResultsStats {
  averageScore: number;
  medianScore: number;
  minScore: number;
  maxScore: number;
  standardDeviation: number;
  passingRate: number; // Porcentagem de alunos que atingiram nota mínima (configurável)
  questionPerformance: {
    questionId: string;
    averageScore: number;
    successRate: number;
  }[];
  scoreDistribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
}

interface UseExamResultsReturn {
  results: ExamResult[];
  isLoading: boolean;
  error: Error | null;
  stats: ExamResultsStats;
  fetchResults: (filters?: UseExamResultsProps) => Promise<void>;
  fetchResultsByExam: (examId: string) => Promise<void>;
  fetchResultsByClass: (classId: string) => Promise<void>;
  getStudentResult: (studentId: string) => ExamResult | undefined;
  getTopPerformers: (count?: number) => ExamResult[];
  getLowPerformers: (count?: number) => ExamResult[];
  getQuestionDifficulty: (questionId: string) => 'easy' | 'medium' | 'hard';
  exportResults: (format: 'csv' | 'pdf' | 'json') => Promise<string>;
  calculatePassingGrade: (minPassingScore?: number) => number;
}

// Define examResultService if it's not properly imported
const examResultService = {
  async getResultsByExamId(examId: string): Promise<ExamResult[]> {
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.classroom-system.com';
    const token = localStorage.getItem('auth_token');
    
    if (!token) throw new Error('User not authenticated');
    
    try {
      const response = await axios.get(`${API_BASE_URL}/exam-results/${examId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching results for exam ${examId}:`, error);
      throw error;
    }
  },

  async getResultsByClassId(classId: string): Promise<ExamResult[]> {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.classroom-system.com';
      const token = localStorage.getItem('auth_token');
      
      if (!token) throw new Error('User not authenticated');
      
      try {
        const response = await axios.get(`${API_BASE_URL}/exam-results/by-class/${classId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data;
      } catch (error) {
        console.error(`Error fetching results for class ${classId}:`, error);
        throw error;
      }
    },
  
  async exportResultsAsJson(results: ExamResult[], format: 'csv' | 'pdf' | 'json'): Promise<string> {
    // Implementation for export functionality
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.classroom-system.com';
    const token = localStorage.getItem('auth_token');
    
    if (!token) throw new Error('User not authenticated');
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/exam-results/export/${format}`,
        { results },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
          responseType: 'blob'
        }
      );
      
      // Create a URL for the blob and return it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      return url;
    } catch (error) {
      console.error(`Error exporting results as ${format}:`, error);
      throw error;
    }
  }
};

/**
 * Hook para gerenciar e analisar resultados de exames
 */
export const useExamResults = ({
  examId,
  studentId,
  classId,
}: UseExamResultsProps = {}): UseExamResultsReturn => {
  const [results, setResults] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Buscar resultados com base nos filtros
  const fetchResults = async (filters?: UseExamResultsProps) => {
    try {
      setIsLoading(true);
      setError(null);

      const targetExamId = filters?.examId || examId;
      if (!targetExamId) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      const fetchedResults = await examResultService.getResultsByExamId(targetExamId);
      // Filtrar por classId se necessário
      let filteredResults = fetchedResults;
      if (filters?.classId || classId) {
        // Essa implementação depende de como sua API está estruturada
        // Assumindo que o classId esteja disponível nos resultados
        // filteredResults = fetchedResults.filter(result => result.classId === (filters?.classId || classId));
      }

      // Filtrar por studentId se necessário
      if (filters?.studentId || studentId) {
        filteredResults = filteredResults.filter(result => 
          result.studentId === (filters?.studentId || studentId)
        );
      }

      setResults(filteredResults);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao buscar resultados'));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch results specifically by exam ID
  const fetchResultsByExam = async (targetExamId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const fetchedResults = await examResultService.getResultsByExamId(targetExamId);
      setResults(fetchedResults);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Erro ao buscar resultados para o exame ${targetExamId}`));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch results specifically by class ID
  const fetchResultsByClass = async (targetClassId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const fetchedResults = await examResultService.getResultsByClassId(targetClassId);
      setResults(fetchedResults);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Erro ao buscar resultados para a turma ${targetClassId}`));
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar resultados iniciais quando o hook for montado ou quando os filtros mudarem
  useEffect(() => {
    if (examId || studentId || classId) {
      fetchResults();
    }
  }, [examId, studentId, classId]);

  // Obter resultado de um estudante específico
  const getStudentResult = (targetStudentId: string) => {
    return results.find(result => result.studentId === targetStudentId);
  };

  // Obter os melhores desempenhos
  const getTopPerformers = (count = 5) => {
    return [...results]
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, count);
  };

  // Obter os piores desempenhos
  const getLowPerformers = (count = 5) => {
    return [...results]
      .sort((a, b) => a.totalScore - b.totalScore)
      .slice(0, count);
  };

  // Calcular estatísticas dos resultados
  const stats = useMemo((): ExamResultsStats => {
    if (results.length === 0) {
      return {
        averageScore: 0,
        medianScore: 0,
        minScore: 0,
        maxScore: 0,
        standardDeviation: 0,
        passingRate: 0,
        questionPerformance: [],
        scoreDistribution: [],
      };
    }

    // Extrair as notas totais
    const scores = results.map(result => result.totalScore);

    // Calcular média
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Calcular mediana
    const sortedScores = [...scores].sort((a, b) => a - b);
    const mid = Math.floor(sortedScores.length / 2);
    const medianScore = sortedScores.length % 2 === 0
      ? (sortedScores[mid - 1] + sortedScores[mid]) / 2
      : sortedScores[mid];

    // Obter mínimo e máximo
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);

    // Calcular desvio padrão
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) / scores.length;
    const standardDeviation = Math.sqrt(variance);

    // Calcular taxa de aprovação (assumindo 60% como nota de corte padrão)
    const passingThreshold = maxScore * 0.6;
    const passingCount = scores.filter(score => score >= passingThreshold).length;
    const passingRate = (passingCount / scores.length) * 100;

    // Analisar desempenho por questão
    const questionPerformance: ExamResultsStats['questionPerformance'] = [];

    // Mapear todas as questões únicas
    const allQuestionIds = new Set<string>();
    results.forEach(result => {
      result.answers.forEach(answer => {
        allQuestionIds.add(answer.questionId);
      });
    });

    // Calcular estatísticas para cada questão
    allQuestionIds.forEach(questionId => {
      const questionScores: number[] = [];
      let maxPossibleScore = 0;

      results.forEach(result => {
        const answer = result.answers.find(a => a.questionId === questionId);
        if (answer) {
          questionScores.push(answer.score);
          // Assumindo que a pontuação máxima possível seja a maior encontrada
          maxPossibleScore = Math.max(maxPossibleScore, answer.score);
        }
      });

      const avgScore = questionScores.reduce((sum, score) => sum + score, 0) / questionScores.length;
      const successCount = questionScores.filter(score => score >= maxPossibleScore * 0.7).length;
      const successRate = (successCount / questionScores.length) * 100;

      questionPerformance.push({
        questionId,
        averageScore: avgScore,
        successRate,
      });
    });

    // Calcular distribuição de notas
    const ranges = [
      { min: 0, max: 20, label: '0-20%' },
      { min: 20, max: 40, label: '21-40%' },
      { min: 40, max: 60, label: '41-60%' },
      { min: 60, max: 80, label: '61-80%' },
      { min: 80, max: 100, label: '81-100%' },
    ];

    const scoreDistribution = ranges.map(range => {
      const normalizedMin = (range.min / 100) * maxScore;
      const normalizedMax = (range.max / 100) * maxScore;
      const count = scores.filter(score => score > normalizedMin && score <= normalizedMax).length;
      const percentage = (count / scores.length) * 100;

      return {
        range: range.label,
        count,
        percentage,
      };
    });

    return {
      averageScore,
      medianScore,
      minScore,
      maxScore,
      standardDeviation,
      passingRate,
      questionPerformance,
      scoreDistribution,
    };
  }, [results]);

  // Determinar o nível de dificuldade de uma questão com base no desempenho
  const getQuestionDifficulty = (questionId: string): 'easy' | 'medium' | 'hard' => {
    const performance = stats.questionPerformance.find(q => q.questionId === questionId);

    if (!performance) return 'medium';

    if (performance.successRate >= 70) return 'easy';
    if (performance.successRate <= 30) return 'hard';
    return 'medium';
  };

  // Exportar resultados em diferentes formatos
  const exportResults = async (format: 'csv' | 'pdf' | 'json'): Promise<string> => {
    try {
      return await examResultService.exportResultsAsJson(results, format);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Erro ao exportar resultados'));
      throw error;
    }
  };

  // Calcular nota de corte com base nos resultados
  const calculatePassingGrade = (minPassingScore?: number): number => {
    if (minPassingScore !== undefined) {
      return minPassingScore;
    }

    // Se não for fornecida, calcular com base na distribuição (60% da pontuação máxima)
    return stats.maxScore * 0.6;
  };

  return {
    results,
    isLoading,
    error,
    stats,
    fetchResults,
    fetchResultsByExam,
    fetchResultsByClass,
    getStudentResult,
    getTopPerformers,
    getLowPerformers,
    getQuestionDifficulty,
    exportResults,
    calculatePassingGrade,
  };
};