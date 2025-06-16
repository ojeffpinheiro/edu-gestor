import React, { useState } from 'react';
import { FaBookOpen, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';

import { PlanningProvider } from '../../../contexts/PlanningContext';

import TabPlanning from '../../../components/Planning/Tabs/PlanningTab';
import ClassScheduleTab from '../../../components/Planning/Tabs/ClassScheduleTab';
import TeamTab from '../../../components/Planning/Tabs/TeamTab';
import CalendarTab from '../../../components/Planning/Tabs/CalendarTab';

import {
  Container,
  Header,
  HeaderContainer,
  Title,
  Subtitle,
  NavContainer,
  Nav,
  NavList,
  NavItem,
  NavButton,
  Main
} from './styles'


/**
 * Componente principal do Planejador de Classe
 * @module PlanejadorClasse
 * @description Gerencia toda a aplicação, incluindo navegação por abas e estado global
 * @returns {JSX.Element} A estrutura completa da aplicação
 */
const PlanejadorClasse = () => {
  const [activeTab, setActiveTab] = useState('planejamento');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'planejamento':
        return <TabPlanning />;
      case 'horarios':
        return <ClassScheduleTab />;
      case 'turmas':
        return <TeamTab />;
      case 'calendario':
        return <CalendarTab />;
      default:
        return null;
    }
  };

  return (
    <PlanningProvider>
      <Container>
        <Header>
          <HeaderContainer>
            <Title>Planejador de Classe</Title>
            <Subtitle>Sistema de planejamento e gerenciamento para professores</Subtitle>
          </HeaderContainer>
        </Header>

        <Nav>
          <NavContainer>
            <NavList>
              <NavItem>
                <NavButton
                  onClick={() => setActiveTab('planejamento')}
                  active={activeTab === 'planejamento'}
                >
                  <FaBookOpen size={18} />
                  <span>Planejamento</span>
                </NavButton>
              </NavItem>
              <NavItem>
                <NavButton
                  onClick={() => setActiveTab('horarios')}
                  active={activeTab === 'horarios'}
                >
                  <FaClock size={18} />
                  <span>Horários</span>
                </NavButton>
              </NavItem>
              <NavItem>
                <NavButton
                  onClick={() => setActiveTab('turmas')}
                  active={activeTab === 'turmas'}
                >
                  <FaUsers size={18} />
                  <span>Turmas</span>
                </NavButton>
              </NavItem>
              <NavItem>
                <NavButton
                  onClick={() => setActiveTab('calendario')}
                  active={activeTab === 'calendario'}
                >
                  <FaCalendarAlt size={18} />
                  <span>Calendário</span>
                </NavButton>
              </NavItem>
            </NavList>
          </NavContainer>
        </Nav>

        <Main>
          {renderActiveTab()}
        </Main>
      </Container>
    </PlanningProvider>
  );
};

export default PlanejadorClasse