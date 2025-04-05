import React, { useState, useEffect } from 'react';

import { Exam, ExamResult } from '../../utils/types/Assessment';

import { LoadingStates } from '../../components/shared/LoadingStates';
import ExportButton from '../../components/shared/ExportButton';

import ReportGenerator from '../../components/Assessment/Results/ReportGenerator';
import ResultsStatistics from '../../components/Assessment/Results/ResultsStatistics';
import { Select } from '../../styles/inputs';
import { Button } from '../../styles/buttons';

// Mock data for testing
const mockExams: Exam[] = [
  {
    id: 'exam1',
    title: 'Avaliação de Matemática - 1º Bimestre',
    description: 'Avaliação cobrindo equações, geometria e álgebra',
    questions: ['q1', 'q2', 'q3', 'q4', 'q5'],
    classIds: ['class1', 'class2'],
    totalPoints: 100,
    qrCode: 'qr-code-data-url',
    barCode: 'bar-code-data',
    password: 'mat2023',
    createdAt: new Date('2023-03-15'),
    createdBy: 'prof1',
    questionDistribution: [
      { categories: ['algebra'], difficulty: 'medium', count: 3 },
      { categories: ['geometry'], difficulty: 'hard', count: 2 }
    ],
    useQRCode: true,
    useBarCode: false,
    requirePassword: true,
    variants: []
  },
  {
    id: 'exam2',
    title: 'Avaliação de Português - 1º Bimestre',
    description: 'Avaliação de interpretação textual e gramática',
    questions: ['q6', 'q7', 'q8', 'q9', 'q10'],
    classIds: ['class1', 'class3'],
    totalPoints: 100,
    qrCode: 'qr-code-data-url-2',
    barCode: 'bar-code-data-2',
    password: 'port2023',
    createdAt: new Date('2023-03-18'),
    createdBy: 'prof2',
    questionDistribution: [
      { categories: ['grammar'], difficulty: 'easy', count: 2 },
      { categories: ['interpretation'], difficulty: 'medium', count: 3 }
    ],
    useQRCode: false,
    useBarCode: true,
    requirePassword: true,
    variants: []
  }
];

// Mock results for testing
const mockResults: ExamResult[] = [
  {
    id: 'result1',
    examId: 'exam1',
    studentId: 'student1',
    answers: [
      { questionId: 'q1', answer: 'resposta1', score: 20 },
      { questionId: 'q2', answer: 'resposta2', score: 15 },
      { questionId: 'q3', answer: 'resposta3', score: 18 },
      { questionId: 'q4', answer: 'resposta4', score: 10 },
      { questionId: 'q5', answer: 'resposta5', score: 20 }
    ],
    totalScore: 83,
    completedAt: new Date('2023-03-20')
  },
  {
    id: 'result2',
    examId: 'exam1',
    studentId: 'student2',
    answers: [
      { questionId: 'q1', answer: 'resposta1', score: 18 },
      { questionId: 'q2', answer: 'resposta2', score: 12 },
      { questionId: 'q3', answer: 'resposta3', score: 15 },
      { questionId: 'q4', answer: 'resposta4', score: 8 },
      { questionId: 'q5', answer: 'resposta5', score: 17 }
    ],
    totalScore: 70,
    completedAt: new Date('2023-03-20')
  },
  {
    id: 'result3',
    examId: 'exam1',
    studentId: 'student3',
    answers: [
      { questionId: 'q1', answer: 'resposta1', score: 10 },
      { questionId: 'q2', answer: 'resposta2', score: 8 },
      { questionId: 'q3', answer: 'resposta3', score: 12 },
      { questionId: 'q4', answer: 'resposta4', score: 5 },
      { questionId: 'q5', answer: 'resposta5', score: 10 }
    ],
    totalScore: 45,
    completedAt: new Date('2023-03-21')
  },
  {
    id: 'result4',
    examId: 'exam2',
    studentId: 'student1',
    answers: [
      { questionId: 'q6', answer: 'resposta6', score: 18 },
      { questionId: 'q7', answer: 'resposta7', score: 17 },
      { questionId: 'q8', answer: 'resposta8', score: 19 },
      { questionId: 'q9', answer: 'resposta9', score: 20 },
      { questionId: 'q10', answer: 'resposta10', score: 16 }
    ],
    totalScore: 90,
    completedAt: new Date('2023-03-25')
  }
];

