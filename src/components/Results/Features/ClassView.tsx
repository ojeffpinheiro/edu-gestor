import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Tipos
import {
  ClassPerformance,
  EvaluationRubric,
  StudentResult,
  ChartTab,
  ExamSummary
} from '../../../utils/types/Assessment';

// Hooks
import { useFilters } from '../../../hooks/userResultsFilters';
import { useStudentResults } from '../../../hooks/useStudentResults';
import { useClassMetrics } from '../../../hooks/useClassMetrics';

// Utils
import { prepareComparisonData } from '../../../utils/chartDataHelpers';

// Componentes UI
import EmptyState from '../EmptyState';
import ClassMetricsSection from '../ClassMetricsSection';
import SubjectSelector from '../SubjectSelector';
import InteractiveChart, { InteractiveChartProps } from '../InteractiveChart';
import ClassResultsTable from '../ClassResultsTable';
import EnhancedStudentDetailModal from '../EnhancedStudentDetailModal';
import ClassChartTabs from '../ClassChartTabs';
import ClassComparisonSection from '../ClassComparisonSection';
import StudentDetailModalWrapper from '../StudentDetailModalWrapper';

// Graficos
import ComparisonBarChart from '../Charts/ComparisonBarChart';
import ClassSelectorChart from '../Charts/ClassSelectorChart';

import BenchmarkSection from '../BenchmarkSection/BenchmarkSection';

import ClassViewToolbar from '../ClassViewToolbar';
import { ChartTabs, ClassViewContainer, MetricCard, ModernButton, ModernSelect, ModernToolbar, TabButton } from './styles/ClassViewStyles';

interface ClassViewProps {
  classPerformances: ClassPerformance[];
  selectedClass: string | null;
  onClassSelect: (classId: string | null) => void;
  onStudentSelect: (studentId: string | null) => void;
  rubrics?: EvaluationRubric[];
  isLoading?: boolean;
}

// Componente de métricas animadas
interface MetricDisplayProps {
  value: number;
  label: string;
  trend?: 'up' | 'down' | 'stable';
  suffix?: string;
  prefix?: string;
  delay?: number;
}

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

export const AnimatedMetric: React.FC<MetricDisplayProps> = ({
  value,
  label,
  trend = 'stable',
  suffix = '',
  prefix = '',
  delay = 0
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible] = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(counter);
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, value, delay]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  return (
    <MetricCard $trend={trend}>
      <span className="metric-value">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </span>
      <div className="metric-label">{label}</div>
      <div className={`metric-trend ${trend}`}>
        {getTrendIcon(trend)} {trend === 'up' ? '+5.2%' : trend === 'down' ? '-2.1%' : '0%'}
      </div>
    </MetricCard>
  );
};

// Toolbar moderna
interface ModernClassToolbarProps {
  activeView: 'class' | 'school';
  onViewChange: (view: 'class' | 'school') => void;
  selectedClass: string | null;
  classes: Array<{ classId: string; className: string }>;
  onClassSelect: (classId: string | null) => void;
  selectedSubject: string | null;
  subjects: string[];
  onSubjectSelect: (subject: string | null) => void;
}

export const ModernClassToolbar: React.FC<ModernClassToolbarProps> = ({
  activeView,
  onViewChange,
  selectedClass,
  classes,
  onClassSelect,
  selectedSubject,
  subjects,
  onSubjectSelect
}) => {
  return (
    <ModernToolbar>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ModernButton
          $variant={activeView === 'class' ? 'primary' : 'ghost'}
          onClick={() => onViewChange('class')}
        >
          📊 Turma
        </ModernButton>
        <ModernButton
          $variant={activeView === 'school' ? 'primary' : 'ghost'}
          onClick={() => onViewChange('school')}
        >
          🏫 Escola
        </ModernButton>
      </div>

      <ModernSelect
        value={selectedClass || ''}
        onChange={(e) => onClassSelect(e.target.value || null)}
      >
        <option value="">Selecionar Turma</option>
        {classes.map(cls => (
          <option key={cls.classId} value={cls.classId}>
            {cls.className}
          </option>
        ))}
      </ModernSelect>

      <ModernSelect
        value={selectedSubject || ''}
        onChange={(e) => onSubjectSelect(e.target.value || null)}
      >
        <option value="">Todas as Disciplinas</option>
        {subjects.map(subject => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </ModernSelect>

      <ModernButton $variant="secondary" $size="sm">
        📥 Exportar
      </ModernButton>
    </ModernToolbar>
  );
};

// Tabs modernas com indicador fluido
interface ModernTabsProps {
  tabs: Array<{ key: string; label: string; icon?: string }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ModernTabs: React.FC<ModernTabsProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <ChartTabs>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          $active={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </TabButton>
      ))}
    </ChartTabs>
  );
};

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
    return foundClass ?? null; // Converte undefined para null
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

  const handleBarClick = useCallback<NonNullable<InteractiveChartProps['onElementClick']>>((element) => {
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
        });
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

      {currentClass ? (
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
        </>) : (
        <EmptyState
          message="Selecione uma turma para visualizar os dados"
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