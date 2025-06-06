// DistributionView.tsx
import React from 'react';
import { ClassPerformance, ExamSummary } from '../../../utils/types/Assessment';
import ScoreDistributionChart from '../Charts/ScoreDistributionChart';

interface DistributionViewProps {
  examSummaries: ClassPerformance['examResults'];
}

/**
 * Visualização de distribuição de notas para múltiplos exames.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ExamSummary[]} props.examSummaries - Resultados dos exames para análise
 * @returns {JSX.Element} Gráficos de distribuição de notas para cada exame
 * 
 * @example
 * <DistributionView examSummaries={classData.examResults} />
 */
const DistributionView: React.FC<DistributionViewProps> = ({ examSummaries }) => {
  // Processar dados para cada exame individualmente
  const processExamData = (exam: ExamSummary) => {
    const scores = exam.results?.map(r => r.totalScore) || [];
    const counts = scores.reduce((acc, score) => {
      acc[score] = (acc[score] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      examId: exam.examId,
      examName: exam.title,
      data: Object.entries(counts).map(([score, count]) => ({
        score: Number(score),
        count
      }))
    };
  };

  const examsData = examSummaries.map(processExamData);

  return (
    <div className="distribution-chart-container">
      {examsData.map(examData => (
        <div key={examData.examId} className="exam-distribution">
          <h4>{examData.examName}</h4>
          <ScoreDistributionChart 
            data={examData.data}
            width={600}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};

export default DistributionView;