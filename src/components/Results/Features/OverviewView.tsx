import React, { useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ClassPerformance, ExamSummary, StudentResult } from '../../../utils/types/Assessment';
import { useStrategicData } from '../../../hooks/useStrategicData';

import ScoreDistributionChart from '../Charts/ScoreDistributionChart';
import TemporalProgressChart from '../Charts/TemporalProgressChart';
import ClassPerformanceChart from '../ClassPerformanceChart';

import LoadingSpinner from '../../shared/LoadingSpinner';
import DashboardCard from '../DashboardCard';
import EmptyState from '../EmptyState';
import InstitutionalMetrics from '../InstitutionalMetrics';
import PerformanceTrendSection from '../PerformanceTrendChart';

import { 
  Container,
  GraphsContainer,
  SlideContainer, 
  SlideControls, 
  SlideButton,
  BulletsContainer,
  Bullet
} from './styles/OverviewViewStyles';
import { ProgressTrendChart } from '../Charts/ProgressTrendChart';

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
  const { metrics } = useStrategicData(examSummaries, classPerformances, studentResults);

  const distributionData = useMemo(() => {
    const allScores = examSummaries.flatMap(exam =>
      exam.results?.map(result => result.totalScore) || []
    );

    const scoreCounts = allScores.reduce((acc, score) => {
      acc[score] = (acc[score] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(scoreCounts).map(([score, count]) => ({
      score: Number(score),
      count
    }));
  }, [examSummaries]);

  const hasData = examSummaries.length > 0 && classPerformances.length > 0;

  const slides = [
    <DashboardCard key="performance" title="Desempenho por Turma" fullWidth>
      <ClassPerformanceChart 
        classPerformances={classPerformances} 
        onClassSelect={onClassSelect} 
      />
    </DashboardCard>,
    <DashboardCard key="progress" title="Progresso Temporal" fullWidth>
      <TemporalProgressChart examSummaries={examSummaries} />
    </DashboardCard>,
    <DashboardCard key="trend" title="Tendência de Desempenho" fullWidth>
      <ProgressTrendChart examSummaries={examSummaries} />
    </DashboardCard>,
    <DashboardCard key="distribution" title="Distribuição de Notas" fullWidth>
      <ScoreDistributionChart data={distributionData} />
    </DashboardCard>
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <EmptyState message={`Erro ao carregar dados: ${error.message}`} />;

  return (
    <Container>
      {hasData ? (
        <>
          <InstitutionalMetrics metrics={metrics} />

          <GraphsContainer>
            <SlideContainer>
              {slides[currentSlide]}
              
              <SlideControls>
                <SlideButton onClick={prevSlide}>
                  <FiChevronLeft />
                </SlideButton>
                
                <BulletsContainer>
                  {slides.map((_, index) => (
                    <Bullet 
                      key={index} 
                      $active={index === currentSlide}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </BulletsContainer>
                
                <SlideButton onClick={nextSlide}>
                  <FiChevronRight />
                </SlideButton>
              </SlideControls>
            </SlideContainer>
          </GraphsContainer>
        </>
      ) : (
        <EmptyState message="Nenhum dado disponível para exibição" />
      )}
    </Container>
  );
};

export default OverviewView;