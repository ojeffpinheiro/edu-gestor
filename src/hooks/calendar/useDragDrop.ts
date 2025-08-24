import { useState, useRef } from 'react';
import { CalendarEvent } from '../../utils/types/CalendarEvent';

interface DragDropHandlers {
    onDragStart: (event: CalendarEvent, e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (date: Date, e: React.DragEvent) => void;
    draggedEvent: CalendarEvent | null;
    isDragging: boolean;
}

export const useDragDrop = (
    onMoveEvent: (
        eventId: string,
        newStart: Date,
        newEnd: Date
    ) => void
): DragDropHandlers => {
    const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const onDragStart = (event: CalendarEvent, e: React.DragEvent) => {
        setDraggedEvent(event);
        setIsDragging(true);
        dragOffset.current = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        };
        e.dataTransfer.setData('text/plain', event.id);
        e.dataTransfer.effectAllowed = 'move';
        document.body.classList.add('dragging-active');
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (date: Date, e: React.DragEvent) => {
        e.preventDefault();
        if (!draggedEvent) return;

        const duration = (draggedEvent.end as Date).getTime() - (draggedEvent.start as Date).getTime();
        const newStart = new Date(date);
        const newEnd = new Date(newStart.getTime() + duration);

        onMoveEvent(draggedEvent.id, newStart, newEnd);
        setDraggedEvent(null);
        setIsDragging(false);
        document.body.classList.remove('dragging-active');
    };

    return {
        onDragStart,
        onDragOver,
        onDrop,
        draggedEvent,
        isDragging
    };
};