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
    searchValue: string;
    onSearchChange: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
    searchValue = '',
    onSearchChange
}) => {
    return (
        <NavbarContainer>
            <NavLeft>
                <MenuButton>
                    <FiMenu />
                </MenuButton>

                <NavigationDropdown
                    items={[
                        { icon: <MdDashboard />, label: 'Dashboard' },
                        { icon: <MdQuestionAnswer />, label: 'Banco de Questões' },
                        { icon: <MdAssignment />, label: 'Geração de Prova' },
                        { icon: <MdAssessment />, label: 'Avaliação' },
                        { icon: <MdBarChart />, label: 'Estatísticas' }
                    ]}
                />
            </NavLeft>

            <SearchBar value={searchValue} onChange={onSearchChange} />
            <NavRight>
                <NotificationButton>
                    <FiBell />
                    <NotificationBadge>3</NotificationBadge>
                </NotificationButton>

                <ProfileDropdown />
            </NavRight>
        </NavbarContainer>
    )
};

export default Navbar;