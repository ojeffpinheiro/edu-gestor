import React from 'react';
import { ToggleButton, ToggleContainer } from './styles';
import { CalendarViewType } from '../../../../types/academic/CalendarEvent';

interface ViewToggleProps {
  views: Array<{ key: CalendarViewType; label: string }>
  activeView: CalendarViewType
  onChange: (view: CalendarViewType) => void;
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