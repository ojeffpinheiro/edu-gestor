import React, { useState, useEffect } from 'react';
import { FaChartLine, FaUsers, FaClipboardCheck, FaChartBar, FaCaretUp, FaCaretDown } from 'react-icons/fa';

import { EnhancedExamResult, Exam, ExamResult } from '../../../utils/types/Assessment';

import { useExams } from '../../../hooks/assessment/useExams';
import { mockExams } from '../../../mocks/assessmentData';

import { Table, TableHeader, TableRow, TableCell, EmptyStateMessage } from '../../../styles/table';
import { Button } from '../../../styles/buttons';
import ResultsTable from './ResultsTable';
import { mockResults, mockStudents } from '../../../mocks/results';
import { CardIcon, CategoryBreakdown, CategoryItem, CategoryName, CategoryScore, CategoryScoreBar, CategoryScoreWrapper, DashboardContainer, DashboardHeader, DetailCard, DetailSection, LoadingContainer, MetricCard, MetricTitle, MetricValue, MetricValueWithTrend, SummaryCards, TimeframeSelector, TrendDownIndicator, TrendUpIndicator } from './styles';
import { CardContent } from '../../../styles/card';

interface ResultsSummary {
  totalExams: number;
  totalStudents: number;
  averageScore: number;
  passingRate: number;
  performanceTrend: 'up' | 'down' | 'stable';
  categoryBreakdown: {
    name: string;
    score: number;
  }[];
  classBreakdown: {
    name: string;
    passingRate: number;
    averageScore: number;
  }[];
  topPerformers: {
    studentId: string;
    studentName: string;
    examId: string;
    examTitle: string;
    score: number;
  }[];
}