// Mock students for testing
const mockStudents = {
  'student1': { id: 'student1', name: 'João Silva', email: 'joao@example.com', classId: 'class1' },
  'student2': { id: 'student2', name: 'Maria Oliveira', email: 'maria@example.com', classId: 'class1' },
  'student3': { id: 'student3', name: 'Pedro Santos', email: 'pedro@example.com', classId: 'class2' },
};

// Interface for enhanced exam result with student info
interface EnhancedExamResult extends ExamResult {
  student?: {
    id: string;
    name: string;
    email?: string;
    classId?: string;
  };
  classId?: string;
}

// Mock statistics generator
const generateStatistics = (results: EnhancedExamResult[], totalPoints: number) => {
  if (results.length === 0) {
    return {
      averageScore: 0,
      medianScore: 0,
      maxScore: 0,
      minScore: 0,
      passingRate: 0,
      standardDeviation: 0
    };
  }

  const scores = results.map(r => r.totalScore);

  // Calculate average
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  // Calculate median
  const sortedScores = [...scores].sort((a, b) => a - b);
  const median = sortedScores.length % 2 === 0
    ? (sortedScores[sortedScores.length / 2 - 1] + sortedScores[sortedScores.length / 2]) / 2
    : sortedScores[Math.floor(sortedScores.length / 2)];

  // Calculate max and min
  const max = Math.max(...scores);
  const min = Math.min(...scores);

  // Calculate passing rate (assuming passing is 60% of total points)
  const passingThreshold = totalPoints * 0.6;
  const passingCount = scores.filter(score => score >= passingThreshold).length;
  const passingRate = (passingCount / scores.length) * 100;

  // Calculate standard deviation
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / scores.length;
  const standardDeviation = Math.sqrt(variance);

  return {
    averageScore: average,
    medianScore: median,
    maxScore: max,
    minScore: min,
    passingRate,
    standardDeviation
  };
};

// Format results for ResultsTable component
const formatResultsForTable = (results: EnhancedExamResult[], exam?: Exam) => {
  return results.map(result => ({
    id: result.id,
    studentName: result.student?.name || 'Unknown Student',
    studentId: result.studentId,
    score: result.totalScore,
    maxScore: exam?.totalPoints || 100,
    percentage: (result.totalScore / (exam?.totalPoints || 100)) * 100,
    submissionDate: result.completedAt.toISOString(),
    status: 'completed' as 'completed' | 'pending' | 'in-progress',
  }));
};

