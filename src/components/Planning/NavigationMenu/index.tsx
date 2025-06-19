import React from 'react';
import { FiHome, FiUsers, FiCalendar, FiClock } from 'react-icons/fi';
import {
  MenuContainer,
  MenuItem,
  MenuIcon,
  MenuLabel
} from './styles';

type ViewType = 'overview' | 'teams' | 'schedule' | 'calendar';

interface NavigationMenuProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ activeView, onViewChange }) => {
  return (
    <MenuContainer>
      <MenuItem 
        $active={activeView === 'overview'} 
        onClick={() => onViewChange('overview')}
      >
        <MenuIcon><FiHome /></MenuIcon>
        <MenuLabel>Visão Geral</MenuLabel>
      </MenuItem>
      
      <MenuItem 
        $active={activeView === 'teams'} 
        onClick={() => onViewChange('teams')}
      >
        <MenuIcon><FiUsers /></MenuIcon>
        <MenuLabel>Turmas</MenuLabel>
      </MenuItem>
      
      <MenuItem 
        $active={activeView === 'schedule'} 
        onClick={() => onViewChange('schedule')}
      >
        <MenuIcon><FiClock /></MenuIcon>
        <MenuLabel>Horários</MenuLabel>
      </MenuItem>
      
      <MenuItem 
        $active={activeView === 'calendar'} 
        onClick={() => onViewChange('calendar')}
      >
        <MenuIcon><FiCalendar /></MenuIcon>
        <MenuLabel>Calendário</MenuLabel>
      </MenuItem>
    </MenuContainer>
  );
};

export default NavigationMenu;