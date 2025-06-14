import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ClassPerformance, ExamSummary, StudentResult } from '../../../utils/types/Assessment';
import { useStrategicData } from '../../../hooks/useStrategicData';

import TemporalProgressChart from '../Charts/TemporalProgressChart';
import ClassPerformanceChart from '../ClassPerformanceChart';

import LoadingSpinner from '../../shared/LoadingSpinner';
import DashboardCard from '../DashboardCard';
import EmptyState from '../EmptyState';
import InstitutionalMetrics from '../InstitutionalMetrics';

import { ProgressTrendChart } from '../Charts/ProgressTrendChart';
import { LearningGapsPanel } from '../LearningGapsPanel';
import { BenchmarkQuadrant } from '../BenchmarkQuadrant';
import { ValueAddedChart } from '../ValueAddedChart';
import { PredictionsPanel } from '../PredictionsPanel';
import { TimeTrendsPanel } from '../TimeTrendsPanel';
import { ComparisonMode } from '../ComparisonMode';
import AlertPanel from '../AlertPanel';

import {
  Container,
  GraphsContainer,
  SlideContainer,
  SlideControls,
  SlideButton,
  BulletsContainer,
  Bullet,
  SlideTitle,
  KeyboardHint,
  FiltersContainer,
  FilterSelect
} from './styles/OverviewViewStyles';
interface SlideItem {
  key: string;
  title: string;
  component: React.ReactNode;
}

interface OverviewViewProps {
  /** Lista de resumos de exames para análise */
  examSummaries: ExamSummary[];
  /** Resultados individuais dos alunos */
  studentResults: StudentResult[];
  /** Desempenho por turma */
  classPerformances: ClassPerformance[];
  /** Indica se os dados estão sendo carregados */
  isLoading?: boolean;
  /** Objeto de erro, se ocorrer algum */
  error?: Error | null;
  /** Callback para seleção de turma */
  onClassSelect: (classId: string | null) => void;
  /** Filtros adicionais para visualização condicional */
  availableVisualizations?: string[];
}

/**
 * Componente principal que exibe uma visão geral dos dados de avaliação em formato de slides.
 * 
 * @component
 * @param {OverviewViewProps} props - Propriedades do componente
 * @returns {JSX.Element} Visão geral com métricas institucionais e visualizações de dados
 *
 * @example
 * <OverviewView
 *   examSummaries={examSummaries}
 *   studentResults={studentResults}
 *   classPerformances={classPerformances}
 *   onClassSelect={handleClassSelect}
 * />
 */
