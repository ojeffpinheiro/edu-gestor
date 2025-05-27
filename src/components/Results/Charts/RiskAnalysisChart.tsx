import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { StudentResult, StudentRiskAssessment } from '../../../utils/types/Assessment';

interface RiskAnalysisChartProps {
  riskAssessments: StudentRiskAssessment[];
  studentResults: StudentResult[];
  onSelectStudent: (studentId: string) => void;
}

const RiskAnalysisChart: React.FC<RiskAnalysisChartProps> = ({
  riskAssessments,
  studentResults,
  onSelectStudent
}) => {
  // Correlacionar avaliações de risco com desempenho real
  const dataPoints = riskAssessments.map(assessment => {
    const student = studentResults.find(s => s.studentId === assessment.studentId);
    return {
      x: assessment.riskScore,
      y: student ? student.overallAverage : null,
      studentId: assessment.studentId,
      riskLevel: assessment.riskLevel
    };
  });

  const data = {
    datasets: [
      {
        label: 'Alunos',
        data: dataPoints,
        backgroundColor: dataPoints.map(point => 
          point.riskLevel === 'high' ? 'rgba(255, 99, 132, 0.7)' :
          point.riskLevel === 'medium' ? 'rgba(255, 206, 86, 0.7)' :
          'rgba(75, 192, 192, 0.7)'
        ),
        pointRadius: 8,
        pointHoverRadius: 10
      }
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Pontuação de Risco'
        },
        min: 0,
        max: 100
      },
      y: {
        title: {
          display: true,
          text: 'Desempenho Real (%)'
        },
        min: 0,
        max: 100
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const point = dataPoints[context.dataIndex];
            const student = studentResults.find(s => s.studentId === point.studentId);
            return [
              `Aluno: ${student?.studentName || point.studentId}`,
              `Risco: ${point.riskLevel}`,
              `Pontuação: ${context.parsed.x}`,
              `Desempenho: ${context.parsed.y || 'N/A'}%`
            ];
          }
        }
      }
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        onSelectStudent(dataPoints[index].studentId);
      }
    }
  };

  return (
    <div className="risk-analysis-chart">
      <Scatter data={data} options={options} />
      <div className="legend">
        <div className="legend-item">
          <span className="color high-risk"></span>
          <span>Alto Risco</span>
        </div>
        <div className="legend-item">
          <span className="color medium-risk"></span>
          <span>Risco Médio</span>
        </div>
        <div className="legend-item">
          <span className="color low-risk"></span>
          <span>Baixo Risco</span>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysisChart;