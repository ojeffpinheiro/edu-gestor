import React from 'react';
import { FiBell, FiMenu } from 'react-icons/fi';
import { MdAssessment, MdAssignment, MdBarChart, MdDashboard, MdQuestionAnswer } from 'react-icons/md';

import { SearchBar } from './SearchBar';
import { NavigationDropdown } from './NavigationDropdown';
import { ProfileDropdown } from '../Question/ProfileDropdown';
import { 
    MenuButton, NavbarContainer, NavLeft, NavRight, NotificationBadge, NotificationButton 
} from '../../styles/navbar';

interface NavbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onMenuClick?: () => void;
  notificationCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({
  searchValue = '',
  onSearchChange = () => {},
  onMenuClick = () => {},
  notificationCount = 0
}) => {
  const navItems = [
    { icon: <MdDashboard />, label: 'Dashboard', path: '/' },
    { icon: <MdQuestionAnswer />, label: 'Banco de Questões', path: '/questions' },
    { icon: <MdAssignment />, label: 'Geração de Prova', path: '/exams' },
    { icon: <MdAssessment />, label: 'Avaliação', path: '/evaluations' },
    { icon: <MdBarChart />, label: 'Estatísticas', path: '/stats' }
  ];

    return (
    <NavbarContainer>
      <NavLeft>
        <MenuButton onClick={onMenuClick}>
          <FiMenu />
        </MenuButton>

        <NavigationDropdown items={navItems} />
      </NavLeft>

      <SearchBar value={searchValue} onChange={onSearchChange} />
      
      <NavRight>
        <NotificationButton>
          <FiBell />
          {notificationCount > 0 && (
            <NotificationBadge>{Math.min(notificationCount, 9)}</NotificationBadge>
          )}
        </NotificationButton>

        <ProfileDropdown />
      </NavRight>
    </NavbarContainer>
  );
};

export default Navbar;