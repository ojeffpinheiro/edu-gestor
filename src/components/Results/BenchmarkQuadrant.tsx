import React from 'react';
import styled from 'styled-components';
import { ClassPerformance } from "../../utils/types/Assessment";

// Definindo explicitamente as métricas disponíveis
const AVAILABLE_METRICS = [
  'averageScore',
  'passingRate',
  'studentCount'
] as const;

type MetricKey = typeof AVAILABLE_METRICS[number];

// Verifica se uma string é uma métrica válida
function isMetricKey(value: string): value is MetricKey {
  return AVAILABLE_METRICS.includes(value as MetricKey);
}

interface BenchmarkQuadrantProps {
  classes: ClassPerformance[];
  xMetric?: MetricKey;
  yMetric?: MetricKey;
}

// Função auxiliar para normalizar valores entre 0 e 100
const normalize = (value: number): number => {
  return Math.min(Math.max(value, 0), 100);
};

// Componente estilizado
const QuadrantContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border: 1px solid var(--color-border);
  margin: var(--space-md) 0;
  background-color: var(--color-background);
`;

const AxisLabel = styled.div`
  position: absolute;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
`;

const YAxisLabel = styled(AxisLabel)`
  left: var(--space-sm);
  top: 50%;
  transform: rotate(-90deg) translateX(-50%);
`;

const XAxisLabel = styled(AxisLabel)`
  bottom: var(--space-sm);
  left: 50%;
  transform: translateX(-50%);
`;

const DataPoint = styled.div<{ $color?: string }>`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color || 'var(--color-primary)'};
  transform: translate(-50%, 50%);
  cursor: pointer;
  transition: all var(--transition-fast);
  z-index: 1;

  &:hover {
    transform: translate(-50%, 50%) scale(1.5);
    box-shadow: 0 0 0 2px var(--color-primary-light);
  }
`;

const BenchmarkQuadrant: React.FC<BenchmarkQuadrantProps> = ({
  classes,
  xMetric = 'averageScore',
  yMetric = 'passingRate'
}) => {
  // Garante que as métricas são válidas
  const safeXMetric = isMetricKey(xMetric) ? xMetric : 'averageScore';
  const safeYMetric = isMetricKey(yMetric) ? yMetric : 'passingRate';

  // Função segura para obter valores
  const getMetricValue = (classPerf: ClassPerformance, metric: MetricKey): number => {
    const value = classPerf[metric];
    return typeof value === 'number' ? value : 0;
  };

  return (
    <QuadrantContainer>
      <YAxisLabel>
        <span>{getMetricLabel(safeYMetric)}</span>
      </YAxisLabel>
      <XAxisLabel>
        <span>{getMetricLabel(safeXMetric)}</span>
      </XAxisLabel>
      
      {classes.map(classPerf => {
        const xValue = getMetricValue(classPerf, safeXMetric);
        const yValue = getMetricValue(classPerf, safeYMetric);
        
        return (
          <DataPoint 
            key={classPerf.classId}
            style={{
              left: `${normalize(xValue)}%`,
              bottom: `${normalize(yValue)}%`
            }}
            title={`${classPerf.className}\n${getMetricLabel(safeXMetric)}: ${xValue}\n${getMetricLabel(safeYMetric)}: ${yValue}`}
            $color={getPointColor(xValue, yValue)}
          />
        );
      })}
      
      {/* Linhas de referência (medianas) */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '1px',
        backgroundColor: 'var(--color-border)'
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '1px',
        backgroundColor: 'var(--color-border)'
      }} />
    </QuadrantContainer>
  );
};

// Objeto de labels com todas as métricas definidas
const METRIC_LABELS: Record<MetricKey, string> = {
  averageScore: 'Média de Pontuação',
  passingRate: 'Taxa de Aprovação',
  studentCount: 'Número de Alunos'
};

// Função auxiliar para obter labels amigáveis
function getMetricLabel(metric: MetricKey): string {
  return METRIC_LABELS[metric] || metric;
}

// Função para determinar a cor baseada nos valores
function getPointColor(xValue: number, yValue: number): string {
  if (xValue > 70 && yValue > 50) return 'var(--color-success)';
  if (xValue < 50 || yValue < 50) return 'var(--color-error)';
  return 'var(--color-warning)';
}

export default BenchmarkQuadrant;