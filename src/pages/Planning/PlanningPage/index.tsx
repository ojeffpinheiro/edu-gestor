import React, { useState } from 'react';

import { TeamsProvider } from '../../../contexts/TeamsContext';
import { LessonsProvider } from '../../../contexts/LessonsContext';
import { ScheduleProvider } from '../../../contexts/ScheduleContext';
import { ModalProvider } from '../../../contexts/ModalContext';
import { CalendarProvider } from '../../../contexts/CalendarContext';

import { ShiftSettings } from '../../../utils/types/Planning';

import { schoolCalendar } from '../../../mocks/events';

import ClassScheduleTab from '../../../components/Planning/Tabs/ClassScheduleTab';
import TeamTab from '../../../components/Planning/Tabs/TeamTab';
import CalendarTab from '../../../components/Planning/Tabs/CalendarTab';
import TabPlanning from '../../../components/Planning/Tabs/PlanningTab';

import ShiftSettingsEditor from '../../../components/Planning/ShiftSettingsEditor';
import LessonForm from '../../../components/Planning/LessonForm';

import HeaderComponent from './HeaderComponent';
import NavigationTabs from './NavigationTabs';

import { Container, Main } from './styles';

const PlanejadorClasse = () => {
  const [activeTab, setActiveTab] = useState('planejamento');
  const [shiftSettings, setShiftSettings] = useState<ShiftSettings>({
    name: 'Manhã',
    startTime: '08:00',
    endTime: '16:00',
    periodDuration: 50,
    breakDuration: 10,
    periods: []
  });

  const handleSettingsChange = (newSettings: ShiftSettings) => {
    setShiftSettings(newSettings);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'planejamento': return <TabPlanning />;
      case 'horarios': return <ClassScheduleTab />;
      case 'turmas': return <TeamTab />;
      case 'calendario': return <CalendarTab />;
      default: return null;
    }
  };

  return (
    <TeamsProvider>
      <LessonsProvider>
        <CalendarProvider initialCalendar={schoolCalendar}>
          <ScheduleProvider>
            <ModalProvider>
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

                <ShiftSettingsEditor
                  settings={shiftSettings}
                  onChange={handleSettingsChange}
                />
                <LessonForm />
              </Container>
            </ModalProvider>
          </ScheduleProvider>
        </CalendarProvider>
      </LessonsProvider>
    </TeamsProvider>
  );
};

export default PlanejadorClasse;