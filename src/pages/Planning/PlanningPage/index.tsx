import React, { useState } from 'react';
import { TeamsProvider } from '../../../contexts/TeamsContext';
import { LessonsProvider } from '../../../contexts/LessonsContext';
import { ScheduleProvider } from '../../../contexts/ScheduleContext';
import { ModalProvider } from '../../../contexts/ModalContext';
import { CalendarProvider } from '../../../contexts/CalendarContext';

import { Session, ShiftSettings, Team } from '../../../utils/types/Planning';
import { schoolCalendar } from '../../../mocks/events';

import ClassScheduleTab from '../../../components/Planning/Tabs/ClassScheduleTab';
import TeamTab from '../../../components/Planning/Tabs/TeamTab';
import CalendarTab from '../../../components/Planning/Tabs/CalendarTab';
import TabPlanning from '../../../components/Planning/Tabs/PlanningTab';

import ShiftSettingsEditor from '../../../components/Planning/ShiftSettingsEditor';
import LessonForm from '../../../components/Planning/LessonForm';
import NavigationMenu from '../../../components/Planning/NavigationMenu';

import HeaderComponent from './HeaderComponent';

import {
  Container,
  MainContent,
  Sidebar,
  ContentArea,
  GridContainer,
  Section,
  SectionTitle,
  SectionContent
} from './styles';
import TeamModal from '../../../components/Planning/Tabs/TeamTab/AddTeamModal';

const PlanejadorClasse = () => {
  const [activeView, setActiveView] = useState<'overview' | 'teams' | 'schedule' | 'calendar'>('overview');
  const [shiftSettings, setShiftSettings] = useState<ShiftSettings>({
    name: 'Manhã',
    startTime: '08:00',
    endTime: '16:00',
    periodDuration: 50,
    breakDuration: 10,
    periods: []
  });
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [teamFormData, setTeamFormData] = useState<Omit<Team, 'id'>>({
    name: '',
    session: Session.MORNING,
    numStudent: 0,
    gradeLevel: '',
    specificRequirements: '',
    schedule: []
  });

  const handleSettingsChange = (newSettings: ShiftSettings) => {
    setShiftSettings(newSettings);
  };
  // Função para abrir o modal para criação
  const handleOpenCreateModal = () => {
    setCurrentTeam(null);
    setTeamFormData({
      name: '',
      session: Session.MORNING,
      numStudent: 0,
      gradeLevel: '',
      specificRequirements: '',
      schedule: []
    });
    setIsTeamModalOpen(true);
  };

  // Função para abrir o modal para edição
  const handleOpenEditModal = (team: Team) => {
    setCurrentTeam(team);
    setTeamFormData({
      name: team.name,
      session: team.session,
      numStudent: team.numStudent,
      gradeLevel: team.gradeLevel || '',
      specificRequirements: team.specificRequirements || '',
      schedule: team.schedule || []
    });
    setIsTeamModalOpen(true);
  };

  // Função para salvar (criação ou edição)
  const handleSaveTeam = (teamData: Omit<Team, 'id'>) => {
    if (currentTeam) {
      // Lógica para editar a turma
      // Exemplo: updateTeam({ ...teamData, id: currentTeam.id });
    } else {
      // Lógica para criar nova turma
      // Exemplo: addTeam({ ...teamData, id: Date.now() });
    }
    setIsTeamModalOpen(false);
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

                <MainContent>
                  <Sidebar>
                    <NavigationMenu
                      activeView={activeView}
                      onViewChange={setActiveView}
                    />

                    <ShiftSettingsEditor
                      settings={shiftSettings}
                      onChange={handleSettingsChange}
                    />
                  </Sidebar>

                  <ContentArea>
                    {activeView === 'overview' && (
                      <GridContainer>
                        <Section>
                          <SectionTitle>Planejamento Didático</SectionTitle>
                          <SectionContent>
                            <TabPlanning />
                          </SectionContent>
                        </Section>

                        <Section>
                          <SectionTitle>Próximas Aulas</SectionTitle>
                          <SectionContent>
                            <ClassScheduleTab />
                          </SectionContent>
                        </Section>

                        <Section>
                          <SectionTitle>Turmas</SectionTitle>
                          <SectionContent>
                            <TeamTab
                              onEditTeam={handleOpenEditModal}
                              onCreateTeam={handleOpenCreateModal} />
                          </SectionContent>
                        </Section>

                        <Section>
                          <SectionTitle>Calendário</SectionTitle>
                          <SectionContent>
                            <CalendarTab />
                          </SectionContent>
                        </Section>
                      </GridContainer>
                    )}

                    {activeView === 'teams' && (
                      <Section fullWidth>
                        <SectionTitle>Gestão de Turmas</SectionTitle>
                        <SectionContent>
                          <TeamTab
                            onEditTeam={handleOpenEditModal}
                            onCreateTeam={handleOpenCreateModal} />
                        </SectionContent>
                      </Section>
                    )}

                    {activeView === 'schedule' && (
                      <Section fullWidth>
                        <SectionTitle>Grade Horária</SectionTitle>
                        <SectionContent>
                          <ClassScheduleTab />
                        </SectionContent>
                      </Section>
                    )}

                    {activeView === 'calendar' && (
                      <Section fullWidth>
                        <SectionTitle>Calendário Escolar</SectionTitle>
                        <SectionContent>
                          <CalendarTab />
                        </SectionContent>
                      </Section>
                    )}
                  </ContentArea>
                </MainContent>

                <LessonForm />
                {/* Modal de Turma */}
                {isTeamModalOpen && (
                  <TeamModal
                    teamData={teamFormData}
                    editingTeam={currentTeam}
                    onSave={handleSaveTeam}
                    onClose={() => setIsTeamModalOpen(false)}
                  />
                )}
              </Container>
            </ModalProvider>
          </ScheduleProvider>
        </CalendarProvider>
      </LessonsProvider>
    </TeamsProvider>
  );
};

export default PlanejadorClasse;