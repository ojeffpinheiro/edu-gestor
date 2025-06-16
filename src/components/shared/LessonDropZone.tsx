import React from 'react';
import { useDrop } from 'react-dnd';
import { DropZone } from '../../styles/schedule';
import { DayOfWeek } from '../../utils/types/Planning';

interface LessonDropZoneProps {
  day: DayOfWeek;
  onDrop: (lessonId: number, day: DayOfWeek) => void;
  children: React.ReactNode;
}

interface DropItem {
  id: number;
}

const LessonDropZone: React.FC<LessonDropZoneProps> = ({ day, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LESSON',
    drop: (item: DropItem) => onDrop(item.id, day),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop as unknown as React.Ref<HTMLDivElement>}>
      <DropZone
        isOver={isOver}
        data-testid={`drop-zone-${day}`}
      >
        <h3>{day}</h3>
        {children}
      </DropZone>
    </div>
  );
};

export default LessonDropZone;