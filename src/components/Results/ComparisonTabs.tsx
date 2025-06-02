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