import React from 'react';
import { Lesson, Team } from '../../../../utils/types/Planning';

import { Container } from '../../../../styles/layoutUtils';
import { Title } from '../../../../styles/typography';
import { Card, CardTitle } from '../../../../styles/card';
import { Table, TableRow, TableHeader, TableCell, TableHead } from '../../../../styles/table';
import { Input, Select, Label } from '../../../../styles/inputs';
import { Button } from '../../../../styles/buttons';
import { FormGrid } from '../../../../styles/modals';
import { FormGroup } from '../../../../styles/formControls';

interface ClassScheduleTabProps {
  lessons: Lesson[];
  teams: Team[];
  newLesson: Lesson;
  setNewLesson: (lesson: Lesson) => void;
  addLesson: () => void;
}

/**
 * Componente de Gerenciamento de Horários
 * @module ClassScheduleTab
 * @description Gerencia a grade de horários e adição de novas aulas
 * @param {Object} props - Propriedades do componente
 * @param {Array<Lesson>} props.lessons - Lista de aulas cadastradas
 * @param {Array<Team>} props.teams - Lista de turmas disponíveis
 * @param {Lesson} props.newLesson - Dados do novo horário sendo criado
 * @param {Function} props.setNewLesson - Atualiza os dados do novo horário
 * @param {Function} props.addLesson - Adiciona o novo horário à lista
 * @returns {JSX.Element} Interface de gerenciamento de horários
 */
const ClassScheduleTab: React.FC<ClassScheduleTabProps> = ({ 
  lessons, 
  teams, 
  newLesson, 
  setNewLesson, 
  addLesson 
}) => {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  return (
    <Container>
      <Title>Gerenciamento de Horários</Title>

      <Card>
        <CardTitle>Grade de Horários</CardTitle>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Turma</TableHeader>
              <TableHeader>Dia</TableHeader>
              <TableHeader>Horário</TableHeader>
              <TableHeader>Disciplina</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.team}</TableCell>
                <TableCell>{lesson.day}</TableCell>
                <TableCell>{lesson.timeSlot}</TableCell>
                <TableCell>{lesson.discipline}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card>
        <CardTitle>Adicionar Nova Aula</CardTitle>
        <FormGrid>
          <FormGroup>
            <Label>Turma</Label>
            <Select
              value={newLesson.team}
              onChange={(e) => setNewLesson({ ...newLesson, team: e.target.value })}
            >
              <option value="">Selecione uma turma</option>
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Dia da Semana</Label>
            <Select
              value={newLesson.day}
              onChange={(e) =>
                setNewLesson({ ...newLesson, day: e.target.value as Lesson['day'] })
              }
            >
              <option value="">Selecione um dia</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Horário</Label>
            <Input
              type="text"
              placeholder="Ex: 08:00 - 09:40"
              value={newLesson.timeSlot}
              onChange={(e) => setNewLesson({ ...newLesson, timeSlot: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label>Disciplina</Label>
            <Input
              type="text"
              placeholder="Ex: Matemática"
              value={newLesson.discipline}
              onChange={(e) => setNewLesson({ ...newLesson, discipline: e.target.value })}
            />
          </FormGroup>
        </FormGrid>

        <Button onClick={addLesson}>Adicionar Aula</Button>
      </Card>
    </Container>
  );
};

export default ClassScheduleTab;