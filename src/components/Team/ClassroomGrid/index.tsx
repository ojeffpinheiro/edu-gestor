import React from 'react'
import { StudentFormData } from "../../../utils/types/BasicUser";
import { ClassroomLayout, GridContainer, TeacherDesk } from "./style";
import { LayoutConfig, PriorityConfig, PriorityInfo, PriorityType, SeatType } from '../../../utils/types/Team';
import DroppableSeat from '../DroppableSeat';
import { getAttendanceColor, getStudentAttendance } from '../../../utils/attendanceUtils';

interface Props {
    seats: SeatType[];
    studentList: StudentFormData[];
    selectedSeat: SeatType | null;
    conferenceMode: boolean;
    editLayoutMode: boolean;
    isChecked: boolean;
    isMismatched: boolean;
    onSeatClick: (seat: SeatType) => void;
    onVerify?: (seatId: string, isCorrect: boolean) => void;
    setLayout: React.Dispatch<React.SetStateAction<LayoutConfig>>;
    getStudentName: (studentId?: number | undefined) => string;
    getPriorityInfo: (priority?: PriorityType) => PriorityConfig | PriorityInfo;
}

const ClassroomGrid: React.FC<Props> = ({
    seats, 
    studentList, 
    selectedSeat, 
    conferenceMode, 
    isMismatched,
    editLayoutMode,
    isChecked,
    setLayout,
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
                        seats={seats}
                        setLayout={setLayout}
                        onSeatClick={onSeatClick}
                        studentList={studentList}
                        selectedSeat={selectedSeat}
                        verifyMode={conferenceMode}
                        getStudentAttendance={getStudentAttendance}
                        getAttendanceColor={getAttendanceColor}
                        getStudentName={getStudentName}
                        getPriorityInfo={getPriorityInfo}
                        editMode={editLayoutMode}
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