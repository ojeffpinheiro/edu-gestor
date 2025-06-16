import React, { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';

import {
  GridContainer,
  TimeLabel,
  DayHeader,
  HourSlot,
  LessonItem,
  AddButton,
  HeaderContent,
  Title,
  LessonTime,
  LessonInfo,
  LessonTitle,
  EmptySlot
} from './styles';
import PlanningContext from '../../../contexts/PlanningContext';

interface ScheduleGridProps {
  days?: string[];
  timeSlots?: string[];
  onAddLesson: (day: string, timeSlot: string) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
  timeSlots = [
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
  ],
  onAddLesson
}) => {
  const { state } = useContext(PlanningContext);
  const lessons = state.lessons;
  const getLessonsForCell = (day: string, time: string) => {
    return lessons.filter(lesson => lesson.day === day && lesson.timeSlot === time);
  };

  return (
    <div>
      <HeaderContent>
        <Title>Grade Horária</Title>
        <AddButton onClick={() => onAddLesson(days[0], timeSlots[0])}>
          <FaPlus size={14} /> Adicionar Aula
        </AddButton>
      </HeaderContent>

      <GridContainer>
        {/* Coluna de horários */}
        <div>
          <DayHeader style={{ visibility: 'hidden' }}>Horário</DayHeader>
          {timeSlots.map(time => (
            <TimeLabel key={time}>{time}</TimeLabel>
          ))}
        </div>

        {/* Colunas de dias */}
        {days.map(day => (
          <div key={day}>
            <DayHeader>{day}</DayHeader>
            {timeSlots.map(time => {
              const cellLessons = getLessonsForCell(day, time);
              return (
                <HourSlot key={`${day}-${time}`}>
                  {cellLessons.length > 0 ? (
                    cellLessons.map(lesson => (
                      <LessonItem key={lesson.id}>
                        <LessonTitle>{lesson.discipline}</LessonTitle>
                        <LessonTime>{lesson.timeSlot}</LessonTime>
                        <LessonInfo>{lesson.team}</LessonInfo>
                        <button 
                          className="add-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddLesson(day, time);
                          }}
                        >
                          <FaPlus size={10} />
                        </button>
                      </LessonItem>
                    ))
                  ) : (
                    <EmptySlot onClick={() => onAddLesson(day, time)}>
                      <FaPlus size={14} />
                    </EmptySlot>
                  )}
                </HourSlot>
              );
            })}
          </div>
        ))}
      </GridContainer>
    </div>
  );
};

export default ScheduleGrid;