// ProgressChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProgressData {
  date: Date;
  averageScore: number;
  classAverage: number;
  passingRate: number;
}

interface ProgressChartProps {
  progressData: ProgressData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  progressData,
  width = 700,
  height = 400,
  margin = { top: 20, right: 30, bottom: 50, left: 50 },
  xAxisLabel = 'Data',
  yAxisLabel = 'Nota Média'
}) => {
  // Formatar dados para o gráfico
  const formattedData = progressData.map(item => ({
    ...item,
    date: item.date.toLocaleDateString() // Ou outro formato de data desejado
  }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={formattedData} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" label={{ value: xAxisLabel, position: 'insideBottomRight', offset: -10 }} />
        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="averageScore" stroke="#8884d8" name="Média do Exame" />
        <Line type="monotone" dataKey="classAverage" stroke="#82ca9d" name="Média da Turma" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;