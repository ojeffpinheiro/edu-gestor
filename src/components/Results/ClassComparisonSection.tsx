import React from 'react';
import { ChartData, ClassPerformance } from '../../utils/types/Assessment';
import ClassSelectorChart from './Charts/ClassSelectorChart';
import InteractiveChart from './InteractiveChart';
import ComparisonTabs from './ComparisonTabs';

export interface ClassComparisonSectionProps {
  classPerformances: ClassPerformance[];
  selectedClasses: string[];
  onClassSelect: (ids: string[]) => void;
  onTabChange: (tab: 'ranking' | 'value-added' | 'equity') => void;
  prepareComparisonData: (classes: ClassPerformance[]) => ChartData;
  onElementClick?: (element: { label: string; value: number; datasetIndex: number }) => void;
}

/**
 * Seção de comparação entre turmas com seleção interativa e múltiplas visualizações.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ClassPerformance[]} props.classPerformances - Dados das turmas para comparação
 * @param {string[]} props.selectedClasses - IDs das turmas selecionadas
 * @param {Function} props.onClassSelect - Callback para seleção de turmas
 * @param {Function} props.onTabChange - Callback para mudança de aba
 * @param {Function} props.prepareComparisonData - Função para preparar dados do gráfico
 * @param {Function} [props.onElementClick] - Callback para clique em elemento do gráfico (opcional)
 * @returns {JSX.Element} Seção completa de comparação entre turmas
 * 
 * @example
 * <ClassComparisonSection
 *   classPerformances={classesData}
 *   selectedClasses={selectedIds}
 *   onClassSelect={handleClassSelect}
 *   onTabChange={handleTabChange}
 *   prepareComparisonData={prepareData}
 *   onElementClick={handleChartClick}
 * />
 */
const ClassComparisonSection: React.FC<ClassComparisonSectionProps> = ({
  classPerformances,
  selectedClasses,
  onClassSelect,
  onTabChange,
  prepareComparisonData,
  onElementClick
}) => {
  // Função para lidar com seleção de classes
  const handleClassSelect = (selected: ClassPerformance[]) => {
    onClassSelect(selected.map(c => c.classId));
  };

  return (
    <div className="benchmark-section">
      <ClassSelectorChart
        classes={classPerformances}
        initialSelection={selectedClasses}
        onSelectionChange={handleClassSelect}
      >
        {(selectedClasses) => (
          <InteractiveChart
            data={prepareComparisonData(selectedClasses)}
            onElementClick={onElementClick}
          />
        )}
      </ClassSelectorChart>
      <ComparisonTabs
        tabs={['ranking', 'value-added', 'equity']}
        onTabChange={onTabChange}
      />
    </div>
  );
};

export default ClassComparisonSection;