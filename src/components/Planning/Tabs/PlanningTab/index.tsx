import React, { useContext, useState } from 'react';
import PlanningContext from '../../../../contexts/PlanningContext';
import {
  Card,
  CardTitle,
  Checkbox,
  CheckboxContainer,
  CheckboxLabel,
  ClassInfo,
  ClassItem,
  ClassTitle,
  ClassTime,
  Content,
  DayColumn,
  DayHeader,
  GridContainer,
  HourSlot,
  TimeLabel,
  AddButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalClose,
  ModalBody,
  ModalForm,
  FormInput,
  FormSelect,
  FormButton
} from './styles';
import { DayOfWeek } from '../../../../utils/types/Planning';

const timeSlots = [
  '07:00 - 08:00',
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
];

const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

const TabPlanning: React.FC = () => {
  const { state, toggleTask, addLesson } = useContext(PlanningContext);
  const { tasks, lessons } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLesson, setNewLesson] = useState({
    day: 'Segunda',
    timeSlot: '07:00 - 08:00',
    discipline: '',
    team: '',
  });

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    addLesson({
      ...newLesson,
      id: Date.now(),
      day: newLesson.day as DayOfWeek
    });
    setIsModalOpen(false);
    setNewLesson({
      day: 'Segunda',
      timeSlot: '07:00 - 08:00',
      discipline: '',
      team: ''
    });
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '1800px', margin: '0 auto' }}>
      <Card>
        <CardTitle>Planejamento de Aulas</CardTitle>

        <Content columns={2} gap="lg">
          <div>
            <CardTitle style={{ marginBottom: '1rem' }}>Tarefas Pendentes</CardTitle>
            {tasks.map(task => (
              <CheckboxContainer key={task.id} onClick={() => toggleTask(task.id)}>
                <Checkbox checked={task.completed}>
                  {task.completed && <span>✓</span>}
                </Checkbox>
                <CheckboxLabel checked={task.completed}>{task.text}</CheckboxLabel>
              </CheckboxContainer>
            ))}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle style={{ marginBottom: '1rem' }}>Grade Horária</CardTitle>
              <AddButton onClick={() => setIsModalOpen(true)}>+ Adicionar Aula</AddButton>
            </div>

            <GridContainer>
              {/* Coluna de horários */}
              <div>
                <DayHeader style={{ visibility: 'hidden' }}>Horário</DayHeader>
                {timeSlots.map(time => (
                  <TimeLabel key={time}>{time}</TimeLabel>
                ))}
              </div>

              {/* Colunas dos dias */}
              {weekDays.map(day => (
                <DayColumn key={day}>
                  <DayHeader>{day}</DayHeader>
                  {timeSlots.map(time => {
                    // Filtra as aulas para o dia e horário específicos
                    const dailyLessons = lessons.filter(l => l.day === day && l.timeSlot === time);

                    return (
                      <HourSlot key={`${day}-${time}`}>
                        {dailyLessons.map(lesson => (
                          <ClassItem key={lesson.id}>
                            <ClassTitle>{lesson.discipline}</ClassTitle>
                            <ClassTime>{lesson.timeSlot}</ClassTime>
                            <ClassInfo>{lesson.team}</ClassInfo>
                          </ClassItem>
                        ))}
                      </HourSlot>
                    );
                  })}
                </DayColumn>
              ))}
            </GridContainer>
          </div>
        </Content>
      </Card>

      {/* Modal para adicionar nova aula */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h3>Adicionar Nova Aula</h3>
              <ModalClose onClick={() => setIsModalOpen(false)}>×</ModalClose>
            </ModalHeader>
            <ModalBody>
              <ModalForm onSubmit={handleAddLesson}>
                <FormSelect
                  value={newLesson.day}
                  onChange={(e) => setNewLesson({ ...newLesson, day: e.target.value })}
                >
                  {weekDays.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </FormSelect>

                <FormSelect
                  value={newLesson.timeSlot}
                  onChange={(e) => setNewLesson({ ...newLesson, timeSlot: e.target.value })}
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </FormSelect>

                <FormInput
                  type="text"
                  placeholder="Disciplina"
                  value={newLesson.discipline}
                  onChange={(e) => setNewLesson({ ...newLesson, discipline: e.target.value })}
                  required
                />

                <FormInput
                  type="text"
                  placeholder="Turma"
                  value={newLesson.team}
                  onChange={(e) => setNewLesson({ ...newLesson, team: e.target.value })}
                  required
                />

                <FormButton type="submit">Adicionar Aula</FormButton>
              </ModalForm>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default TabPlanning;