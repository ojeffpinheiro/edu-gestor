import React from 'react';

import { useLessons } from '../../../contexts/LessonsContext';
import { useSchedule } from '../../../contexts/ScheduleContext';

import { DayOfWeek, Lesson, Shift } from '../../../utils/types/Planning';
import { Grid, Cell, HeaderCell, TimeCell } from './styles';

interface ScheduleGridProps {
    shift: Shift;
    readOnly?: boolean;
    onAddLesson?: (day: DayOfWeek, time: string) => void;
}

interface GridLesson extends Lesson {
    subject?: string;
    teacher?: string;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ shift, readOnly = false, onAddLesson }) => {
    const { state: { lessons } } = useLessons();
    const { state: { shiftSettings } } = useSchedule();

    const periods = shiftSettings[shift]?.periods || [];
    const days: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

    const handleCellClick = (day: DayOfWeek, time: string) => {
        if (!readOnly && onAddLesson) {
            onAddLesson(day, time);
        }
    };

    return (
        <Grid>
            {/* Cabeçalho com dias da semana */}
            <HeaderCell>Horário</HeaderCell>
            {days.map(day => (
                <HeaderCell key={day}>{day}</HeaderCell>
            ))}

            {/* Células de horário e aulas */}
            {periods.map(period => (
                <React.Fragment key={period.id}>
                    <TimeCell>
                        {period.startTime} - {period.endTime}
                    </TimeCell>
                    
                    {days.map(day => {
                        const lesson = lessons.find(l => 
                            l.day === day && 
                            l.timeSlot === period.startTime && 
                            l.shift === shift
                        ) as GridLesson;
                        
                        return (
                            <Cell 
                                key={`${day}-${period.startTime}`}
                                onClick={() => handleCellClick(day, period.startTime)}
                            >
                                {lesson ? (
                                    <div className="lesson-content">
                                        {lesson.subject && <strong>{lesson.subject}</strong>}
                                        {lesson.teacher && <span>{lesson.teacher}</span>}
                                    </div>
                                ) : (
                                    !readOnly && <span className="add-lesson">+</span>
                                )}
                            </Cell>
                        );
                    })}
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default ScheduleGrid;