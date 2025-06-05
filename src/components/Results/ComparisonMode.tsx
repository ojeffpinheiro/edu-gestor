import React, { useState } from 'react';
import styled from 'styled-components';
import { BenchmarkQuadrant } from './BenchmarkQuadrant';
import { ClassPerformance } from '../../utils/types/Assessment';
import ClassPerformanceChart from './ClassPerformanceChart';

const ComparisonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin-top: var(--space-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonControl = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
`;

// Definindo explicitamente as métricas permitidas
type AllowedMetric = 'averageScore' | 'passingRate' | 'attendanceRate';

interface ComparisonModeProps {
  classPerformances: ClassPerformance[];
  onSelectClass: (classId: string | null) => void;
}

export const ComparisonMode: React.FC<ComparisonModeProps> = ({
  classPerformances,
  onSelectClass
}) => {
  const [xMetric, setXMetric] = useState<AllowedMetric>('averageScore');
  const [yMetric, setYMetric] = useState<AllowedMetric>('passingRate');

  const availableMetrics: AllowedMetric[] = [
    'averageScore',
    'passingRate',
    'attendanceRate'
  ];

  return (
    <div>
      <ComparisonControl>
        <div>
          <label>Eixo X:</label>
          <select 
            value={xMetric} 
            onChange={(e) => setXMetric(e.target.value as AllowedMetric)}
          >
            {availableMetrics.map(metric => (
              <option key={`x-${metric}`} value={metric}>
                {metric === 'averageScore' ? 'Média' :
                 metric === 'passingRate' ? 'Aprovação' : 'Frequência'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Eixo Y:</label>
          <select 
            value={yMetric} 
            onChange={(e) => setYMetric(e.target.value as AllowedMetric)}
          >
            {availableMetrics.map(metric => (
              <option key={`y-${metric}`} value={metric}>
                {metric === 'averageScore' ? 'Média' :
                 metric === 'passingRate' ? 'Aprovação' : 'Frequência'}
              </option>
            ))}
          </select>
        </div>
      </ComparisonControl>

      <ComparisonContainer>
        <div>
          <ClassPerformanceChart 
            classPerformances={classPerformances}
            onClassSelect={onSelectClass}
          />
        </div>
        <div>
          <BenchmarkQuadrant
            classes={classPerformances}
            xMetric={xMetric}
            yMetric={yMetric}
            onSelectClass={onSelectClass}
          />
        </div>
      </ComparisonContainer>
    </div>
  );
};