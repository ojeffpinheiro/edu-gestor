// components/Team/LayoutView/index.tsx
import React from 'react';
import DroppableSeat from '../DroppableSeat';
import { LayoutConfig, PriorityConfig, PriorityInfo, PriorityType, SeatType } from '../../../utils/types/Team';
import { StudentFormData } from '../../../utils/types/BasicUser';
import { ClassroomLayout, GridContainer, TeacherDesk } from './styles';
import { getAttendanceColor, getStudentAttendance } from '../../../utils/attendanceUtils';

interface LayoutViewProps {
  layout: LayoutConfig;
  studentList: StudentFormData[];
  selectedSeat: SeatType | null;
  editLayoutMode: boolean;
  conferenceMode: boolean;
  isChecked: boolean;
  isMismatched: boolean;
  onSeatClick: (seat: SeatType) => void;
  setLayout: React.Dispatch<React.SetStateAction<LayoutConfig>>;
  getStudentName: (studentId?: number | undefined) => string;
  getPriorityInfo: (priority?: PriorityType) => PriorityConfig | PriorityInfo;
  onVerify?: (seatId: string, isCorrect: boolean) => void;
}

const LayoutView: React.FC<LayoutViewProps> = ({
  layout,
  studentList,
  selectedSeat,
  editLayoutMode,
  conferenceMode,
  isChecked,
  isMismatched,
  onVerify,
  onSeatClick,
  setLayout,
  getPriorityInfo,
  getStudentName,
}) => {
  return (
    <ClassroomLayout>
      <h3>Layout da Sala</h3>
      <TeacherDesk>
        <span>Mesa do Professor</span>
      </TeacherDesk>
      <GridContainer>
        {layout.seats.map(seat => (
          <DroppableSeat
            key={seat.id}
            seat={seat}
            seats={layout.seats}
            studentList={studentList}
            selectedSeat={selectedSeat}
            editMode={editLayoutMode}
            verifyMode={conferenceMode}
            conferenceMode={conferenceMode}
            compactView={false}
            isChecked={isChecked}
            isMismatched={isMismatched}
            showTooltips={true}
            onSeatClick={onSeatClick}
            setLayout={setLayout}
            getAttendanceColor={getAttendanceColor}
            getStudentAttendance={getStudentAttendance}
            getStudentName={getStudentName}
            getPriorityInfo={getPriorityInfo}
            onVerify={onVerify}
          />
        ))}
      </GridContainer>
    </ClassroomLayout>
  );
};

export default LayoutView;