// ProgressView.tsx
import React from 'react';
import { ClassPerformance } from '../../../utils/types/Assessment';
import ProgressChart from '../Charts/ProgressChart';

interface ProgressViewProps {
  currentClass: ClassPerformance;
}

const ProgressView: React.FC<ProgressViewProps> = ({ currentClass }) => {
  // Preparar dados para o gráfico de progresso
  const progressData = currentClass.examResults
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(exam => ({
      date: new Date(exam.date),
      averageScore: exam.averageScore,
      classAverage: currentClass.averageScore,
      passingRate: exam.passingRate
    }));

  return (
    <div className="progress-chart-container">
      <ProgressChart
        progressData={progressData}  // Propriedade renomeada para progressData
        width={700}
        height={400}
        margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
        xAxisLabel="Data"
        yAxisLabel="Nota Média"
      />
    </div>
  );
};

export default ProgressView;