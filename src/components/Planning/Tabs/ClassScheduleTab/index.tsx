import React, { useContext, useState } from 'react';

import { Lesson } from '../../../../utils/types/Planning';

import PlanningContext from '../../../../contexts/PlanningContext';

import { Container } from '../../../../styles/layoutUtils';
import { Title } from '../../../../styles/typography';
import { Card, CardTitle } from '../../../../styles/card';
import { Table, TableRow, TableHeader, TableCell, TableHead } from '../../../../styles/table';
import { Input, Select, Label } from '../../../../styles/inputs';
import { Button } from '../../../../styles/buttons';
import { FormGrid } from '../../../../styles/modals';
import { FormGroup } from '../../../../styles/formControls';
import { classLimitRule, scheduleConflictRule, validateForm } from '../../../../utils/validationPlanning';
import ValidationFeedback from '../../../ui/ValidationFeedback';

const ClassScheduleTab: React.FC = () => {
  const { state, addLesson } = useContext(PlanningContext);
  const { lessons, teams } = state;
  const [newLesson, setNewLesson] = useState<Lesson>({
    id: 0,
    team: '',
    day: 'Segunda',
    timeSlot: '',
    discipline: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  const validationRules = {
    team: { required: true },
    day: { required: true },
    timeSlot: {
      required: true,
      pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9] - ([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      ...scheduleConflictRule(state.lessons, newLesson)
    },
    discipline: {
      required: true,
      minLength: 3,
      ...classLimitRule(
        state.lessons.filter(l => l.team === newLesson.team).length,
        10
      )
    }
  };

  const handleAddLesson = () => {
    const { isValid, errors } = validateForm(newLesson, validationRules);
    setErrors(errors);

    if (!isValid) return;

    addLesson({
      ...newLesson,
      id: Date.now()
    });
  }

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
            <ValidationFeedback
              error={errors.timeSlot}
            />
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
            <ValidationFeedback
              error={errors.timeSlot}
            />
          </FormGroup>

          <FormGroup>
            <Label>Horário</Label>
            <Input
              type="text"
              placeholder="Ex: 08:00 - 09:40"
              value={newLesson.timeSlot}
              onChange={(e) => setNewLesson({ ...newLesson, timeSlot: e.target.value })}
            />
            {errors.timeSlot && <span style={{ color: 'red' }}>{errors.timeSlot}</span>}
            
            <ValidationFeedback
              error={errors.timeSlot}
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
            <ValidationFeedback
              error={errors.timeSlot}
            />
          </FormGroup>
        </FormGrid>

        <Button onClick={handleAddLesson}>Adicionar Aula</Button>
      </Card>
    </Container>
  );
};

export default ClassScheduleTab;