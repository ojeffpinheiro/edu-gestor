// components/Charts/HeatmapChart.tsx
import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

ChartJS.register(...registerables);

interface HeatmapChartProps {
  data: {
    xLabels: string[];
    yLabels: string[];
    values: number[][];
  };
  title?: string;
  valueFormatter?: (value: number) => string;
  onClick?: (xIndex: number, yIndex: number) => void;
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data,
  title = '',
  valueFormatter = (value) => value.toString(),
  onClick
}) => {
  const theme = useTheme();
  
  // Configuração do gráfico seguindo o padrão QuestionHeatmap
  const chartData = {
    labels: data.xLabels,
    datasets: data.yLabels.map((yLabel, yIndex) => ({
      label: yLabel,
      data: data.values[yIndex].map((value, xIndex) => ({
        x: xIndex,
        y: yIndex,
        value
      })),
      backgroundColor: (ctx: any) => {
        const value = ctx.dataset.data[ctx.dataIndex].value;
        return getColorForValue(value, theme);
      },
      borderWidth: 1,
      borderColor: theme.palette.divider,
      hoverBorderWidth: 2,
      hoverBorderColor: theme.palette.text.primary,
      width: (ctx: any) => {
        const chart = ctx.chart;
        const { top, bottom } = chart.chartArea;
        return (bottom - top) / data.yLabels.length - 1;
      },
      height: (ctx: any) => {
        const chart = ctx.chart;
        const { left, right } = chart.chartArea;
        return (right - left) / data.xLabels.length - 1;
      }
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          family: theme.typography.fontFamily
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.dataset.data[context.dataIndex].value;
            return `${context.dataset.label}: ${valueFormatter(value)}`;
          }
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        type: 'category' as const,
        labels: data.xLabels,
        ticks: {
          font: {
            family: theme.typography.fontFamily
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        type: 'category' as const,
        labels: data.yLabels,
        ticks: {
          font: {
            family: theme.typography.fontFamily
          }
        },
        grid: {
          display: false
        }
      }
    },
    onClick: (event: any, elements: any[]) => {
      if (onClick && elements.length > 0) {
        const { datasetIndex, index } = elements[0];
        onClick(index, datasetIndex);
      }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Chart
        type="bar"
        data={chartData}
        options={options}
      />
    </div>
  );
};

// Função auxiliar para determinar a cor baseada no valor
function getColorForValue(value: number, theme: any): string {
  if (value >= 0.8) return theme.palette.success.dark;
  if (value >= 0.6) return theme.palette.success.light;
  if (value >= 0.4) return theme.palette.warning.light;
  if (value >= 0.2) return theme.palette.warning.dark;
  return theme.palette.error.main;
}