const ResultsDashboard: React.FC = () => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [examResults, setExamResults] = useState<EnhancedExamResult[]>([]);
  const [availableExams, setAvailableExams] = useState<Exam[]>(mockExams);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester'>('month');
  const [summary, setSummary] = useState<ResultsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState({
    averageScore: 0,
    medianScore: 0,
    maxScore: 0,
    minScore: 0,
    passingRate: 0,
    standardDeviation: 0
  });

  const [filterOptions, setFilterOptions] = useState({
    studentName: '',
    scoreRange: { min: 0, max: 100 },
    sortBy: 'score' as 'score' | 'name' | 'date',
    sortOrder: 'desc' as 'asc' | 'desc',
    classId: ''
  });

  const [selectedReportType, setSelectedReportType] = useState<'detailed' | 'summary'>('detailed');

  const { getExamResults } = useExams();

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

  // Handle class selection for filtering
  const handleClassSelect = (classId: string) => {
    setFilterOptions(prev => ({ ...prev, classId }));
    if (selectedExam?.id) {
      fetchResults(selectedExam.id);
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
  const handleExport = async (resultsToExport: any[]) => {
    if (!selectedExam || resultsToExport.length === 0) return;

    try {
      console.log(`Exporting ${resultsToExport.length} results`);
      // In a real implementation, this would call an export service
    } catch (err) {
      console.error(`Failed to export results:`, err);
    }
  };

  // Load exams on component mount
  useEffect(() => {
    setAvailableExams(mockExams);

    // Auto-select first exam for demonstration
    if (mockExams.length > 0) {
      handleExamSelect(mockExams[0]);
    }
  }, []);

  // Format results for the ResultsTable component
  const tableResults = formatResultsForTable(filteredResults, selectedExam || undefined);


  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call the API with the selected timeframe
        const results = await getExamResults(selectedTimeframe);

        // Generate summary from results
        const calculatedSummary: ResultsSummary = processSummaryData(results);
        setSummary(calculatedSummary);
      } catch (error) {
        console.error('Error fetching results:', error);
        // Handle error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [selectedTimeframe, getExamResults]);

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

  // Fetch results for a specific exam
  const fetchResults = async (examId: string, classId?: string) => {
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

  // Process the exam results to generate the summary
  const processSummaryData = (results: ExamResult[]): ResultsSummary => {
    // This is a mockup of processing logic - in a real app, this would analyze actual data
    return {
      totalExams: results.length,
      totalStudents: new Set(results.map(r => r.studentId)).size,
      averageScore: calculateAverageScore(results),
      passingRate: calculatePassingRate(results),
      performanceTrend: determinePerformanceTrend(results),
      categoryBreakdown: generateCategoryBreakdown(results),
      classBreakdown: generateClassBreakdown(results),
      topPerformers: getTopPerformers(results)
    };
  };

  // These functions would contain actual calculation logic in a real implementation
  const calculateAverageScore = (results: ExamResult[]): number => {
    if (results.length === 0) return 0;
    return results.reduce((sum, result) => sum + result.totalScore, 0) / results.length;
  };

  const calculatePassingRate = (results: ExamResult[]): number => {
    if (results.length === 0) return 0;
    const passingResults = results.filter(result => result.totalScore >= 60); // Example passing threshold
    return (passingResults.length / results.length) * 100;
  };

  const determinePerformanceTrend = (results: ExamResult[]): 'up' | 'down' | 'stable' => {
    // In a real app, this would compare with previous period
    // For demo purposes, we'll just return a sample value
    return Math.random() > 0.5 ? 'up' : 'down';
  };

  const generateCategoryBreakdown = (results: ExamResult[]): { name: string; score: number }[] => {
    // Mock data for categories
    return [
      { name: 'Matemática', score: 78 },
      { name: 'Ciências', score: 82 },
      { name: 'Literatura', score: 75 },
      { name: 'História', score: 69 }
    ];
  };

  const generateClassBreakdown = (results: ExamResult[]): { name: string; passingRate: number; averageScore: number }[] => {
    // Mock data for class breakdown
    return [
      { name: 'Turma A', passingRate: 87, averageScore: 81 },
      { name: 'Turma B', passingRate: 76, averageScore: 72 },
      { name: 'Turma C', passingRate: 92, averageScore: 85 }
    ];
  };

  const getTopPerformers = (results: ExamResult[]): { studentId: string; studentName: string; examId: string; examTitle: string; score: number }[] => {
    // Mock data for top performers
    return [
      { studentId: '1001', studentName: 'Maria Silva', examId: 'exam-1', examTitle: 'Avaliação Final', score: 98 },
      { studentId: '1042', studentName: 'João Oliveira', examId: 'exam-2', examTitle: 'Prova Bimestral', score: 95 },
      { studentId: '1073', studentName: 'Ana Souza', examId: 'exam-1', examTitle: 'Avaliação Final', score: 93 }
    ];
  };

  // Handle sorting
  const handleSort = (column: string) => {
    const field = column as 'score' | 'name' | 'date';
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

  // Custom handler for ResultsTable's onRowClick
  const handleRowClick = (result: any) => {
    console.log("Clicked on result:", result);
    // Navigate to result details or show modal in a real implementation
  };

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

  if (isLoading) {
    return <LoadingContainer>Carregando resultados...</LoadingContainer>;
  }

  if (!summary) {
    return <EmptyStateMessage>Nenhum resultado disponível para o período selecionado.</EmptyStateMessage>;
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Dashboard de Resultados</h2>
        <TimeframeSelector>
          <Button
            variant={selectedTimeframe === 'week' ? 'primary' : 'secondary'}
            onClick={() => setSelectedTimeframe('week')}
          >
            Semana
          </Button>
          <Button
            variant={selectedTimeframe === 'month' ? 'primary' : 'secondary'}
            onClick={() => setSelectedTimeframe('month')}
          >
            Mês
          </Button>
          <Button
            variant={selectedTimeframe === 'semester' ? 'primary' : 'secondary'}
            onClick={() => setSelectedTimeframe('semester')}
          >
            Semestre
          </Button>
        </TimeframeSelector>
      </DashboardHeader>

      <SummaryCards>
        <MetricCard>
          <CardIcon>
            <FaClipboardCheck />
          </CardIcon>
          <CardContent>
            <MetricTitle>Total de Avaliações</MetricTitle>
            <MetricValue>{summary.totalExams}</MetricValue>
          </CardContent>
        </MetricCard>

        <MetricCard>
          <CardIcon>
            <FaUsers />
          </CardIcon>
          <CardContent>
            <MetricTitle>Alunos Avaliados</MetricTitle>
            <MetricValue>{summary.totalStudents}</MetricValue>
          </CardContent>
        </MetricCard>

        <MetricCard>
          <CardIcon>
            <FaChartLine />
          </CardIcon>
          <CardContent>
            <MetricTitle>Nota Média</MetricTitle>
            <MetricValue>{summary.averageScore.toFixed(1)}</MetricValue>
          </CardContent>
        </MetricCard>

        <MetricCard>
          <CardIcon>
            <FaChartBar />
          </CardIcon>
          <CardContent>
            <MetricTitle>Taxa de Aprovação</MetricTitle>
            <MetricValueWithTrend>
              {summary.passingRate.toFixed(1)}%
              {summary.performanceTrend === 'up' ? (
                <TrendUpIndicator>
                  <FaCaretUp /> 5.2%
                </TrendUpIndicator>
              ) : (
                <TrendDownIndicator>
                  <FaCaretDown /> 2.1%
                </TrendDownIndicator>
              )}
            </MetricValueWithTrend>
          </CardContent>
        </MetricCard>
      </SummaryCards>

      <DetailSection>
        <DetailCard>
          <h3>Desempenho por Categoria</h3>
          <CategoryBreakdown>
            {summary.categoryBreakdown.map((category, index) => (
              <CategoryItem key={index}>
                <CategoryName>{category.name}</CategoryName>
                <CategoryScoreWrapper>
                  <CategoryScoreBar percentage={category.score} />
                  <CategoryScore>{category.score}%</CategoryScore>
                </CategoryScoreWrapper>
              </CategoryItem>
            ))}
          </CategoryBreakdown>
        </DetailCard>

        <DetailCard>
          <h3>Desempenho por Turma</h3>
          <Table>
            <thead>
              <tr>
                <TableHeader>Turma</TableHeader>
                <TableHeader>Nota Média</TableHeader>
                <TableHeader>Taxa de Aprovação</TableHeader>
              </tr>
            </thead>
            <tbody>
              {summary.classBreakdown.map((classData, index) => (
                <TableRow key={index}>
                  <TableCell>{classData.name}</TableCell>
                  <TableCell>{classData.averageScore.toFixed(1)}</TableCell>
                  <TableCell>{classData.passingRate.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </DetailCard>
      </DetailSection>

      <DetailCard>
        <h3>Melhores Desempenhos</h3>
        <ResultsTable
          results={tableResults}
          title={`Resultados: ${selectedExam?.title || ''}`}
          customColumns={[{ key: 'customField', label: 'Custom Field' }]}
          onRowClick={handleRowClick}
          onExport={handleExport}
          onSort={handleSort}
        />
      </DetailCard>
    </DashboardContainer>
  );
};

export default ResultsDashboard;