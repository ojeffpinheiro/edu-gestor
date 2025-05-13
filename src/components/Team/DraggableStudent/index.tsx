import React from 'react';
import { useDrag } from "react-dnd";
import { StudentFormData } from '../../../hooks/useStudent';
import { StudentItem } from '../../../pages/Team/ClassroomLayoutPage/styles';

interface DraggableStudentProps {
    student: StudentFormData;
    setSelectedStudent: (student: StudentFormData) => void;
    isSelected: boolean;
}

const DraggableStudent: React.FC<DraggableStudentProps> = ({ 
    student, 
    setSelectedStudent, 
    isSelected 
}) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'STUDENT',
        item: { id: student.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <StudentItem
            ref={drag}
            isDragging={isDragging}
            onClick={() => setSelectedStudent(student)}
            isSelected={isSelected}
        >
            {student.name}
        </StudentItem>
    );
};

export default DraggableStudent;