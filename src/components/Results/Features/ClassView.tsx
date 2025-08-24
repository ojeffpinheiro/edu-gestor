import React, { useCallback, useMemo, useState } from 'react';

import {
  ClassPerformance,
  EvaluationRubric,
  StudentResult,
  ChartTab,
  ExamSummary,
  ClassPerformanceWithSubjects
} from '../../../utils/types/Assessment';

import { useFilters } from '../../../hooks/userResultsFilters';
import { useStudentResults } from '../../../hooks/useStudentResults';
import { useClassMetrics } from '../../../hooks/useClassMetrics';

import { prepareComparisonData } from '../../../utils/chartDataHelpers';

import EmptyState from '../EmptyState';
import ClassMetricsSection from '../ClassMetricsSection';
import SubjectSelector from '../SubjectSelector';
import InteractiveChart from '../InteractiveChart';
import ClassResultsTable from '../ClassResultsTable';
import EnhancedStudentDetailModal from '../EnhancedStudentDetailModal';
import ClassChartTabs from '../ClassChartTabs';
import ClassComparisonSection from '../ClassComparisonSection';
import StudentDetailModalWrapper from '../StudentDetailModalWrapper';
import BenchmarkSection from '../BenchmarkSection/BenchmarkSection';
import ClassViewToolbar from '../ClassViewToolbar';

import ClassSelectorChart from '../Charts/ClassSelectorChart';

import { ClassViewContainer } from './styles/ClassViewStyles';
import { EducationalAnalytics } from '../EducationalAnalytics';

interface ClassViewProps {
  classPerformances: ClassPerformance[];
  selectedClass: string | null;
  onClassSelect: (classId: string | null) => void;
  onStudentSelect: (studentId: string | null) => void;
  rubrics?: EvaluationRubric[];
  isLoading?: boolean;
}

/**
 * Componente principal para visualização de desempenho de turmas
 * @param {ClassPerformance[]} classPerformances - Dados de desempenho das turmas
 * @param {string|null} selectedClass - ID da turma selecionada
 * @param {(classId: string | null) => void} onClassSelect - Handler para seleção de turma
 * @param {EvaluationRubric[]} [rubrics] - Rubricas de avaliação opcionais
 * @param {boolean} [isLoading] - Flag de carregamento
 */
