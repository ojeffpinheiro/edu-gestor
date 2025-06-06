import React from 'react';
import { ChartTabs, TabButton } from './Features/styles/ClassViewStyles';

interface ModernTabsProps {
  tabs: Array<{ key: string; label: string; icon?: string }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ModernTabs: React.FC<ModernTabsProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <ChartTabs>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          $active={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </TabButton>
      ))}
    </ChartTabs>
  );
};