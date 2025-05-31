import React, { useState } from 'react';
import styled from 'styled-components';

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
  tabs: string[];
  defaultTab?: string;
  onTabChange: (tab: string) => void;
}

const ComparisonTabs: React.FC<ComparisonTabsProps> = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const handleTabClick = (tab: string) => {
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
          {tab}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default ComparisonTabs;