const ClassView: React.FC<ClassViewProps> = ({
  classPerformances,
  selectedClass,
  onClassSelect,
  onStudentSelect,
  rubrics,
  isLoading
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<ChartTab>('radar');
  const [activeView, setActiveView] = useState<'class' | 'school'>('class');
  const [comparisonTab, setComparisonTab] = useState<'ranking' | 'value-added' | 'equity'>('ranking');
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [detailStudent, setDetailStudent] = useState<StudentResult | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'semester' | 'year'>('month');
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const currentClass = useMemo(() => {
    if (!selectedClass) return null;
    const foundClass = classPerformances.find(c => c.classId === selectedClass);
    return foundClass as ClassPerformanceWithSubjects | null;
  }, [selectedClass, classPerformances]);

  const { filteredData } = useFilters(classPerformances);

  const classMetrics = useClassMetrics(currentClass ?? null);
  const studentsAsResults = useStudentResults(currentClass ?? null);

  const filteredByPeriod = useMemo(() => {
    return filteredData.filter((c: ClassPerformance) =>
      !selectedPeriod || c.academicPeriod === selectedPeriod
    );
  }, [filteredData, selectedPeriod]);

  const availablePeriods = useMemo<string[]>(() => {
    const periods = new Set(classPerformances
      .map((c: ClassPerformance) => c.academicPeriod)
      .filter((p): p is string => !!p));
    return Array.from(periods);
  }, [classPerformances]);

  const filteredClassData = useMemo(() => {
    if (!currentClass) return null;

    return {
      ...currentClass,
      examResults: selectedSubject
        ? currentClass.examResults.filter((exam: ExamSummary) => exam.subject === selectedSubject)
        : currentClass.examResults
    };
  }, [currentClass, selectedSubject]);

  const allExamResults = useMemo(() =>
    currentClass?.examResults.flatMap((exam: ExamSummary) => exam.results || []) || [],
    [currentClass]
  );

  const handleStudentSelect = useCallback((studentId: string) => {
    const student = studentsAsResults.find((s: StudentResult) => s.studentId === studentId);
    setSelectedStudent(student || null);
    onStudentSelect(studentId);
  }, [studentsAsResults, onStudentSelect]);

  const handleBarClick = useCallback((element: { datasetIndex: number }) => {
    const classId = filteredByPeriod[element.datasetIndex]?.classId;
    if (classId) {
      const classData = filteredByPeriod.find((c: ClassPerformance) => c.classId === classId);
      if (classData) {
        setDetailStudent({
          studentId: 'class-' + classData.classId,
          studentName: classData.className,
          studentEmail: '',
          classId: classData.classId,
          className: classData.className,
          examResults: classData.examResults.flatMap((exam: ExamSummary) => exam.results || []),
          overallAverage: classData.averageScore,
          progressTrend: classData.performanceTrend || 'stable',
          attendanceRate: classData.attendanceRate,
          skillProfile: classData.skillBreakdown,
          riskAssessment: classData.averageScore < 50 ? {
            level: 'high',
            factors: ['Baixo desempenho geral da turma']
          } : undefined
        } as StudentResult);
      }
    }
  }, [filteredByPeriod]);

  if (isLoading) return <EmptyState message="Carregando dados da turma..." />;

  if (!classPerformances || classPerformances.length === 0) {
    return <EmptyState message="Nenhum dado de desempenho disponível" />;
  }

  return (
    <ClassViewContainer>
      <ClassViewToolbar
        activeView={activeView}
        availablePeriods={availablePeriods}
        classPerformances={classPerformances}
        onClassSelect={onClassSelect}
        selectedClass={selectedClass}
        selectedPeriod={selectedPeriod}
        selectedSubject={selectedSubject}
        setActiveView={setActiveView}
        setSelectedPeriod={setSelectedPeriod}
        setSelectedSubject={setSelectedSubject}
        subjects={currentClass?.subjects || []} />

      {activeView === 'class' ? (
        // Seu ClassView atual aqui
        <>
          {currentClass
            ? (
              <>
                <ClassMetricsSection metrics={classMetrics} />

                {filteredClassData && (
                  <ClassChartTabs
                    activeTab={activeChartTab}
                    classPerformance={filteredClassData}
                    onTabChange={setActiveChartTab}
                    rubrics={rubrics}
                  />
                )}

                <ClassSelectorChart
                  classes={filteredByPeriod}
                  initialSelection={selectedClasses}
                  onSelectionChange={(selected) => setSelectedClasses(selected.map(c => c.classId))}
                >
                  {(selectedClasses) => (
                    <InteractiveChart
                      data={prepareComparisonData(selectedClasses, selectedSubject)}
                      onElementClick={handleBarClick}
                    />
                  )}
                </ClassSelectorChart>

                {currentClass.subjects?.length > 0 && (
                  <SubjectSelector
                    subjects={currentClass.subjects}
                    selectedSubject={selectedSubject}
                    onSelect={setSelectedSubject}
                  />
                )}

                <ClassResultsTable
                  students={studentsAsResults}
                  examResults={allExamResults}
                  timeRange={timeRange}
                  onStudentSelect={handleStudentSelect}
                />

                <BenchmarkSection classes={classPerformances} metrics={classMetrics} />
              </>)
            : (
              <EmptyState
                message="Selecione uma turma para visualizar os dados"
              />
            )}
        </>
      ) : (
        <EducationalAnalytics
          classPerformances={classPerformances}
          currentClass={currentClass}
          students={studentsAsResults}
        />
      )}

      <ClassComparisonSection
        classPerformances={filteredByPeriod}
        selectedClasses={selectedClasses}
        onClassSelect={setSelectedClasses}
        onTabChange={setComparisonTab}
        prepareComparisonData={prepareComparisonData}
        onElementClick={handleBarClick}
      />

      <StudentDetailModalWrapper
        student={selectedStudent}
        onClose={() => {
          setSelectedStudent(null);
          onStudentSelect(null);
        }}
      />

      {selectedStudent && (
        <EnhancedStudentDetailModal
          student={selectedStudent}
          onClose={() => {
            setSelectedStudent(null);
            onStudentSelect(null);
          }}
        />
      )}

      {detailStudent && (
        <EnhancedStudentDetailModal
          student={detailStudent}
          onClose={() => setDetailStudent(null)}
        />
      )}
    </ClassViewContainer>
  );
};

export default ClassView;