import React, { useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';

import { ClassPerformance, EvaluationRubric, ClassMetricsType, StudentResult } from '../../../utils/types/Assessment';

import { useFilters } from '../../../hooks/userResultsFilters';
import DashboardCard from '../DashboardCard';
import RadarChart from '../Charts/RadarChart';
import EmptyState from '../EmptyState';
import ClassSelector from '../ClassSelector';
import SubjectSelector from '../SubjectSelector';
import ComparisonTabs from '../ComparisonTabs';
import BenchmarkCard from '../BenchmarkCard';
import AdvancedFilters from '../AdvancedFilters';
import InteractiveChart from '../InteractiveChart';
import ClassResultsTable from '../ClassResultsTable';
import EnhancedStudentDetailModal from '../EnhancedStudentDetailModal';

import ComparisonBarChart from '../Charts/ComparisonBarChart';
import ClassSelectorChart from '../Charts/ClassSelectorChart';

import { ClassViewContainer } from '../../../pages/DashboardResultViewer/styles';
import { ChartTabs, TabButton } from './styles/ClassViewStyles';
import DistributionView from '../ClassCharts/DistributionView';
import ProgressView from '../ClassCharts/ProgressView';

interface ClassViewProps {
  classPerformances: ClassPerformance[];
  selectedClass: string | null;
  onClassSelect: (classId: string | null) => void;
  onStudentSelect: (studentId: string | null) => void;
  rubrics?: EvaluationRubric[];
  isLoading?: boolean;
}

const ClassView: React.FC<ClassViewProps> = ({
  classPerformances,
  selectedClass,
  onClassSelect,
  onStudentSelect,
  rubrics,
  isLoading
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<'radar' | 'distribution' | 'progress'>('radar');

  const [activeView, setActiveView] = useState<'class' | 'school'>('class');
  const [comparisonTab, setComparisonTab] = useState<'ranking' | 'value-added' | 'equity'>('ranking');
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [detailStudent, setDetailStudent] = useState<StudentResult | null>(null);

  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'semester' | 'year'>('month');

  const {
    filters,
    setFilter,
    resetFilters,
    filteredData,
    availableOptions
  } = useFilters(classPerformances);

  const filteredBySubject = filteredData;

  // Manipulador de clique no gráfico
  const handleBarClick = (element: any) => {
    const classId = filteredBySubject[element.index]?.classId;
    if (classId) {
      const classData = filteredBySubject.find(c => c.classId === classId);
      if (classData) {
        setDetailStudent({
          studentId: 'sample-id', // Substitua pelo ID real
          studentName: classData.className,
          studentEmail: '', // Adicione se necessário
          classId: classData.classId,
          className: classData.className,
          examResults: [], // Preencha com os resultados reais
          overallAverage: classData.averageScore,
          progressTrend: 'stable', // Ou calcule com base nos dados
          attendanceRate: undefined, // Opcional
          skillProfile: {}, // Opcional
          riskAssessment: undefined // Opcional
        });
      }
    }
  };
  const currentClass = selectedClass
    ? classPerformances.find(c => c.classId === selectedClass)
    : null;

  // Filtra resultados por disciplina se selecionada
  const filteredClassData = currentClass ? {
    ...currentClass,
    examResults: selectedSubject
      ? currentClass.examResults.filter(exam => exam.subject === selectedSubject)
      : currentClass.examResults
  } : null;

  const studentsAsResults = currentClass?.students.map(student => ({
    studentId: student.id,
    studentName: student.name,
    studentEmail: student.email,
    classId: currentClass.classId,
    className: currentClass.className,
    examResults: currentClass.examResults.flatMap(exam =>
      exam.results?.filter(result => result.studentId === student.id) || []
    ),
    overallAverage: student.overallAverage || 0,
    progressTrend: 'stable' as const,
    attendanceRate: student.attendanceRate,
    skillProfile: {},
    riskAssessment: undefined
  })) || [];

  const allExamResults = currentClass?.examResults.flatMap(exam => exam.results || []) || [];

  const handleStudentSelect = (studentId: string) => {
    const student = studentsAsResults.find(s => s.studentId === studentId);
    setSelectedStudent(student || null);
  };

  if (!currentClass) {
    return <div>Nenhuma turma selecionada</div>;
  }

  // Calcula métricas da turma
  const calculateClassMetrics = (): ClassMetricsType | null => {
    if (!filteredClassData) return null;

    const totalStudents = filteredClassData.students.length;
    const examCount = filteredClassData.examResults.length;

    // Cálculo de médias
    const averageScore = examCount > 0
      ? filteredClassData.examResults.reduce((sum, exam) => sum + exam.averageScore, 0) / examCount
      : 0;

    // Taxas de aprovação/reprovação
    const passingStudents = filteredClassData.students.filter(student => {
      const studentResults = filteredClassData.examResults.flatMap(exam => exam.results || [])
        .filter(result => result.studentId === student.id);
      return studentResults.length > 0 &&
        studentResults.every(result => result.totalScore >= 70);
    }).length;

    const failingStudents = totalStudents - passingStudents;
    const failingStudentsChange = 0; // Você precisará implementar a lógica real aqui

    // Frequência
    const frequentStudents = filteredClassData.students.filter(s =>
      s.attendanceRate !== undefined && s.attendanceRate >= 75
    ).length;

    return {
      totalStudents,
      averageScore,
      passingRate: (passingStudents / totalStudents) * 100,
      failingRate: (failingStudents / totalStudents) * 100,
      frequentStudents,
      infrequentStudents: totalStudents - frequentStudents,
      attendanceRate: frequentStudents / totalStudents * 100,
      failingStudents,
      failingStudentsChange
    };
  };

  const classMetrics = calculateClassMetrics();

  if (isLoading) return <EmptyState message="Carregando dados da turma..." />;

  return (
    <ClassViewContainer>
      <div className="class-controls">
        <ClassSelector
          classes={classPerformances}
          selectedClass={selectedClass}
          onSelect={onClassSelect}
        />

        <AdvancedFilters
          periods={availableOptions.periods}
          subjects={availableOptions.subjects}
          classes={availableOptions.allClasses}
          currentFilters={filters}
          onFilterChange={setFilter}
          onReset={resetFilters}
        />
      </div>

      {/* Seletor de turmas para gráficos */}
      <ClassSelectorChart
        classes={filteredBySubject}
        initialSelection={selectedClasses}
      >
        {(selectedClasses) => (
          <InteractiveChart
            data={{
              labels: selectedClasses.map(c => c.className),
              datasets: [{
                label: 'Média',
                data: selectedClasses.map(c => c.averageScore),
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
              }]
            }}
            onElementClick={handleBarClick}
          />
        )}
      </ClassSelectorChart>


      {currentClass?.subjects && currentClass.subjects.length > 0 && (
        <SubjectSelector
          subjects={currentClass.subjects}
          selectedSubject={selectedSubject}
          onSelect={setSelectedSubject}
        />
      )}

      <ComparisonTabs
        tabs={['Ranking', 'Valor Agregado', 'Equidade']}
        onTabChange={(tab) => setComparisonTab(tab.toLowerCase() as any)}
      />

      <ClassResultsTable
        students={studentsAsResults}
        examResults={allExamResults}
        timeRange={timeRange}
        onStudentSelect={handleStudentSelect}
      />

      <div className="view-toggle">
        <button
          className={activeView === 'class' ? 'active' : ''}
          onClick={() => setActiveView('class')}
        >
          Visualização por Turma
        </button>
        <button
          className={activeView === 'school' ? 'active' : ''}
          onClick={() => setActiveView('school')}
        >
          Visualização por Escola
        </button>
      </div>

      {/* Seção de Benchmarking */}
      <div className="benchmark-section">
        <BenchmarkCard
          title="Desempenho Médio"
          value={classMetrics?.averageScore.toFixed(1) || 'N/A'}
          change={1.2}
          icon={<FiTrendingUp />}
        >
          <ComparisonBarChart
            classes={classPerformances}
            metric="averageScore"
          />
        </BenchmarkCard>
      </div>

      {filteredClassData ? (
        <>
          {/* Cards de Métricas */}
          <div className="metrics-row">
            <DashboardCard title="Total de Alunos" className="metric-card">
              <div className="metric-value">
                {classMetrics?.totalStudents || 0}
              </div>
            </DashboardCard>

            <DashboardCard title="Média da Turma" className="metric-card">
              <div className="metric-value">
                {classMetrics?.averageScore.toFixed(1) || '0.0'}
                <span className="metric-unit">pts</span>
              </div>
            </DashboardCard>

            <DashboardCard title="Taxa de Aprovação" className="metric-card">
              <div className="metric-value">
                {classMetrics?.passingRate.toFixed(1) || '0.0'}
                <span className="metric-unit">%</span>
              </div>
            </DashboardCard>
          </div>

          <DashboardCard
            title="Análise de Desempenho"
            description="Selecione o tipo de visualização"
          >
            <ChartTabs>
              <TabButton
                $active={activeChartTab === 'radar'}
                onClick={() => setActiveChartTab('radar')}
              >
                Desempenho por Habilidade
              </TabButton>
              <TabButton
                $active={activeChartTab === 'distribution'}
                onClick={() => setActiveChartTab('distribution')}
              >
                Distribuição de Notas
              </TabButton>
              <TabButton
                $active={activeChartTab === 'progress'}
                onClick={() => setActiveChartTab('progress')}
              >
                Progresso Temporal
              </TabButton>
            </ChartTabs>

            <div className="chart-container">
              {activeChartTab === 'radar' && (
                <RadarChart
                  classPerformance={filteredClassData}
                  rubrics={rubrics}
                />
              )}
              {activeChartTab === 'distribution' && (
                <DistributionView
                  examSummaries={filteredClassData.examResults}
                />
              )}
              {activeChartTab === 'progress' && (
                <ProgressView
                  currentClass={filteredClassData}
                />
              )}
            </div>
          </DashboardCard>

          <DashboardCard title="Alunos em Recuperação" className="metric-card warning">
            <div className="metric-value">
              {classMetrics?.failingStudents || 0}
              <span className="metric-change">
                {classMetrics?.failingStudentsChange ? `${classMetrics.failingStudentsChange}%` : ''}
              </span>
            </div>
          </DashboardCard>

          <DashboardCard title="Frequência" className="metric-card">
            <div className="metric-value">
              {classMetrics?.frequentStudents ?? 0}
              <span className="metric-unit">/{classMetrics?.totalStudents ?? 0}</span>
            </div>
            <div className="metric-subtext">
              {classMetrics && (
                `(${((classMetrics.frequentStudents / classMetrics.totalStudents) * 100).toFixed(1)}% de frequência)`
              )}
            </div>
          </DashboardCard>
        </>
      ) : (
        <EmptyState message="Nenhuma turma selecionada" />
      )}

      {selectedStudent && (
        <EnhancedStudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </ClassViewContainer>
  );
};

export default ClassView;