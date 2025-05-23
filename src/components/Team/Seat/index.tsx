import React from 'react';
import { AttendanceIndicator, EmptySeatLabel, SeatContainer, StudentName } from "../../../pages/Team/ClassroomLayoutPage/styles";
import { StudentFormData } from '../../../utils/types/BasicUser';
import { SeatType } from "../../../utils/types/Team";

interface SeatProps {
    seat: SeatType;
    studentList: StudentFormData[];
    selectedSeat: SeatType | null;
    verifyMode: boolean;
    getStudentAttendance: (id: number) => number;
    getAttendanceColor: (attendance: number) => string;
    getStudentName: (studentId?: number) => string;
    onClick: () => void;
}

const Seat: React.FC<SeatProps> = ({ 
    seat, 
    studentList, 
    selectedSeat, 
    verifyMode, 
    getStudentAttendance, 
    getAttendanceColor, 
    getStudentName, 
    onClick 
}) => {
    const student = studentList.find(s => s.id === seat.studentId);
    const attendance = student?.id ? getStudentAttendance(student.id) : 0;
    const color = student?.id ? getAttendanceColor(attendance) : undefined;

    return (
        <SeatContainer
            onClick={onClick}
            hasStudent={!!seat.studentId}
            isSelected={selectedSeat?.id === seat.id}
            attendanceColor={color}
            priority={seat.priority ?? null}
            verification={verifyMode}
        >
            {seat.studentId ? (
                <>
                    <StudentName>{getStudentName(seat.studentId)}</StudentName>
                    <AttendanceIndicator>{attendance}%</AttendanceIndicator>
                </>
            ) : (
                <EmptySeatLabel>Vazio</EmptySeatLabel>
            )}
        </SeatContainer>
    );
};

export default Seat;