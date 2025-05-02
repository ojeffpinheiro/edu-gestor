import React from 'react';
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
} from './styles'; // Import your styled components here
import { Grid } from '../../../../styles/layoutUtils';


// Main component
const TeamTab = () => {
  const teams = [
    { id: 1, name: "Class A", students: 25, period: "Manhã" },
    { id: 2, name: "Class B", students: 30, period: "Tarde" },
    { id: 3, name: "Class C", students: 28, period: "Noite" }
  ];

  const classes = [
    { id: 1, team: "Class A", subject: "Física", day: "Mon", time: "08:00 - 09:40" },
    { id: 2, team: "Class A", subject: "Portuguese", day: "Tue", time: "10:00 - 11:40" },
    { id: 3, team: "Class B", subject: "History", day: "Wed", time: "14:00 - 15:40" },
    { id: 4, team: "Class C", subject: "Physics", day: "Thu", time: "19:00 - 20:40" }
  ];

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
                  <span>{team.students} alunos</span>
                </div>
                
                <div>
                  <TeamIcon>
                    <FaClock size={16} />
                  </TeamIcon>
                  <span>Turno: {team.period}</span>
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
                          <span>{c.subject}</span>
                          <span>{c.day}</span>
                        </ClassHeader>
                        <ClassTime>{c.time}</ClassTime>
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