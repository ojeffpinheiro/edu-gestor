import React, { useContext, useState } from 'react';
import LessonForm from '../../LessonForm';
import { validateLesson } from './validation';
import { DayOfWeek, Lesson } from '../../../../utils/types/Planning';
import PlanningContext from '../../../../contexts/PlanningContext';
import ScheduleGrid from '../../ScheduleGrid';
import { daysOfWeek, timeSlots } from '../../../../utils/validationPlanning';

const ClassScheduleTab: React.FC = () => {
    const { state } = useContext(PlanningContext);
    const { teams } = state;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLesson, setCurrentLesson] = useState<Partial<Lesson>>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [selectedCell, setSelectedCell] = useState<{ day: DayOfWeek; time: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleLessonChange = (updatedLesson: Partial<Lesson>) => {
        setCurrentLesson(prev => ({ ...prev, ...updatedLesson }));
        // Validação em tempo real opcional
        const errors = validateLesson({ ...currentLesson, ...updatedLesson } as Lesson);
        setFormErrors(errors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const errors = validateLesson(currentLesson as Lesson);
            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                return;
            }

            // Aqui você faria a chamada API para salvar a aula
            // await saveLesson(currentLesson as Lesson);

            setIsModalOpen(false);
            setCurrentLesson({});
            setFormErrors({});
        } catch (error) {
            console.error('Erro ao salvar aula:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentLesson({});
        setFormErrors({});
    };

    return (
        <div>
            <ScheduleGrid onAddLesson={() => setIsModalOpen(true)} />

            <LessonForm
                isOpen={isModalOpen}
                lesson={currentLesson as Lesson}
                errors={formErrors}
                teams={teams}
                daysOfWeek={daysOfWeek}
                timeSlots={timeSlots}
                selectedCell={selectedCell}
                onChange={handleLessonChange}
                onSubmit={handleSubmit}
                onClose={closeModal}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ClassScheduleTab;