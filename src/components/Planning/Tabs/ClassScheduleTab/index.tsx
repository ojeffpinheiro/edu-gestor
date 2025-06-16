import React, { useContext, useState } from 'react';
import { Lesson } from '../../../../utils/types/Planning';
import PlanningContext from '../../../../contexts/PlanningContext';
import { classLimitRule, scheduleConflictRule, validateForm } from '../../../../utils/validationPlanning';

import { Title } from '../../../../styles/typography';
import { Input, Select, Label } from '../../../../styles/inputs';
import { Button, CloseButton } from '../../../../styles/buttons';
import { FormGrid, ModalFooter, ModalHeader } from '../../../../styles/modals';
import { FormGroup } from '../../../../styles/formControls';
import ValidationFeedback from '../../../ui/ValidationFeedback';
import { ModalOverlay } from '../../../../styles/baseComponents';

import { 
  AddButton, DayHeader, EmptyCell, 
  LessonCell, LessonInfo, ModalBody, 
  ModalContent, ModalTitle, ScheduleContainer, 
  ScheduleGrid, ScheduleHeader, 
  TimeSlotCell 
} from './styles';


const timeSlots = [
  '07:00 - 07:50',
  '07:50 - 08:40',
  '08:40 - 09:30',
  '09:30 - 10:20',
  '10:20 - 11:10',
  '11:10 - 12:00',
  '12:00 - 13:00', // Almoço
  '13:00 - 13:50',
  '13:50 - 14:40',
  '14:40 - 15:30',
  '15:30 - 16:20',
  '16:20 - 17:10',
  '17:10 - 18:00'
];
const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];


const ClassScheduleTab: React.FC = () => {
  const { state, addLesson } = useContext(PlanningContext);
  const { lessons } = state;
  const [newLesson, setNewLesson] = useState<Lesson>({
    id: 0,
    team: '',
    day: 'Segunda',
    timeSlot: '',
    discipline: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{day: string, time: string} | null>(null);
  
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

    // Reset form and close modal
    setNewLesson({
      id: 0,
      team: '',
      day: 'Segunda',
      timeSlot: '',
      discipline: ''
    });
    setIsModalOpen(false);
  };

  const openModal = (day: string, time: string) => {
    setSelectedCell({day, time});
    setNewLesson(prev => ({
      ...prev,
      day: day as Lesson['day'],
      timeSlot: time
    }));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const getLessonForCell = (day: string, time: string) => {
    return lessons.find(lesson => lesson.day === day && lesson.timeSlot === time);
  };

  return (
   <ScheduleContainer>
      <ScheduleHeader>
        <Title style={{ margin: 0 }}>Grade de Horários</Title>
        <AddButton onClick={() => openModal('Segunda', '')}>
          + Adicionar Aula
        </AddButton>
      </ScheduleHeader>

      <ScheduleGrid>
        {/* Célula vazia no canto superior esquerdo */}
        <div style={{ gridColumn: '1', gridRow: '1', background: 'var(--gradient-primary)'}}></div>
        
        {/* Cabeçalhos dos dias */}
        {daysOfWeek.map(day => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        
        {/* Grade de horários */}
        {timeSlots.map((time, timeIndex) => (
          <React.Fragment key={time}>
            {/* Coluna de horários */}
            <TimeSlotCell>{time}</TimeSlotCell>
            
            {/* Aulas para cada dia */}
            {daysOfWeek.map(day => {
              const lesson = getLessonForCell(day, time);
              return (
                <LessonCell 
                  key={`${day}-${time}`}
                  isEmpty={!lesson}
                  onClick={() => lesson ? null : openModal(day, time)}
                >
                  {lesson ? (
                    <LessonInfo>
                      <strong>{lesson.discipline}</strong>
                      <div>{lesson.team}</div>
                    </LessonInfo>
                  ) : (
                    <EmptyCell>Clique para adicionar</EmptyCell>
                  )}
                </LessonCell>
              );
            })}
          </React.Fragment>
        ))}
      </ScheduleGrid>

      {/* Modal de Adição */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {selectedCell ? `Adicionar Aula - ${selectedCell.day} ${selectedCell.time}` : 'Adicionar Nova Aula'}
              </ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <FormGroup>
                  <Label>Turma</Label>
                  <Select
                    value={newLesson.team}
                    onChange={(e) => setNewLesson({ ...newLesson, team: e.target.value })}
                  >
                    <option value="">Selecione uma turma</option>
                    {state.teams.map((team) => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </Select>
                  <ValidationFeedback error={errors.team} />
                </FormGroup>

                <FormGroup>
                  <Label>Dia da Semana</Label>
                  <Select
                    value={newLesson.day}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, day: e.target.value as Lesson['day'] })
                    }
                  >
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </Select>
                  <ValidationFeedback error={errors.day} />
                </FormGroup>

                <FormGroup>
                  <Label>Horário</Label>
                  <Select
                    value={newLesson.timeSlot}
                    onChange={(e) => setNewLesson({ ...newLesson, timeSlot: e.target.value })}
                  >
                    <option value="">Selecione um horário</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Select>
                  <ValidationFeedback error={errors.timeSlot} />
                </FormGroup>

                <FormGroup>
                  <Label>Disciplina</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Matemática"
                    value={newLesson.discipline}
                    onChange={(e) => setNewLesson({ ...newLesson, discipline: e.target.value })}
                  />
                  <ValidationFeedback error={errors.discipline} />
                </FormGroup>
              </FormGrid>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={closeModal}>
                Cancelar
              </Button>
              <Button onClick={handleAddLesson}>
                Adicionar Aula
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </ScheduleContainer>
  );
};

export default ClassScheduleTab;