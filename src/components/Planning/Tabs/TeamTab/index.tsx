import React, { useState, useContext } from 'react';
import { FaPlus } from 'react-icons/fa';

import PlanningContext from '../../../../contexts/PlanningContext';
import { LearningObjective, Team } from '../../../../utils/types/Planning';

import PlanningPreview from '../../PlanningPreview';
import Modal from '../../../modals/Modal';

import { Button } from '../../../../styles/buttons';
import { 
  ActionButton, 
  AddButton, 
  Checkbox, 
  Container, 
  DetailItem, 
  DetailLabel, 
  DetailValue, 
  FileInput, 
  FormGrid, 
  FormGroup, 
  Header, 
  Input, 
  Label, 
  ModalActions, 
  ModalContent, 
  ObjectiveInput, 
  ObjectiveItem, 
  ObjectivesList, 
  ObjectivesSection, 
  ObjectiveText, 
  Select, 
  TeamActions, 
  TeamCard, 
  TeamDetails, 
  TeamHeader, 
  TeamSession, 
  TeamsGrid, 
  TeamTitle, 
  TextArea, Title 
} from './styles';

const TeamTab: React.FC = () => {
  const { state, dispatch } = useContext(PlanningContext);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [studentsFile, setStudentsFile] = useState<File | null>(null);
  const [objectives, setObjectives] = useState<LearningObjective[]>([]);
  const [newObjective, setNewObjective] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [teamData, setTeamData] = useState<Omit<Team, 'id'>>({
    name: '',
    session: 'Manhã',
    numStudent: 0,
    gradeLevel: '',
    specificRequirements: '',
    schedule: []
  });

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const studentCount = content.split('\n').length - 1;
      setTeamData({ ...teamData, numStudent: studentCount });
      setStudentsFile(file);
    };
    reader.readAsText(file);
  };

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, {
        id: Date.now(),
        description: newObjective,
        completed: false
      }]);
      setNewObjective('');
    }
  };

  const handleSubmit = () => {
    const teamToSave: Team = {
      ...teamData,
      id: editingTeam?.id || Date.now(),
      learningObjectives: objectives,
      studentList: studentsFile?.name || ''
    };

    if (editingTeam) {
      dispatch({ type: 'UPDATE_TEAM', payload: teamToSave });
    } else {
      dispatch({ type: 'ADD_TEAM', payload: teamToSave });
    }

    resetForm();
    setIsModalOpen(false);
  };

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
    setIsModalOpen(true);
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Header>
        <Title>Turmas</Title>
        <Button onClick={openModal}>Nova Turma</Button>
      </Header>

      <TeamsGrid>
        {state.teams.map(team => (
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
                onClick={() => dispatch({ type: 'DELETE_TEAM', payload: team.id })}
              >
                Remover
              </ActionButton>
              <PlanningPreview team={team} />
            </TeamActions>
          </TeamCard>
        ))}
      </TeamsGrid>

      <Modal 
        isOpen={isModalOpen}
        title={editingTeam ? 'Editar Turma' : 'Nova Turma'}
        size='full'
        onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <FormGrid>
            <FormGroup>
              <Label>Nome da Turma</Label>
              <Input
                value={teamData.name}
                onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                placeholder="Ex: 8º Ano A"
              />
            </FormGroup>

            <FormGroup>
              <Label>Turno</Label>
              <Select
                value={teamData.session}
                onChange={(e) => setTeamData({ ...teamData, session: e.target.value as any })}
              >
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Nível/Série</Label>
              <Input
                value={teamData.gradeLevel}
                onChange={(e) => setTeamData({ ...teamData, gradeLevel: e.target.value })}
                placeholder="Ex: 8º Ano"
              />
            </FormGroup>

            <FormGroup>
              <Label>Número de Alunos</Label>
              <Input
                type="number"
                value={teamData.numStudent}
                onChange={(e) => setTeamData({ ...teamData, numStudent: parseInt(e.target.value) || 0 })}
              />
            </FormGroup>

            <FormGroup fullWidth>
              <Label>Lista de Alunos (CSV)</Label>
              <FileInput>
                <input
                  type="file"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                  accept=".csv"
                />
                {studentsFile ? studentsFile.name : 'Selecionar arquivo'}
              </FileInput>
            </FormGroup>

            <FormGroup fullWidth>
              <Label>Requisitos Específicos</Label>
              <TextArea
                value={teamData.specificRequirements}
                onChange={(e) => setTeamData({ ...teamData, specificRequirements: e.target.value })}
                placeholder="Alguma necessidade especial ou observação importante"
              />
            </FormGroup>
          </FormGrid>

          <ObjectivesSection>
            <h3>Objetivos de Aprendizagem</h3>
            <ObjectiveInput>
              <Input
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                placeholder="Digite um novo objetivo"
              />
              <AddButton onClick={handleAddObjective}>
                <FaPlus />
              </AddButton>
            </ObjectiveInput>
            <ObjectivesList>
              {objectives.map(obj => (
                <ObjectiveItem key={obj.id}>
                  <Checkbox
                    type="checkbox"
                    checked={obj.completed}
                    onChange={() => {
                      const updated = objectives.map(o =>
                        o.id === obj.id ? { ...o, completed: !o.completed } : o
                      );
                      setObjectives(updated);
                    }}
                  />
                  <ObjectiveText completed={obj.completed}>
                    {obj.description}
                  </ObjectiveText>
                </ObjectiveItem>
              ))}
            </ObjectivesList>
          </ObjectivesSection>

          <ModalActions>
            <Button onClick={handleSubmit}>
              {editingTeam ? 'Atualizar Turma' : 'Criar Turma'}
            </Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default TeamTab;