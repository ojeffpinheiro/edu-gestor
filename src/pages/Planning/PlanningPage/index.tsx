import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBookOpen, FaClock, FaUsers, FaCalendarAlt } from 'react-icons/fa';

import { Event, Lesson, Task, Team } from '../../../utils/types/Planning';

import TabPlanning from '../../../components/Planning/Tabs/PlanningTab';
import TabHorarios from '../../../components/Planning/Tabs/ClassScheduleTab';
import TeamTab from '../../../components/Planning/Tabs/TeamTab';
import CalendarTab from '../../../components/Planning/Tabs/CalendarTab';

// Componentes estilizados
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const Header = styled.header`
  background-color: #1d4ed8;
  color: white;
  padding: 1rem;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #dbeafe;
`;

const Navigation = styled.nav`
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const NavList = styled.ul`
  display: flex;
  overflow-x: auto;
`;

const NavItem = styled.li``;

const NavButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid;
  border-color: ${props => props.active ? '#2563eb' : 'transparent'};
  color: ${props => props.active ? '#2563eb' : 'inherit'};
  
  &:hover {
    background-color: #f9fafb;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const MainContent = styled.main`
  max-width: 95vw;
  margin: 0 auto;
  padding: 1rem;
`;

// Componente principal
const PlanejadorClasse = () => {
  const [activeTab, setActiveTab] = useState('planejamento');

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Planejamento de aulas e unidades didáticas alinhadas ao currículo', completed: false },
    { id: 2, text: 'Gerenciamento de horários (horários de aula, dias da semana, feriados)', completed: false },
    { id: 3, text: 'Personalização de programações para cada série e turma', completed: false },
    { id: 4, text: 'Definição do calendário por turma, escola e estadual', completed: false },
    { id: 5, text: 'Criação de eventos e lembretes', completed: false },
  ]);
  
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: '1º Ano A', session: 'Manhã', numStudent: 28 },
    { id: 2, name: '2º Ano B', session: 'Tarde', numStudent: 25 },
    { id: 3, name: '3º Ano C', session: 'Manhã', numStudent: 30 },
  ]);
  
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Reunião pedagógica', date: '2025-05-10', type: 'Reunião' },
    { id: 2, title: 'Entrega de avaliações', date: '2025-05-15', type: 'Prazo' },
    { id: 3, title: 'Feriado nacional', date: '2025-05-01', type: 'Feriado' },
  ]);
  
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: 1, team: '1º Ano A', day: 'Segunda', timeSlot: '07:30 - 08:20', discipline: 'Matemática' },
    { id: 2, team: '2º Ano B', day: 'Terça', timeSlot: '13:00 - 13:50', discipline: 'Português' },
    { id: 3, team: '3º Ano C', day: 'Quarta', timeSlot: '08:20 - 09:10', discipline: 'Ciências' },
  ]);
  
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'Evento' });
  const [newLesson, setNewLesson] = useState<Lesson>({ id: 0, team: '', day: 'Segunda', timeSlot: '', discipline: '' });

  // Funções para manipular os dados
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const addEvent = () => {
    if(newEvent.title && newEvent.date){
      setEvents([...events, {...newEvent, id: events.length + 1}])
      setNewEvent({ title: '', date: '', type: 'Evento' })
    }
  };

  const addLesson = () => {
    if(newLesson.team && newLesson.day && newLesson.timeSlot && newLesson.discipline){
      setLessons([...lessons, {...newLesson, id: lessons.length + 1}]);
      setNewLesson({ id: 0, team: '', day: 'Segunda', timeSlot: '', discipline: '' })
    }
  }

  return (
    <AppContainer>
      {/* Cabeçalho */}
      <Header>
        <HeaderContainer>
          <Title>Planejador de Classe</Title>
          <Subtitle>Sistema de planejamento e gerenciamento para professores</Subtitle>
        </HeaderContainer>
      </Header>
     
      {/* Navegação */}
      <Navigation>
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
      </Navigation>
     
      {/* Conteúdo principal */}
      <MainContent>
        {activeTab === 'planejamento' && 
          <TabPlanning tasks={tasks} lessons={lessons} toggleTask={toggleTask} />}
        {activeTab === 'horarios' && 
          <TabHorarios lessons={lessons} teams={teams} 
            newLesson={newLesson} setNewLesson={setNewLesson} addLesson={addLesson} />}
        {activeTab === 'turmas' && 
          <TeamTab />}
        {activeTab === 'calendario' && 
          <CalendarTab />}
      </MainContent>
    </AppContainer>
  );
};

export default PlanejadorClasse;