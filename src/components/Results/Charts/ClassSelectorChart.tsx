import React, { useState } from 'react';
import { ClassPerformance } from '../../../types/academic/Assessment';

interface ClassSelectorChartProps {
  classes: ClassPerformance[];
  initialSelection?: string[];
  children: (selectedClasses: ClassPerformance[]) => React.ReactNode;
  onSelectionChange?: (selectedClasses: ClassPerformance[]) => void;
}
/**
 * Componente que combina seleção de turmas com visualização de gráfico.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ClassPerformance[]} props.classes - Lista de turmas disponíveis
 * @param {string[]} [props.initialSelection=[]] - IDs das turmas selecionadas inicialmente
 * @param {Function} props.children - Função de renderização que recebe as turmas selecionadas
 * @param {Function} [props.onSelectionChange] - Callback chamado quando a seleção muda
 * @returns {JSX.Element} Componente com painel de seleção e área de gráfico
 * 
 * @example
 * <ClassSelectorChart
 *   classes={classPerformances}
 *   onSelectionChange={handleSelectionChange}
 * >
 *   {(selectedClasses) => (
 *     <ComparisonBarChart 
 *       classes={selectedClasses} 
 *       metric="averageScore" 
 *     />
 *   )}
 * </ClassSelectorChart>
 */
const ClassSelectorChart: React.FC<ClassSelectorChartProps> = ({
  classes,
  initialSelection = [],
  children,
  onSelectionChange
}) => {
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>(initialSelection);

  const toggleClassSelection = (classId: string) => {
    const newSelection = selectedClassIds.includes(classId)
      ? selectedClassIds.filter(id => id !== classId)
      : [...selectedClassIds, classId];

    setSelectedClassIds(newSelection);

    // Adicione esta chamada
    if (onSelectionChange) {
      const selectedClasses = classes.filter(c =>
        newSelection.includes(c.classId) || newSelection.length === 0
      );
      onSelectionChange(selectedClasses);
    }
  };

  const selectedClasses = classes.filter(c =>
    selectedClassIds.includes(c.classId) || selectedClassIds.length === 0
  );

  return (
    <div className="chart-with-selector">
      <div className="class-selection-panel" >
        {classes.map(c => (
          <label key={c.classId} className="class-checkbox" style={{ margin: '2rem' }} >
            <input
              type="checkbox"
              checked={selectedClassIds.includes(c.classId)}
              onChange={() => toggleClassSelection(c.classId)}
            />
            {c.className}
          </label>
        ))}
      </div>

      <div className="chart-container">
        {children(selectedClasses)}
      </div>
    </div>
  );
};

export default ClassSelectorChart;