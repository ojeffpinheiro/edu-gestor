import React, { useContext } from 'react';
import { FaUsers, FaClock, FaPlus, FaEdit } from 'react-icons/fa';

import {
  AddCard,
  AddContent,
  AddText,
  ClassHeader,
  ClassItem,
  ClassTime,
  ClassesList,
  Container,
  EditButton,
  Content,
  IconCircle,
  SectionTitle,
  TeamCard,
  TeamIcon,
  TeamInfo,
  TeamTitle,
  Title
} from './styles';
import { Grid } from '../../../../styles/layoutUtils';
import PlanningContext from '../../../../contexts/PlanningContext';

const TeamTab: React.FC = () => {
  const { state } = useContext(PlanningContext);
  const { teams, lessons: classes } = state;

  return (
    <Container>
      <Title>Personalização por Turma</Title>
      
      <Content>
        {teams.map(team => (
          <TeamCard key={team.id}>
            <header>
              <TeamTitle>{team.name}</TeamTitle>
              <EditButton><FaEdit /></EditButton>
            </header>
            <TeamInfo>
              <Grid columns={2} gap='xs' >
                <div>
                  <TeamIcon>
                    <FaUsers size={16} />
                  </TeamIcon>
                  <span>{team.numStudent} alunos</span>
                </div>
                
                <div>
                  <TeamIcon>
                    <FaClock size={16} />
                  </TeamIcon>
                  <span>Turno: {team.session}</span>
                </div>
              </Grid>
              
              <div>
                <SectionTitle>Aulas Programadas</SectionTitle>
                <ClassesList>
                  {classes
                    .filter(c => c.team === team.name)
                    .map(c => (
                      <ClassItem key={c.id}>
                        <ClassHeader>
                          <span>{c.discipline}</span>
                          <span>{c.day}</span>
                        </ClassHeader>
                        <ClassTime>{c.timeSlot}</ClassTime>
                      </ClassItem>
                    ))}
                </ClassesList>
              </div>
              
              
            </TeamInfo>
          </TeamCard>
        ))}
        
        <AddCard>
          <AddContent>
            <IconCircle>
              <FaPlus size={24} />
            </IconCircle>
            <AddText> 
              <FaUsers size={24} /> Adicionar turma</AddText>
          </AddContent>
        </AddCard>
      </Content>
    </Container>
  );
};

export default TeamTab;