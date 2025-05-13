import React from 'react';
import { useDrop } from 'react-dnd';
import { LayoutConfig, SeatType } from '../../../utils/types/Team';
import Seat from '../Seat';
import { DropHighlight } from '../../../pages/Team/ClassroomLayoutPage/styles';
import { StudentAttendance } from '../../../utils/types/BasicUser';

interface DroppableSeatProps {
    seat: SeatType;
    layout: LayoutConfig;
    setLayout: React.Dispatch<React.SetStateAction<LayoutConfig>>;
    handleSeatClick: (seat: SeatType) => void;
    studentList: StudentAttendance[];
    selectedSeat: SeatType | null;
    verifyMode: boolean;
    getStudentAttendance: (id: number) => number;
    getAttendanceColor: (attendance: number) => string;
    getStudentName: (studentId?: number) => string;
}

const DroppableSeat: React.FC<DroppableSeatProps> = ({ 
    seat, 
    layout, 
    setLayout, 
    handleSeatClick,
    studentList,
    selectedSeat,
    verifyMode,
    getStudentAttendance,
    getAttendanceColor,
    getStudentName
}) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'STUDENT',
        drop: (item: { id: number }) => {
            const updatedSeats = layout.seats.map(s => {
                if (s.id === seat.id) {
                    return { ...s, studentId: item.id };
                }
                return s;
            });

            setLayout({ ...layout, seats: updatedSeats });
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} style={{ position: 'relative' }}>
            <Seat
                seat={seat}
                studentList={studentList}
                selectedSeat={selectedSeat}
                verifyMode={verifyMode}
                getStudentAttendance={getStudentAttendance}
                getAttendanceColor={getAttendanceColor}
                getStudentName={getStudentName}
                onClick={() => handleSeatClick(seat)}
            />
            {isOver && <DropHighlight />}
        </div>
    );
};

export default DroppableSeat;