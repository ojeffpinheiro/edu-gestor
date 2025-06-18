import React, { useState } from 'react';

import { useTeams } from '../../../../contexts/TeamsContext';
import { useModal } from '../../../../contexts/ModalContext';

import { LearningObjective, Team } from '../../../../utils/types/Planning';

import PlanningPreview from '../../PlanningPreview';
import { Button } from '../../../../styles/buttons';

import { 
  ActionButton,
  Container, 
  DetailItem, 
  DetailLabel, 
  DetailValue,
  Header, 
  TeamActions, 
  TeamCard, 
  TeamDetails, 
  TeamHeader, 
  TeamSession, 
  TeamsGrid, 
  TeamTitle,
  Title 
} from './styles';
import { FaPlus } from 'react-icons/fa';

const TeamTab: React.FC = () => {
  const { state: { teams }, deleteTeam } = useTeams();
  const { actions: modalActions } = useModal();
  
  const [studentsFile, setStudentsFile] = useState<File | null>(null);
  const [objectives, setObjectives] = useState<LearningObjective[]>([]);

  const [teamData, setTeamData] = useState<Omit<Team, 'id'>>({
    name: '',
    session: 'Manhã',
    numStudent: 0,
    gradeLevel: '',
    specificRequirements: '',
    schedule: []
  });

  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const resetForm = () => {
    setTeamData({
      name: '',
      session: 'Manhã',
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
        <Button onClick={openModal}>
          <FaPlus/> Nova Turma
        </Button>
      </Header>

      <TeamsGrid>
        {teams.map(team => (
          <TeamCard key={team.id}>
            <TeamHeader>
              <TeamTitle>{team.name}</TeamTitle>
              <TeamSession>{team.session}</TeamSession>
            </TeamHeader>
            <TeamDetails>
              <DetailItem>
                <DetailLabel>Série:</DetailLabel>
                <DetailValue>{team.gradeLevel || '-'}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Alunos:</DetailLabel>
                <DetailValue>{team.numStudent}</DetailValue>
              </DetailItem>
            </TeamDetails>
            <TeamActions>
              <ActionButton onClick={() => handleEdit(team)}>Editar</ActionButton>
              <ActionButton 
                variant="warning" 
                onClick={() => deleteTeam(team.id)}
              >
                Remover
              </ActionButton>
              <PlanningPreview team={team} />
            </TeamActions>
          </TeamCard>
        ))}
      </TeamsGrid>
    </Container>
  );
};

export default TeamTab;