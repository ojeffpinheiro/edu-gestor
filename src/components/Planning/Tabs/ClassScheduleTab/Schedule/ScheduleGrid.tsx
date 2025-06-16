import React from 'react';
import { Lesson } from '../../../../../utils/types/Planning';

import {
    Content,
    TimeSlotCell,
    DayHeader,
    CornerEmptyCell
} from './styles';
import LessonCell from './LessonCell';

interface ScheduleGridProps {
    days: string[];
    timeSlots: string[];
    lessons: Lesson[];
    onCellClick: (day: string, time: string) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
    days,
    timeSlots,
    lessons,
    onCellClick,
}) => {
    const getLessonForCell = (day: string, time: string) => {
        return lessons.find(lesson => lesson.day === day && lesson.timeSlot === time);
    };

    return (
        <Content>
            <CornerEmptyCell />
            {/* Cabeçalhos dos dias */}
            {days.map(day => (
                <DayHeader key={day}>{day}</DayHeader>
            ))}

            {/* Grade de horários */}
            {timeSlots.map((time, timeIndex) => (
                <React.Fragment key={time}>
                    {/* Coluna de horários */}
                    <TimeSlotCell>{time}</TimeSlotCell>

                    {/* Aulas para cada dia */}
                    {days.map(day => {
                        return (
                            <LessonCell
                                key={`${day}-${time}`}
                                lesson={getLessonForCell(day, time)}
                                onClick={() => onCellClick(day, time)}
                            />
                        )
                    })}
                </React.Fragment>
            ))}
        </Content>
    );
};

export default ScheduleGrid;