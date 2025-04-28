import React from 'react';
import styled from 'styled-components';
import { Lesson, Team } from '../../utils/types/Planning';

// Componentes estilizados
const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  min-width: 100%;
  background-color: white;
`;

const TableHead = styled.thead`
  tr {
    background-color: #f3f4f6;
  }
`;

const TableHeaderCell = styled.th`
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
`;

const TableCell = styled.td`
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;

interface TabHorariosProps {
    lessons: Lesson[];
    teams: Team[];
    newLesson: Lesson;
    setNewLesson: (lesson: Lesson) => void;
    addLesson: () => void;
}

const TabHorarios:React.FC<TabHorariosProps> = ({ lessons, teams, newLesson, setNewLesson, addLesson }) => (
  <Container>
    <Title>Gerenciamento de Horários</Title>
    
    <Card>
      <CardTitle>Horários de Aula</CardTitle>
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeaderCell>Turma</TableHeaderCell>
              <TableHeaderCell>Dia da Semana</TableHeaderCell>
              <TableHeaderCell>Horário</TableHeaderCell>
              <TableHeaderCell>Disciplina</TableHeaderCell>
            </tr>
          </TableHead>
          <tbody>
            {lessons.map(lesson => (
              <tr key={lesson.id}>
                <TableCell>{lesson.team}</TableCell>
                <TableCell>{lesson.day}</TableCell>
                <TableCell>{lesson.timeSlot}</TableCell>
                <TableCell>{lesson.discipline}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Card>
    
    <Card>
      <CardTitle>Adicionar Nova Aula</CardTitle>
      <FormGrid>
        <FormGroup>
          <Label>Turma</Label>
          <Select 
            value={newLesson.team}
            onChange={e => setNewLesson({...newLesson, team: e.target.value})}
          >
            <option value="">Selecione uma turma</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>{team.name}</option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label>Dia da Semana</Label>
          <Select 
            value={newLesson.day}
            onChange={e => setNewLesson({...newLesson, day: e.target.value as 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta'})}
          >
            <option value="">Selecione um dia</option>
            {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map(dia => (
              <option key={dia} value={dia}>{dia}</option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label>Horário</Label>
          <Input 
            type="text" 
            placeholder="Ex: 07:30 - 08:20"
            value={newLesson.timeSlot}
            onChange={e => setNewLesson({...newLesson, timeSlot: e.target.value})}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Disciplina</Label>
          <Input 
            type="text" 
            placeholder="Ex: Matemática"
            value={newLesson.discipline}
            onChange={e => setNewLesson({...newLesson, discipline: e.target.value})}
          />
        </FormGroup>
      </FormGrid>
      
      <Button onClick={addLesson}>
        Adicionar Aula
      </Button>
    </Card>
  </Container>
);

export default TabHorarios;