import React from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  background: var(--color-muted);
  padding: 0.25rem;
  border-radius: 0.5rem;
  max-width: 600px;
`;

const TabTrigger = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  background: ${({ $active }) => 
    $active ? 'var(--color-background)' : 'transparent'};
  color: ${({ $active }) => 
    $active ? 'var(--color-foreground)' : 'var(--color-muted-foreground)'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: var(--color-accent);
    color: var(--color-accent-foreground);
  }
`;

const TabContent = styled.div`
  padding: 1rem 0;
`;

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> & {
  List: React.FC<TabsListProps>;
  Trigger: React.FC<TabsTriggerProps>;
  Content: React.FC<TabsContentProps>;
} = ({ value, onValueChange, children }) => {
  return (
    <TabsContainer>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            activeValue: value,
            onValueChange 
          } as any);
        }
        return child;
      })}
    </TabsContainer>
  );
};

const TabsListComponent: React.FC<TabsListProps & { activeValue?: string; onValueChange?: (value: string) => void }> = ({ 
  children, activeValue, onValueChange 
}) => {
  return <TabsList>{children}</TabsList>;
};

const TabsTriggerComponent: React.FC<TabsTriggerProps & { activeValue?: string; onValueChange?: (value: string) => void }> = ({ 
  value, children, icon, activeValue, onValueChange 
}) => {
  return (
    <TabTrigger
      $active={activeValue === value}
      onClick={() => onValueChange?.(value)}
    >
      {icon}
      {children}
    </TabTrigger>
  );
};

const TabsContentComponent: React.FC<TabsContentProps & { activeValue?: string }> = ({ 
  value, children, activeValue 
}) => {
  if (value !== activeValue) return null;
  return <TabContent>{children}</TabContent>;
};

Tabs.List = TabsListComponent;
Tabs.Trigger = TabsTriggerComponent;
Tabs.Content = TabsContentComponent;