const OverviewView: React.FC<OverviewViewProps> = ({
  examSummaries,
  classPerformances,
  studentResults,
  onClassSelect,
  isLoading,
  error,
  availableVisualizations = ['performance', 'progress', 'trend', 'alerts', 'gaps', 'benchmark', 'value-added', 'predictions', 'trends', 'comparison']
}) => {// Estado para os valores selecionados
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { metrics, alerts, learningGaps, predictions } = useStrategicData(examSummaries, classPerformances, studentResults);

  const hasData = examSummaries.length > 0 && classPerformances.length > 0;

  const [filters, setFilters] = useState({
    selectedClasses: [] as string[],
    selectedSubjects: [] as string[],
    selectedTimeRange: 'all' as string
  });

  // Configuração dos slides disponíveis
  const slidesConfig = useMemo(() => {
    const allSlides: Record<string, SlideItem> = {
      performance: {
        key: "performance",
        title: "Desempenho por Turma",
        component: <ClassPerformanceChart
          classPerformances={classPerformances}
          onClassSelect={onClassSelect}
        />
      },
      progress: {
        key: "progress",
        title: "Progresso Temporal",
        component: <TemporalProgressChart examSummaries={examSummaries} />
      },
      trend: {
        key: "trend",
        title: "Tendência de Desempenho",
        component: <ProgressTrendChart examSummaries={examSummaries} />
      },
      alerts: {
        key: "alerts",
        title: "Alertas Prioritários",
        component: <AlertPanel
          alerts={alerts}
          onSelectClass={onClassSelect}
        />
      },
      gaps: {
        key: "gaps",
        title: "Gaps de Aprendizagem",
        component: <LearningGapsPanel
          gaps={learningGaps}
          onSelectSkill={(skill) => console.log('Skill selected:', skill)}
        />
      },
      benchmark: {
        key: "benchmark",
        title: "Benchmarking",
        component: <BenchmarkQuadrant
          classes={classPerformances}
          onSelectClass={onClassSelect}
        />
      },
      "value-added": {
        key: "value-added",
        title: "Valor Agregado",
        component: <ValueAddedChart
          classes={classPerformances}
          onSelectClass={onClassSelect}
        />
      },
      predictions: {
        key: "predictions",
        title: "Predições",
        component: <PredictionsPanel
          predictions={predictions}
          onSelectStudent={(studentId) => console.log('Student selected:', studentId)}
        />
      },
      trends: {
        key: "trends",
        title: "Tendências Temporais",
        component: <TimeTrendsPanel
          examSummaries={examSummaries}
          timeRange={filters.selectedTimeRange as any}
        />
      },
      comparison: {
        key: "comparison",
        title: "Modo Comparação",
        component: <ComparisonMode
          classPerformances={classPerformances}
          onSelectClass={onClassSelect}
        />
      }
    };

    // Filtra os slides baseado nas visualizações disponíveis
    return availableVisualizations
      .map(viz => allSlides[viz])
      .filter(Boolean) as SlideItem[];
  }, [classPerformances, alerts, learningGaps, predictions, onClassSelect, examSummaries, filters.selectedTimeRange, availableVisualizations]);

  const totalSlides = slidesConfig.length;

  // Funções de navegação memoizadas
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.getAttribute('contenteditable') === 'true') {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft': prevSlide(); break;
        case 'ArrowRight': nextSlide(); break;
        case 'Home': goToSlide(0); break;
        case 'End': goToSlide(totalSlides - 1); break;
        default:
          // Permite navegar por números 1-9 se houver slides suficientes
          const num = parseInt(e.key);
          if (!isNaN(num) && num > 0 && num <= totalSlides) {
            goToSlide(num - 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, goToSlide, totalSlides]);

  
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedClasses(selected);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedSubjects(selected);
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeRange(e.target.value);
  };

  // Filtra os dados
  const filteredClassPerformances = useMemo(() => {
    let result = [...classPerformances];
    
    if (selectedClasses.length > 0) {
      result = result.filter(c => selectedClasses.includes(c.classId));
    }
    
    if (selectedSubjects.length > 0) {
      result = result.filter(c => 
        c.subjects?.some(s => selectedSubjects.includes(s.name))
      );
    }
    
    return result;
  }, [classPerformances, selectedClasses, selectedSubjects]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <EmptyState message={`Erro ao carregar dados: ${error.message}`} type="error" />;

  return (
    <Container>
      {hasData ? (
        <>
          <InstitutionalMetrics metrics={metrics} />

          {/* Filtros */}
          <FiltersContainer>
            <div>
              <label htmlFor="class-filter">Turmas:</label>
              <FilterSelect
                id="class-filter"
                multiple
                size={4}
                value={selectedClasses}
                onChange={handleClassChange}
              >
                {classPerformances.map(c => (
                  <option key={c.classId} value={c.classId}>
                    {c.className}
                  </option>
                ))}
              </FilterSelect>
            </div>
            
            <div>
              <label htmlFor="subject-filter">Matérias:</label>
              <FilterSelect
                id="subject-filter"
                multiple
                size={4}
                value={selectedSubjects}
                onChange={handleSubjectChange}
              >
                {Array.from(new Set(
                  classPerformances.flatMap(c => 
                    c.subjects?.map(s => s.name) || []
                  )
                )).map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </FilterSelect>
            </div>
            
            <div>
              <label htmlFor="time-range-filter">Período:</label>
              <FilterSelect
                id="time-range-filter"
                value={selectedTimeRange}
                onChange={handleTimeRangeChange}
              >
                <option value="all">Todo o período</option>
                <option value="week">Última semana</option>
                <option value="month">Último mês</option>
                <option value="quarter">Último trimestre</option>
              </FilterSelect>
            </div>
          </FiltersContainer>

          <GraphsContainer>
            <SlideTitle>Visualizações de Dados</SlideTitle>

            <SlideContainer>
              <DashboardCard
                key={slidesConfig[currentSlide].key}
                title={slidesConfig[currentSlide].title}
                fullWidth
              >
                {React.cloneElement(slidesConfig[currentSlide].component as React.ReactElement<any>, {
                  classPerformances: filteredClassPerformances,
                  examSummaries: filters.selectedTimeRange === 'all'
                    ? examSummaries
                    : examSummaries.filter(e => {
                      const examDate = new Date(e.date);
                      const now = new Date();
                      const diffTime = now.getTime() - examDate.getTime();
                      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
                      switch (filters.selectedTimeRange) {
                        case 'week': return diffDays <= 7;
                        case 'month': return diffDays <= 30;
                        case 'quarter': return diffDays <= 90;
                        default: return true;
                      }
                    })
                })}
              </DashboardCard>

              <SlideControls>
                <SlideButton onClick={prevSlide} aria-label="Slide anterior">
                  <FiChevronLeft />
                </SlideButton>

                <BulletsContainer>
                  {slidesConfig.map((_, index) => (
                    <Bullet
                      key={index}
                      $active={index === currentSlide}
                      onClick={() => goToSlide(index)}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </BulletsContainer>

                <SlideButton onClick={nextSlide} aria-label="Próximo slide">
                  <FiChevronRight />
                </SlideButton>
              </SlideControls>
            </SlideContainer>
          </GraphsContainer>

          <KeyboardHint>
            Navegação: <kbd>←</kbd> <kbd>→</kbd> ou <kbd>1</kbd>-<kbd>{Math.min(9, totalSlides)}</kbd> para slides
          </KeyboardHint>
        </>
      ) : (
        <EmptyState 
          message="Nenhum dado disponível para exibição" 
          type="search"
          action={
            <button onClick={() => window.location.reload()}>
              Tentar novamente
            </button>
          }
        />
      )}
    </Container>
  );
};

export default OverviewView;