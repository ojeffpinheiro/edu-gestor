import React from 'react';
import { Line } from 'react-chartjs-2';
import { PerformancePrediction, StudentResult } from '../../../utils/types/Assessment';

interface PredictionAccuracyChartProps {
  predictions: PerformancePrediction[];
  studentResults: StudentResult[];
}

const PredictionAccuracyChart: React.FC<PredictionAccuracyChartProps> = ({
  predictions,
  studentResults
}) => {
  // Correlacionar previsões com resultados reais
  const accuracyData = predictions.map(prediction => {
    const student = studentResults.find(s => s.studentId === prediction.studentId);
    const actualResult = student?.examResults.find(er => er.examId === prediction.examId);
    const actualScore = actualResult ? (actualResult.totalScore / actualResult.answers.length) * 100 : null;
    
    return {
      predicted: prediction.predictedScore,
      actual: actualScore,
      examId: prediction.examId,
      studentId: prediction.studentId,
      confidence: prediction.confidence
    };
  }).filter(item => item.actual !== null);

  const data = {
    labels: accuracyData.map((_, i) => `Previsão ${i + 1}`),
    datasets: [
      {
        label: 'Previsão',
        data: accuracyData.map(item => item.predicted),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.1,
        pointRadius: accuracyData.map(item => 5 + (item.confidence * 5))
      },
      {
        label: 'Resultado Real',
        data: accuracyData.map(item => item.actual),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Pontuação (%)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const datasetLabel = context.dataset.label;
            const value = context.parsed.y;
            const index = context.dataIndex;
            const item = accuracyData[index];
            
            if (datasetLabel === 'Previsão') {
              return [
                `Previsão: ${value}%`,
                `Confiança: ${Math.round(item.confidence * 100)}%`
              ];
            }
            return `${datasetLabel}: ${value}%`;
          }
        }
      }
    }
  };

  // Calcular métricas de acurácia
  const totalPredictions = accuracyData.length;
  const accuratePredictions = accuracyData.filter(item => 
    Math.abs(item.predicted - item.actual!) <= 10
  ).length;
  const accuracyRate = totalPredictions > 0 
    ? Math.round((accuratePredictions / totalPredictions) * 100) 
    : 0;

  return (
    <div className="prediction-accuracy-chart">
      <div className="accuracy-metrics">
        <div className="metric">
          <span className="value">{accuracyRate}%</span>
          <span className="label">Acurácia (dentro de ±10%)</span>
        </div>
        <div className="metric">
          <span className="value">{totalPredictions}</span>
          <span className="label">Previsões Validadas</span>
        </div>
      </div>
      <Line data={data} options={options} />
      <div className="legend">
        <div className="legend-item">
          <span className="color prediction"></span>
          <span>Previsão (tamanho indica confiança)</span>
        </div>
        <div className="legend-item">
          <span className="color actual"></span>
          <span>Resultado Real</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionAccuracyChart;