import React from 'react';
import styled from 'styled-components';
import { ClassPerformance } from "../../utils/types/Assessment";

const AVAILABLE_METRICS = [
  'averageScore',
  'passingRate',
  'attendanceRate'
] as const;

type MetricKey = typeof AVAILABLE_METRICS[number];

interface BenchmarkQuadrantProps {
  classes: ClassPerformance[];
  xMetric?: MetricKey;
  yMetric?: MetricKey;
  onSelectClass?: (classId: string) => void;
}

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

const METRIC_LABELS: Record<MetricKey, string> = {
  averageScore: 'Média',
  passingRate: 'Aprovação',
  attendanceRate: 'Frequência'
};

export const BenchmarkQuadrant: React.FC<BenchmarkQuadrantProps> = ({
  classes,
  xMetric = 'averageScore',
  yMetric = 'passingRate',
  onSelectClass
}) => {
  const getMetricValue = (classPerf: ClassPerformance, metric: MetricKey): number => {
    const value = classPerf[metric];
    return typeof value === 'number' ? value : 0;
  };

  const getPointColor = (xValue: number, yValue: number): string => {
    if (xValue > 70 && yValue > 70) return 'var(--color-success)';
    if (xValue < 50 || yValue < 50) return 'var(--color-error)';
    return 'var(--color-warning)';
  };

  return (
    <QuadrantContainer>
      <AxisLabel style={{ left: '10px', top: '50%', transform: 'rotate(-90deg) translateX(-50%)' }}>
        {METRIC_LABELS[yMetric]}
      </AxisLabel>
      <AxisLabel style={{ bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        {METRIC_LABELS[xMetric]}
      </AxisLabel>
      
      {classes.map(classPerf => {
        const xValue = getMetricValue(classPerf, xMetric);
        const yValue = getMetricValue(classPerf, yMetric);
        
        return (
          <DataPoint
            key={classPerf.classId}
            style={{
              left: `${xValue}%`,
              bottom: `${yValue}%`
            }}
            title={`${classPerf.className}\n${METRIC_LABELS[xMetric]}: ${xValue.toFixed(1)}\n${METRIC_LABELS[yMetric]}: ${yValue.toFixed(1)}`}
            $color={getPointColor(xValue, yValue)}
            onClick={() => onSelectClass?.(classPerf.classId)}
          />
        );
      })}
      
      {/* Linhas de referência */}
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', backgroundColor: 'var(--color-border)' }} />
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'var(--color-border)' }} />
    </QuadrantContainer>
  );
};