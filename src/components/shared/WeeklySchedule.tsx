import React from 'react';
import DraggableLesson from './DraggableLesson';
import LessonDropZone from './LessonDropZone';
import { useSchedule } from '../../hooks/useSchedule';

const WeeklySchedule: React.FC = () => {
  const { lessons, moveLesson, days, handleReorder } = useSchedule();

  return (
    <div className="weekly-schedule">
      {days.map(day => (
        <LessonDropZone 
          key={day} 
          day={day}
          onDrop={(lessonId) => moveLesson(lessonId, day)}
        >
          {lessons
            .filter(lesson => lesson.day === day)
            .map(lesson => (
              <DraggableLesson
                key={lesson.id}
                lesson={lesson}
                onReorder={handleReorder}
              />
            ))}
        </LessonDropZone>
      ))}
    </div>
  );
};

export default WeeklySchedule;