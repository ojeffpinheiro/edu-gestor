import React from 'react'
import { ClassroomLayout, GridContainer, TeacherDesk } from "./style";
import { PriorityConfig, PriorityInfo, PriorityType, SeatType } from '../../../types/classroom/Team';
import DroppableSeat from '../DroppableSeat';
import { getAttendanceColor } from '../../../utils/attendanceUtils';

interface Props {
    seats: SeatType[];
    conferenceMode: boolean;
    isChecked: boolean;
    isMismatched: boolean;
    onSeatClick: (seat: SeatType) => void;
    onVerify?: (seatId: string, isCorrect: boolean) => void;
    getStudentName: (studentId?: number | undefined) => string;
    getPriorityInfo: (priority?: PriorityType) => PriorityConfig | PriorityInfo;
}

const ClassroomGrid: React.FC<Props> = ({
    seats,
    conferenceMode, 
    isMismatched,
    isChecked,
    onSeatClick,
    getStudentName,
    getPriorityInfo,
    onVerify
}) => {

    return (
        <ClassroomLayout>
            <h3>Layout da Sala</h3>
            <TeacherDesk>
                <span>Mesa do Professor</span>
            </TeacherDesk>
            <GridContainer>
                {seats.map(seat => (
                    <DroppableSeat
                        key={seat.id}
                        seat={seat}
                        onSeatClick={onSeatClick}
                        verifyMode={conferenceMode}
                        getAttendanceColor={getAttendanceColor}
                        getStudentName={getStudentName}
                        getPriorityInfo={getPriorityInfo}
                        showTooltips={true}
                        compactView={false}
                        conferenceMode={conferenceMode}
                        isChecked={isChecked}
                        isMismatched={isMismatched}
                        onVerify={onVerify}
                    />
                ))}
            </GridContainer>
        </ClassroomLayout>
    );
};

export default ClassroomGrid;