import React, { forwardRef } from 'react';
import { useDrag } from 'react-dnd';
import { Lesson } from '../../types/academic/Planning';
import { LessonCard } from '../../styles/schedule';

interface DraggableLessonProps {
  lesson: Lesson;
  onReorder: (draggedId: number, targetId: number) => void;
}

interface DropResult {
  id: number;
}

// Componente interno que aceita ref
const InnerLessonCard = forwardRef<HTMLDivElement, { 
  lesson: Lesson; 
  isDragging: boolean 
}>(({ lesson, isDragging }, ref) => (
  <LessonCard
    ref={ref}
    style={{ opacity: isDragging ? 0.5 : 1 }}
    data-testid={`draggable-lesson-${lesson.id}`}
  >
    <h4>{lesson.discipline}</h4>
    <p>{lesson.timeSlot}</p>
    <p>{lesson.team}</p>
  </LessonCard>
));

const DraggableLesson: React.FC<DraggableLessonProps> = ({ lesson, onReorder }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'LESSON',
    item: { id: lesson.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        onReorder(item.id, dropResult.id);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Usamos o drag como callback ref
  return <InnerLessonCard 
    ref={(node: HTMLDivElement | null) => { if (node) { drag(node); } }} 
    lesson={lesson} 
    isDragging={isDragging} 
  />;
};

export default DraggableLesson;