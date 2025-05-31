import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ScoreDistributionChartProps {
  data: {
    score: number;
    count: number;
  }[];
  binSize?: number;
  width?: number;
  height?: number;
}

const ScoreDistributionChart: React.FC<ScoreDistributionChartProps> = ({
  data,
  binSize = 10,
  width = 500,
  height = 300
}) => {
  // Processar os dados para criar bins
  const processData = () => {
    const bins: Record<number, number> = {};
    
    // Inicializar bins
    for (let i = 0; i <= 100; i += binSize) {
      bins[i] = 0;
    }
    
    // Contar scores em cada bin
    data.forEach(item => {
      const bin = Math.floor(item.score / binSize) * binSize;
      bins[bin] = (bins[bin] || 0) + item.count;
    });
    
    return Object.entries(bins).map(([score, count]) => ({
      score: Number(score),
      count
    }));
  };

  const chartData = processData();

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="score" 
          label={{ value: 'Intervalo de Notas', position: 'insideBottomRight', offset: -5 }} 
        />
        <YAxis 
          label={{ value: 'Número de Alunos', angle: -90, position: 'insideLeft' }} 
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" name="Distribuição" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreDistributionChart;