import React from 'react';
import { FaBookOpen, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';
import { Nav, NavContainer, NavList, NavItem, NavButton } from './styles';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: TabItem[] = [
  { id: 'planejamento', label: 'Planejamento', icon: <FaBookOpen size={18} /> },
  { id: 'horarios', label: 'Horários', icon: <FaClock size={18} /> },
  { id: 'turmas', label: 'Turmas', icon: <FaUsers size={18} /> },
  { id: 'calendario', label: 'Calendário', icon: <FaCalendarAlt size={18} /> },
];

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Nav>
      <NavContainer>
        <NavList>
          {tabs.map((tab) => (
            <NavItem key={tab.id}>
              <NavButton
                $active={activeTab === tab.id}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </NavButton>
            </NavItem>
          ))}
        </NavList>
      </NavContainer>
    </Nav>
  );
};

export default NavigationTabs;