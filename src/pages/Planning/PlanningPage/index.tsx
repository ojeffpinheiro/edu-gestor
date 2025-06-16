import React, { useState } from 'react';
import { PlanningProvider } from '../../../contexts/PlanningContext';

import TabPlanning from '../../../components/Planning/Tabs/PlanningTab';
import ClassScheduleTab from '../../../components/Planning/Tabs/ClassScheduleTab';
import TeamTab from '../../../components/Planning/Tabs/TeamTab';
import CalendarTab from '../../../components/Planning/Tabs/CalendarTab';

import HeaderComponent from './HeaderComponent';
import NavigationTabs from './NavigationTabs';

import { Container, Main } from './styles';

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
        <HeaderComponent 
          title="Planejador de Classe" 
          subtitle="Sistema de planejamento e gerenciamento para professores" 
        />

        <NavigationTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <Main>
          {renderActiveTab()}
        </Main>
      </Container>
    </PlanningProvider>
  );
};

export default PlanejadorClasse;