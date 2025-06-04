import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ $active: boolean; $hasAlert?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ $active }) => $active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${({ $active }) => $active ? '#667eea' : 'transparent'};
  color: ${({ $active }) => $active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  ${({ $hasAlert }) => $hasAlert && `
    &::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background: #ef4444;
      border-radius: 50%;
    }
  `}
`;

interface AnalysisTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasAlerts: boolean;
}

const AnalysisTabs: React.FC<AnalysisTabsProps> = ({ 
  activeTab, 
  onTabChange,
  hasAlerts 
}) => {
  const tabs = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'performance', label: 'Desempenho' },
    { id: 'psychometric', label: 'Psicométrico' },
    { id: 'items', label: 'Análise de Itens' },
    { id: 'gaps', label: 'Gaps' },
    { id: 'predictions', label: 'Previsões', hasAlert: hasAlerts }
  ];

  return (
    <TabContainer>
      {tabs.map(tab => (
        <TabButton
          key={tab.id}
          $active={activeTab === tab.id}
          $hasAlert={tab.hasAlert}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
};

export default AnalysisTabs;