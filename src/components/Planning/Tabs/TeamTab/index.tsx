import React, { useState } from 'react';
import {
  FaPlus,
  FaUsers,
  FaGraduationCap,
  FaEdit,
  FaTrash,
  FaSun,
  FaMoon,
  FaClock
} from 'react-icons/fa';

import { useTeams } from '../../../../contexts/TeamsContext';
import { useModal } from '../../../../contexts/ModalContext';

import { LearningObjective, Session, Team } from '../../../../utils/types/Planning';

import PlanningPreview from '../../PlanningPreview';
import { Button } from '../../../../styles/buttons';

import {
  ActionButton,
  Container,
  DetailItem,
  DetailLabel,
  DetailValue,
  EmptyState,
  Header,
  TeamActions,
  TeamCard,
  TeamDetails,
  TeamHeader,
  TeamInfo,
  TeamSession,
  TeamsGrid,
  TeamTitle,
  Title
} from './styles';

interface TeamTabProps {
  onEditTeam?: (team: Team) => void;
  onCreateTeam?: () => void;
}

const TeamTab: React.FC<TeamTabProps> = ({ onEditTeam, onCreateTeam }) => {
  const { state: { teams }, deleteTeam } = useTeams();
  const { actions: modalActions } = useModal();

  const [studentsFile, setStudentsFile] = useState<File | null>(null);
  const [objectives, setObjectives] = useState<LearningObjective[]>([]);

  const [teamData, setTeamData] = useState<Omit<Team, 'id'>>({
    name: '',
    session: Session.MORNING,
    numStudent: 0,
    gradeLevel: '',
    specificRequirements: '',
    schedule: []
  });

  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const getSessionIcon = (session: Session) => {
    switch (session) {
      case Session.MORNING: return <FaSun size={12} />;
      case Session.AFTERNOON: return <FaClock size={12} />;
      case Session.EVENING: return <FaMoon size={12} />;
      default: return <FaClock size={12} />;
    }
  };

  const resetForm = () => {
    setTeamData({
      name: '',
      session: Session.MORNING,
      numStudent: 0,
      gradeLevel: '',
      specificRequirements: '',
      schedule: []
    });
    setObjectives([]);
    setEditingTeam(null);
    setStudentsFile(null);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setTeamData({
      name: team.name,
      session: team.session,
      numStudent: team.numStudent,
      gradeLevel: team.gradeLevel || '',
      specificRequirements: team.specificRequirements || '',
      schedule: team.schedule || []
    });
    setObjectives(team.learningObjectives || []);
    modalActions.openModal('TEAM_FORM');
  };

  const openModal = () => {
    resetForm();
    modalActions.openModal('TEAM_FORM');
  };

  return (
    <Container>
      <Header>
        <Title>Turmas</Title>
        <Button onClick={onCreateTeam || openModal}>
          <FaPlus /> Nova Turma
        </Button>
      </Header>

      {teams.length === 0 ? (
        <EmptyState>
          <p>Nenhuma turma cadastrada ainda.</p>
          <Button onClick={openModal}>
            <FaPlus /> Criar primeira turma
          </Button>
        </EmptyState>
      ) : (
        <TeamsGrid>
          {teams.map(team => (
            <TeamCard key={team.id} $session={team.session} >
              <TeamHeader>
                <TeamInfo>
                  <TeamTitle>
                    <FaUsers /> {team.name}
                  </TeamTitle>
                  <TeamSession $session={team.session}>
                    {getSessionIcon(team.session)}
                    {team.session}
                  </TeamSession>
                </TeamInfo>

                <TeamActions>
                  <ActionButton
                    variant='primary'
                    onClick={() => onEditTeam ? onEditTeam(team) : handleEdit(team)}
                    data-tooltip="Editar"
                  >
                    <FaEdit size={14} />
                  </ActionButton>
                  <ActionButton
                    variant="error"
                    onClick={() => deleteTeam(team.id)}
                    data-tooltip="Remover"
                  >
                    <FaTrash size={14} />
                  </ActionButton>
                </TeamActions>
              </TeamHeader>
              <TeamDetails>
                <DetailItem>
                  <FaGraduationCap color="#718096" size={14} />
                  <DetailLabel>Série:</DetailLabel>
                  <DetailValue>{team.gradeLevel || '-'}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <FaUsers color="#718096" size={14} />
                  <DetailLabel>Alunos:</DetailLabel>
                  <DetailValue>{team.numStudent}</DetailValue>
                </DetailItem>
              </TeamDetails>

              <PlanningPreview team={team} />
            </TeamCard>
          ))}
        </TeamsGrid>
      )}
    </Container>
  );
};

export default TeamTab;