import React, { Children, isValidElement } from 'react';
import { TabsProps } from '../../types/evaluation/Question';
import { TabContent, TabsContainer, TabsList, TabTrigger } from '../../styles/tab';

interface TabChildProps {
  id: string;
}

const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  children,
  variant = 'default',
  orientation = 'horizontal'
}: TabsProps) => {
  // Encontrar o conteúdo ativo baseado no activeTab
  const activeContent = Children.toArray(children).find(
    (child) => 
      isValidElement<TabChildProps>(child) && 
      child.props.id === activeTab
  );

  return (
    <TabsContainer orientation={orientation}>
      <TabsList variant={variant} orientation={orientation}>
        {tabs.map((tab) => (
          <TabTrigger
            key={tab.id}
            active={activeTab === tab.id}
            variant={variant}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </TabTrigger>
        ))}
      </TabsList>

      <TabContent>
        {activeContent || (isValidElement(children) ? children : null)}
      </TabContent>
    </TabsContainer>
  );
};

export default Tabs;