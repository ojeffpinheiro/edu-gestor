import React, { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';

import { PlanningProvider } from '../../../contexts/PlannerContext';
import { PlanningData, Session, ShiftSettings, Team } from '../../../utils/types/Planning';

import { mockPlanningData } from '../../../mocks/planning';

import ClassScheduleTab from '../../../components/Planning/Tabs/ClassScheduleTab';
import TeamTab from '../../../components/Planning/Tabs/TeamTab';
import CalendarTab from '../../../components/Planning/Tabs/CalendarTab';
import TeamModal from '../../../components/Planning/Tabs/TeamTab/AddTeamModal';
import ShiftSettingsEditor from '../../../components/Planning/ShiftSettingsEditor';
import LessonForm from '../../../components/Planning/LessonForm';
import NavigationMenu from '../../../components/Planning/NavigationMenu';

import PlanningModal from '../../../components/Planning/PlanningModal';

import HeaderComponent from './HeaderComponent';

import {
  Container,
  MainContent,
  Sidebar,
  ContentArea,
  GridContainer,
  Section,
  SectionTitle,
  SectionContent,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Pill,
  Badge
} from './styles';

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
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [currentPlanning, setCurrentPlanning] = useState<PlanningData | null>(null);
  const [teamFormData, setTeamFormData] = useState<Omit<Team, 'id'>>({
    name: '',
    session: Session.MORNING,
    numStudent: 0,
    gradeLevel: '',
    specificRequirements: '',
    schedule: []
  });
  const [plannings, setPlannings] = useState<PlanningData[]>([mockPlanningData]);
  const handleSettingsChange = (newSettings: ShiftSettings) => {
    setShiftSettings(newSettings);
  };

  const handleOpenCreateTeamModal = () => {
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

  const handleOpenEditTeamModal = (team: Team) => {
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

  const handleSaveTeam = (teamData: Omit<Team, 'id'>) => {
    if (currentTeam) {
      // Lógica para editar a turma
    } else {
      // Lógica para criar nova turma
    }
    setIsTeamModalOpen(false);
  };

  const handleOpenCreatePlanning = () => {
    setCurrentPlanning(null);
    setIsPlanningModalOpen(true);
  };

  const handleOpenEditPlanning = (planning: PlanningData) => {
    setCurrentPlanning(planning);
    setIsPlanningModalOpen(true);
  };

  const handleSavePlanning = (planningData: PlanningData) => {
    if (currentPlanning) {
      // Atualizar planejamento existente
      setPlannings(prev => 
        prev.map(p => p.id === planningData.id ? planningData : p)
      );
    } else {
      // Criar novo planejamento
      setPlannings(prev => [...prev, {
        ...planningData,
        id: Date.now().toString()
      }]);
    }
    setIsPlanningModalOpen(false);
  };

  return (
    <PlanningProvider>
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
              <>
                <Section fullWidth>
                  <SectionTitle>
                    Meus Planejamentos
                    <button 
                      onClick={handleOpenCreatePlanning}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '0.875rem'
                      }}
                    >
                      <FiPlus size={16} />
                      Novo Planejamento
                    </button>
                  </SectionTitle>
                  <SectionContent>
                    <GridContainer>
                      {plannings.map(planning => (
                        <Card key={planning.id} onClick={() => handleOpenEditPlanning(planning)}>
                          <CardHeader>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <h3 style={{ fontWeight: '600', margin: 0 }}>
                                {planning.schoolInfo.discipline}
                              </h3>
                              <Badge variant="primary">
                                {planning.schoolInfo.trimester}
                              </Badge>
                            </div>
                            <p style={{ 
                              fontSize: '0.875rem', 
                              color: '#64748b', 
                              margin: '0.25rem 0 0',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              {planning.schoolInfo.school}
                            </p>
                          </CardHeader>
                          <CardBody>
                            <div style={{ 
                              display: 'flex', 
                              gap: '0.5rem',
                              marginBottom: '1rem',
                              flexWrap: 'wrap'
                            }}>
                              <Pill>{planning.schoolInfo.grade}</Pill>
                              <Pill>{planning.schoolInfo.studentCount} alunos</Pill>
                              <Pill>{planning.generalObjectives.length} objetivos</Pill>
                            </div>
                            <p style={{ 
                              fontSize: '0.875rem', 
                              color: '#475569',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {planning.generalObjectives[0]?.description || 'Nenhum objetivo definido'}
                            </p>
                          </CardBody>
                          <CardFooter>
                            <button style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#64748b',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.875rem'
                            }}>
                              <FiEdit2 size={14} />
                              Editar
                            </button>
                            <button style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.875rem'
                            }}>
                              <FiTrash2 size={14} />
                              Remover
                            </button>
                          </CardFooter>
                        </Card>
                      ))}
                    </GridContainer>
                  </SectionContent>
                </Section>

                <Section fullWidth>
                  <SectionTitle>Atividades Recentes</SectionTitle>
                  <SectionContent>
                    {/* Conteúdo das atividades recentes */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      color: '#64748b',
                      fontSize: '0.875rem'
                    }}>
                      <p>Nenhuma atividade recente</p>
                    </div>
                  </SectionContent>
                </Section>
              </>
            )}

            {activeView === 'teams' && (
              <Section fullWidth>
                <SectionTitle>Gestão de Turmas</SectionTitle>
                <SectionContent>
                  <TeamTab
                    onEditTeam={handleOpenEditTeamModal}
                    onCreateTeam={handleOpenCreateTeamModal} />
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
        
        {/* Modal de Planejamento */}
        {isPlanningModalOpen && (
          <PlanningModal
            isOpen={isPlanningModalOpen}
            initialData={currentPlanning || undefined}
            onSave={handleSavePlanning}
            onClose={() => setIsPlanningModalOpen(false)}
          />
        )}
      </Container>
    </PlanningProvider>
  );
};

export default PlanejadorClasse;