import React from 'react';
import { FaCog, FaPlus } from 'react-icons/fa';

import { useModal } from '../../../../contexts/ModalContext';
import { useSchedule } from '../../../../contexts/ScheduleContext';
import { useLessons } from '../../../../contexts/LessonsContext';

import { DayOfWeek, Shift } from '../../../../types/academic/Planning';

import ScheduleGrid from '../../ScheduleGrid';

import { 
    HeaderContainer, 
    Title, 
    ShiftSelector, 
    ActionButton, 
    ActionsContainer 
} from './styles';
const ClassScheduleTab: React.FC = () => {
    // Contextos
    const { setCurrentLesson } = useLessons();
    const { state: { shiftSettings, selectedShift }, setSelectedShift } = useSchedule();
    const { actions: modalActions } = useModal();

    const handleAddLesson = (day: DayOfWeek, time: string) => {
        setCurrentLesson({
            day,
            timeSlot: time,
            shift: selectedShift
        });
        modalActions.openModal('LESSON_FORM');
    };

    const openLessonForm = () => {
        setCurrentLesson({ shift: selectedShift });
        modalActions.openModal('LESSON_FORM');
    };

    const openShiftSettings = () => {
        modalActions.openModal('SHIFT_SETTINGS', { shift: selectedShift });
    };

    return (
        <div>
            <HeaderContainer>
                <Title>Grade Horária</Title>
                <ActionsContainer>
                    <ShiftSelector
                        value={selectedShift}
                        onChange={(e) => setSelectedShift(e.target.value as Shift)}
                    >
                        {Object.keys(shiftSettings).map(shift => (
                            <option key={shift} value={shift}>{shift}</option>
                        ))}
                    </ShiftSelector>

                    <ActionButton onClick={openShiftSettings}>
                        <FaCog /> Turnos
                    </ActionButton>

                    <ActionButton primary onClick={openLessonForm}>
                        <FaPlus /> Nova Aula
                    </ActionButton>
                </ActionsContainer>
            </HeaderContainer>

            <ScheduleGrid
                shift={selectedShift}
                onAddLesson={handleAddLesson}
                readOnly={false}
            />

            {/* Modais são gerenciados pelo ModalProvider no nível raiz */}
        </div>
    );
};

export default ClassScheduleTab;