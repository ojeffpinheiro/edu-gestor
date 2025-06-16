import React, { useContext, useState } from 'react';

import PlanningContext from '../../../../contexts/PlanningContext';
import { Lesson } from '../../../../utils/types/Planning';
import { classLimitRule, scheduleConflictRule, validateForm } from '../../../../utils/validationPlanning';

import { LessonForm } from './LessonForm/LessonForm';
import ScheduleHeader from './ScheduleHeader';

import { ScheduleContainer } from './styles';
import ScheduleGrid from './Schedule/ScheduleGrid';

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
  const [selectedCell, setSelectedCell] = useState<{ day: string, time: string } | null>(null);

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
    setSelectedCell({ day, time });
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

  return (
    <ScheduleContainer>
      <ScheduleHeader onAddClick={() => openModal('Segunda', '')} />
      
      <ScheduleGrid 
        days={daysOfWeek} 
        lessons={lessons} 
        onCellClick={ openModal }
        timeSlots={timeSlots} />
      
      {/* Modal de Adição */}
      {isModalOpen &&
        <LessonForm
          isOpen={isModalOpen} lesson={newLesson}
          errors={errors} teams={state.teams}
          daysOfWeek={daysOfWeek} timeSlots={timeSlots}
          onChange={() => setNewLesson} onClose={closeModal}
          onSubmit={handleAddLesson} selectedCell={selectedCell} />}
    </ScheduleContainer>
  );
};

export default ClassScheduleTab;