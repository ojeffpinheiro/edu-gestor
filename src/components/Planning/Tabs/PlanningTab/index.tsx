import React, { useContext, useState } from 'react';
import PlanningContext from '../../../../contexts/PlanningContext';
import { DayOfWeek, Lesson } from '../../../../utils/types/Planning';

import ScheduleGrid from '../../ScheduleGrid';

import TasksSection from './TasksSection';

import { Card, CardTitle, Content, EmptyState } from './styles';
import LessonForm from '../../LessonForm';
import { validateLesson } from '../ClassScheduleTab/validation';
import { daysOfWeek, timeSlots } from '../../../../utils/validationPlanning';

const initialLesson = {
  day: 'Segunda',
  timeSlot: '07:00 - 08:00',
  discipline: '',
  team: ''
}

const TabPlanning: React.FC = () => {
  const { state } = useContext(PlanningContext);
  const { teams } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ day: DayOfWeek; time: string } | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [newLesson, setNewLesson] = useState(initialLesson);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const errors = validateLesson(newLesson as Lesson);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setIsModalOpen(false);
      setNewLesson(initialLesson);
      setFormErrors({});
    } catch (error) {
      console.error('Erro ao salvar aula:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLessonChange = (updatedLesson: Partial<Lesson>) => {
    setNewLesson(prev => ({ ...prev, ...updatedLesson }));
    // Validação em tempo real opcional
    const errors = validateLesson({ ...newLesson, ...updatedLesson } as Lesson);
    setFormErrors(errors);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '1800px', margin: '0 auto' }}>
      <Card>
        <CardTitle>Planejamento de Aulas</CardTitle>

        <Content columns={2} gap="lg">
          <TasksSection />
          {state.lessons.length > 0 ? (
            <ScheduleGrid
              onAddLesson={() => setIsModalOpen(true)} />
          ) : (
            <EmptyState>
              <h4>Nenhuma aula planejada ainda</h4>
              <p>Clique no botão abaixo para adicionar sua primeira aula</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="primary-button"
              >
                Adicionar Aula
              </button>
            </EmptyState>
          )}
        </Content>
      </Card>

      <LessonForm
        isOpen={isModalOpen}
        lesson={newLesson as Lesson}
        errors={formErrors}
        teams={teams}
        daysOfWeek={daysOfWeek}
        timeSlots={timeSlots}
        selectedCell={selectedCell}
        onChange={handleLessonChange}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TabPlanning;