const ResultsViewer: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [availableExams, setAvailableExams] = useState<Exam[]>(mockExams);
  const [examResults, setExamResults] = useState<EnhancedExamResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filterOptions, setFilterOptions] = useState({
    studentName: '',
    scoreRange: { min: 0, max: 100 },
    sortBy: 'score' as 'score' | 'name' | 'date',
    sortOrder: 'desc' as 'asc' | 'desc',
    classId: ''
  });
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<'summary' | 'detailed' | 'individual' | 'comparative'>('summary');
  const [stats, setStats] = useState({
    averageScore: 0,
    medianScore: 0,
    maxScore: 0,
    minScore: 0,
    passingRate: 0,
    standardDeviation: 0
  });

  // Fetch results for a specific exam
  const fetchResults = async (examId: string | undefined, classId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter mock results for the selected exam
      let filtered = mockResults.filter(result => result.examId === examId);

      // Filter by class if specified
      if (classId) {
        filtered = filtered.filter(result => {
          const student = mockStudents[result.studentId as keyof typeof mockStudents];
          return student?.classId === classId;
        });
      }

      // Enhance results with student info
      const enhanced: EnhancedExamResult[] = filtered.map(result => ({
        ...result,
        student: mockStudents[result.studentId as keyof typeof mockStudents],
        classId: mockStudents[result.studentId as keyof typeof mockStudents]?.classId
      }));

      setExamResults(enhanced);

      // Calculate stats
      const examObj = mockExams.find(e => e.id === examId);
      if (examObj) {
        const stats = generateStatistics(enhanced, examObj.totalPoints);
        setStats(stats);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters to results
  const filteredResults = examResults
    .filter(result =>
      // Filter by student name if provided
      !filterOptions.studentName ||
      result.student?.name.toLowerCase().includes(filterOptions.studentName.toLowerCase())
    )
    .filter(result =>
      // Filter by score range
      result.totalScore >= filterOptions.scoreRange.min &&
      result.totalScore <= filterOptions.scoreRange.max
    )
    .sort((a, b) => {
      // Sort results based on selected criteria
      if (filterOptions.sortBy === 'score') {
        return filterOptions.sortOrder === 'asc'
          ? a.totalScore - b.totalScore
          : b.totalScore - a.totalScore;
      } else if (filterOptions.sortBy === 'name') {
        return filterOptions.sortOrder === 'asc'
          ? (a.student?.name || '').localeCompare(b.student?.name || '')
          : (b.student?.name || '').localeCompare(a.student?.name || '');
      } else if (filterOptions.sortBy === 'date') {
        return filterOptions.sortOrder === 'asc'
          ? new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
          : new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      }
      return 0;
    });

  // Format results for the ResultsTable component
  const tableResults = formatResultsForTable(filteredResults, selectedExam || undefined);

  // Load exams on component mount
  useEffect(() => {
    setAvailableExams(mockExams);

    // Auto-select first exam for demonstration
    if (mockExams.length > 0) {
      handleExamSelect(mockExams[0]);
    }
  }, []);

  // Handle exam selection
  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam);
    if (exam.id) {
      fetchResults(exam.id);
    }

    // Reset filters when changing exam
    setFilterOptions({
      studentName: '',
      scoreRange: { min: 0, max: exam.totalPoints },
      sortBy: 'score',
      sortOrder: 'desc',
      classId: ''
    });
  };

  // Handle class selection for filtering
  const handleClassSelect = (classId: string) => {
    setFilterOptions(prev => ({ ...prev, classId }));
    if (selectedExam) {
      fetchResults(selectedExam.id, classId || undefined);
    }
  };

  // Handle filter changes
  const handleFilterChange = (name: string, value: any) => {
    setFilterOptions(prev => ({ ...prev, [name]: value }));
  };

  // Handle sorting
  const handleSort = (field: 'score' | 'name' | 'date') => {
    if (filterOptions.sortBy === field) {
      // Toggle order if same field
      setFilterOptions({
        ...filterOptions,
        sortOrder: filterOptions.sortOrder === 'asc' ? 'desc' : 'asc'
      });
    } else {
      // New field, default to descending for score, ascending for others
      setFilterOptions({
        ...filterOptions,
        sortBy: field,
        sortOrder: field === 'score' ? 'desc' : 'asc'
      });
    }
  };

  // Handle report generation
  const handleGenerateReport = async () => {
    if (!selectedExam || filteredResults.length === 0) return;

    setIsGeneratingReport(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
      console.log(`Generated ${selectedReportType} report for ${selectedExam.title}`);
    } catch (err) {
      console.error("Failed to generate report:", err);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Handle export
  const handleExport = async (format: 'pdf' | 'csv' | 'excel') => {
    if (!selectedExam || filteredResults.length === 0) return;

    try {
      console.log(`Exporting ${filteredResults.length} results in ${format} format`);
      // In a real implementation, this would call an export service
    } catch (err) {
      console.error(`Failed to export as ${format}:`, err);
    }
  };

  // Custom handler for ResultsTable's onRowClick
  const handleRowClick = (result: any) => {
    console.log("Clicked on result:", result);
    // Navigate to result details or show modal in a real implementation
  };

  return (
    <div className="results-viewer-container" style={{ margin: `2rem` }} >
      <div className="results-header">
        <h1>Resultados de Avaliações</h1>
        {selectedReportType && (
          <ReportGenerator
            type={selectedReportType}
            results={filteredResults}
            exam={selectedExam}
            statistics={{
              average: stats.averageScore,
              median: stats.medianScore,
              highest: stats.maxScore,
              lowest: stats.minScore,
              passingRate: stats.passingRate,
              standardDeviation: stats.standardDeviation
            }}
          />
        )}
        <div className="exam-selector">
          <label htmlFor="exam-select">Selecionar Avaliação:</label>
          <Select
            id="exam-select"
            value={selectedExam?.id || ''}
            onChange={(e) => {
              const exam = availableExams.find(ex => ex.id === e.target.value);
              if (exam) handleExamSelect(exam);
            }}
          >
            <option value="">Selecione uma avaliação</option>
            {availableExams.map(exam => (
              <option key={exam.id} value={exam.id}>
                {exam.title}
              </option>
            ))}
          </Select>
        </div>
        <div className="report-controls">
          <div className="report-generator">
            <h3>Gerar Relatório</h3>
            <div className="report-options" style={{ display: 'flex', gap: '1rem' }} >
              <Select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value as 'summary' | 'detailed' | 'individual' | 'comparative')}
              >
                <option value="summary">Resumo Geral</option>
                <option value="detailed">Relatório Detalhado</option>
                <option value="individual">Relatórios Individuais</option>
                <option value="comparative">Análise Comparativa</option>
              </Select>
              <Button variant='primary'
                onClick={handleGenerateReport}
                disabled={isGeneratingReport}
                className="generate-button"
              >
                {isGeneratingReport ? 'Gerando...' : 'Gerar Relatório'}
              </Button>
            </div>
          </div>

          <div className="export-options">
            <h3>Exportar Dados</h3>
            <div className="export-buttons">
              <ExportButton
                data={filteredResults}
                filename={`resultados_${selectedExam?.title}`}
                onExport={handleExport}
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingStates type="spinner" text="Carregando resultados..." />
      ) : error ? (
        <div className="error-message">
          <p>Erro ao carregar resultados: {error.message}</p>
        </div>
      ) : (
        <>
          {selectedExam ? (
            <div className="exam-info">
              <h2>{selectedExam.title}</h2>
              <p>{selectedExam.description}</p>
              <p>Total de pontos: {selectedExam.totalPoints}</p>
            </div>
          ) : (
            <div className="no-exam-selected">
              <p>Selecione uma avaliação para visualizar os resultados</p>
            </div>
          )}

          {filteredResults.length > 0 ? (
            <div className="results-content">
              <div className="filters-container">
                <h3>Filtros</h3>
                <div className="filter-row">
                  <div className="filter-item">
                    <label htmlFor="student-filter">Nome do Aluno:</label>
                    <input
                      id="student-filter"
                      type="text"
                      value={filterOptions.studentName}
                      onChange={(e) => handleFilterChange('studentName', e.target.value)}
                      placeholder="Filtrar por nome..."
                    />
                  </div>
                  <div className="filter-item">
                    <label>Intervalo de Notas:</label>
                    <div className="score-range">
                      <input
                        type="number"
                        min="0"
                        max={selectedExam?.totalPoints || 100}
                        value={filterOptions.scoreRange.min}
                        onChange={(e) => handleFilterChange('scoreRange', {
                          ...filterOptions.scoreRange,
                          min: Number(e.target.value)
                        })}
                      />
                      <span>a</span>
                      <input
                        type="number"
                        min="0"
                        max={selectedExam?.totalPoints || 100}
                        value={filterOptions.scoreRange.max}
                        onChange={(e) => handleFilterChange('scoreRange', {
                          ...filterOptions.scoreRange,
                          max: Number(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                  {selectedExam?.classIds && selectedExam.classIds.length > 0 && (
                    <div className="filter-item">
                      <label htmlFor="class-filter">Turma:</label>
                      <Select
                        id="class-filter"
                        value={filterOptions.classId}
                        onChange={(e) => handleClassSelect(e.target.value)}
                      >
                        <option value="">Todas as turmas</option>
                        {selectedExam.classIds.map(classId => (
                          <option key={classId} value={classId}>
                            {classId === 'class1' ? 'Turma A' :
                              classId === 'class2' ? 'Turma B' :
                                classId === 'class3' ? 'Turma C' : classId}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              <div className="statistics-container">
                <h3>Estatísticas</h3>
                <ResultsStatistics
                    {...stats}
                    assessmentId={selectedExam?.id}
                    className="custom-stats"
                  />
              </div>
            </div>
          ) : selectedExam ? (
            <div className="no-results">
              <p>Nenhum resultado encontrado para esta avaliação com os filtros atuais.</p>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ResultsViewer;