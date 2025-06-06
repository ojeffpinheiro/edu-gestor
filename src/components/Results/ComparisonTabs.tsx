import React, { useState } from 'react';
import styled from 'styled-components';
import { ComparisonTab } from '../../utils/types/Assessment';

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background: ${props => props.active ? '#f0f0f0' : 'transparent'};
  border: none;
  border-bottom: ${props => props.active ? '2px solid #4285f4' : 'none'};
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
`;

interface ComparisonTabsProps {
  tabs: ('ranking' | 'value-added' | 'equity')[];
  defaultTab?: string;
  onTabChange: (tab: 'ranking' | 'value-added' | 'equity') => void;
}

/**
 * Componente de abas para navegação entre diferentes modos de comparação.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array<'ranking' | 'value-added' | 'equity'>} props.tabs - Abas disponíveis
 * @param {string} [props.defaultTab] - Aba selecionada por padrão (opcional)
 * @param {Function} props.onTabChange - Callback para mudança de aba
 * @returns {JSX.Element} Componente de abas de comparação
 * 
 * @example
 * <ComparisonTabs
 *   tabs={['ranking', 'value-added']}
 *   defaultTab="ranking"
 *   onTabChange={handleTabChange}
 * />
 */
const ComparisonTabs: React.FC<ComparisonTabsProps> = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const tabLabels = {
  'ranking': 'Ranking',
  'value-added': 'Valor Agregado',
  'equity': 'Equidade'
};

  const handleTabClick = (tab: ComparisonTab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <TabsContainer>
      {tabs.map(tab => (
        <Tab 
          key={tab}
          active={activeTab === tab}
          onClick={() => handleTabClick(tab)}
        >
          {tabLabels[tab]}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default ComparisonTabs;