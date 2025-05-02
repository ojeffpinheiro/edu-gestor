import React from 'react';
import { ToggleButton, ToggleContainer } from './styles';

interface ViewToggleProps {
  views: { key: 'month' | 'week' | 'day'; label: string }[];
  activeView: 'month' | 'week' | 'day';
  onChange: (view: 'month' | 'week' | 'day') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ views, activeView, onChange }) => {
  return (
    <ToggleContainer>
      {views.map(view => (
        <ToggleButton
          key={view.key}
          active={activeView === view.key}
          onClick={() => onChange(view.key)}
        >
          {view.label}
        </ToggleButton>
      ))}
    </ToggleContainer>
  );
};