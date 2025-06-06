import React, { useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart, 
  InteractionItem
} from 'chart.js';

export interface InteractiveChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
  options?: any;
  onElementClick?: (element: { label: string; value: number; datasetIndex: number }) => void;
}

/**
 * Gráfico interativo com suporte a eventos de clique nos elementos.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.data - Dados do gráfico no formato Chart.js
 * @param {Object} [props.options] - Opções de configuração do gráfico (opcional)
 * @param {Function} [props.onElementClick] - Callback para clique em elementos do gráfico (opcional)
 * @returns {JSX.Element} Gráfico de barras interativo
 * 
 * @example
 * <InteractiveChart
 *   data={chartData}
 *   options={chartOptions}
 *   onElementClick={handleBarClick}
 * />
 */
const InteractiveChart: React.FC<InteractiveChartProps> = ({ data, options, onElementClick }) => {
  const chartRef = React.useRef<Chart<'bar', number[], string> | null>(null);

  const handleClick = useCallback((event: MouseEvent) => {
    if (!chartRef.current || !onElementClick) return;

    // Criamos um objeto de evento completo que o Chart.js espera
    const chartEvent = {
      type: 'click',
      native: event,
      x: event.clientX,
      y: event.clientY,
      // Adicionamos propriedades mínimas necessárias para evitar erros
      preventDefault: () => event.preventDefault(),
      stopPropagation: () => event.stopPropagation()
    } as unknown as Event; // Type assertion necessário

    const elements = chartRef.current.getElementsAtEventForMode(
      chartEvent,
      'nearest',
      { intersect: true },
      false
    ) as InteractionItem[];

    if (elements.length > 0) {
      const { datasetIndex, index } = elements[0];
      const value = data.datasets[datasetIndex].data[index];
      const label = data.labels[index];
      onElementClick({ label, value, datasetIndex });
    }
  }, [data, onElementClick]);

  React.useEffect(() => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) return;

    const handler = (event: MouseEvent) => {
      handleClick(event);
    };

    canvas.addEventListener('click', handler);

    return () => {
      canvas.removeEventListener('click', handler);
    };
  }, [handleClick]);

  return (
    <Bar
      ref={chartRef}
      data={data}
      options={{
        responsive: true,
        ...options,
        onClick: undefined
      }}
    />
  );
};

export default InteractiveChart;