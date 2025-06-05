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

import {
  Container,
  GraphsContainer,
  SlideContainer,
  SlideControls,
  SlideButton,
  BulletsContainer,
  Bullet,
  SlideTitle,
  KeyboardHint
} from './styles/OverviewViewStyles';
import { ProgressTrendChart } from '../Charts/ProgressTrendChart';
import { AlertPanel } from '../AlertPanel';
import { LearningGapsPanel } from '../LearningGapsPanel';
import { BenchmarkQuadrant } from '../BenchmarkQuadrant';
import { ValueAddedChart } from '../ValueAddedChart';
import { PredictionsPanel } from '../PredictionsPanel';
import { TimeTrendsPanel } from '../TimeTrendsPanel';
import { ComparisonMode } from '../ComparisonMode';

interface SlideItem {
  key: string;
  title: string;
  component: React.ReactNode;
}

interface OverviewViewProps {
  examSummaries: ExamSummary[];
  studentResults: StudentResult[];
  classPerformances: ClassPerformance[];
  isLoading?: boolean;
  error?: Error | null;
  onClassSelect: (classId: string | null) => void;
}

const OverviewView: React.FC<OverviewViewProps> = ({
  examSummaries,
  classPerformances,
  studentResults,
  onClassSelect,
  isLoading,
  error,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { metrics, alerts, learningGaps, predictions } = useStrategicData(examSummaries, classPerformances, studentResults);

  const hasData = examSummaries.length > 0 && classPerformances.length > 0;

  const [filters, setFilters] = useState({
  selectedClasses: [] as string[],
  selectedSubjects: [] as string[],
  selectedTimeRange: 'all' as string
});

  // Funções de navegação memoizadas
  const totalSlides = 4; // Definir como constante ou calcular com base nos slides

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
        case '1': case '2': case '3': case '4':
          goToSlide(Number(e.key) - 1); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, goToSlide, totalSlides]);

  // Slides config
  const slides = useMemo(() => {
    const slideItems: SlideItem[] = [
      {
        key: "performance",
        title: "Desempenho por Turma",
        component: <ClassPerformanceChart
          classPerformances={classPerformances}
          onClassSelect={onClassSelect}
        />
      },
      {
        key: "progress",
        title: "Progresso Temporal",
        component: <TemporalProgressChart examSummaries={examSummaries} />
      },
      {
        key: "trend",
        title: "Tendência de Desempenho",
        component: <ProgressTrendChart examSummaries={examSummaries} />
      },
      {
        key: "alerts",
        title: "Alertas Prioritários",
        component: <AlertPanel
          alerts={alerts}
          onSelectClass={(classId) => {
            onClassSelect(classId);
            // Remova ou substitua setSelectedView se não estiver sendo usado
          }}
        />
      }, {
        key: "gaps",
        title: "Gaps de Aprendizagem",
        component: <LearningGapsPanel
          gaps={learningGaps}
          onSelectSkill={(skill) => console.log('Skill selected:', skill)}
        />
      },
      {
        key: "benchmark",
        title: "Benchmarking",
        component: <BenchmarkQuadrant
          classes={classPerformances}
          onSelectClass={onClassSelect}
        />
      },
      {
        key: "value-added",
        title: "Valor Agregado",
        component: <ValueAddedChart
          classes={classPerformances}
          onSelectClass={onClassSelect}
        />
      },
      {
        key: "predictions",
        title: "Predições",
        component: <PredictionsPanel
          predictions={predictions}
          onSelectStudent={(studentId) => console.log('Student selected:', studentId)}
        />
      },
      {
    key: "trends",
    title: "Tendências Temporais",
    component: <TimeTrendsPanel
      examSummaries={examSummaries}
      timeRange={filters.selectedTimeRange as any}
    />
  },
  {
    key: "comparison",
    title: "Modo Comparação",
    component: <ComparisonMode
      classPerformances={classPerformances}
      onSelectClass={onClassSelect}
    />
  }
    ];

    return slideItems.map(item => (
      <DashboardCard key={item.key} title={item.title} fullWidth>
        {item.component}
      </DashboardCard>
    ));
  }, [classPerformances, alerts, learningGaps, predictions, onClassSelect]);


  if (isLoading) return <LoadingSpinner />;
  if (error) return <EmptyState message={`Erro ao carregar dados: ${error.message}`} />;

  return (
    <Container>
      {hasData ? (
        <>
          <InstitutionalMetrics metrics={metrics} />

          <GraphsContainer>
            <SlideTitle>Visualizações de Dados</SlideTitle>

            <SlideContainer>
              {slides[currentSlide]}

              <SlideControls>
                <SlideButton onClick={prevSlide} aria-label="Slide anterior">
                  <FiChevronLeft />
                </SlideButton>

                <BulletsContainer>
                  {slides.map((_, index) => (
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
            Navegação: <kbd>←</kbd> <kbd>→</kbd> ou <kbd>1</kbd>-<kbd>4</kbd> para slides
          </KeyboardHint>
        </>
      ) : (
        <EmptyState message="Nenhum dado disponível para exibição" />
      )}
    </Container>
  );
};

export default OverviewView;