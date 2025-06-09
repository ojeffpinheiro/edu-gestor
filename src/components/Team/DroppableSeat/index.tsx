import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { FiAlertCircle } from 'react-icons/fi';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { SeatType, PriorityType, PriorityInfo, PriorityConfig } from '../../../utils/types/Team';
import Seat from '../Seat';
import { StudentFormData } from '../../../utils/types/BasicUser';
import { useClassroom } from '../../../contexts/ClassroomContext';

interface DraggableStudentItem {
    id: number;
    type: 'STUDENT';
    student: StudentFormData;
}

interface DroppableSeatProps {
    seat: SeatType;
    verifyMode: boolean;
    showTooltips?: boolean;
    compactView?: boolean;
    conferenceMode?: boolean;
    isChecked?: boolean;
    isMismatched?: boolean;
    onSeatClick: (seat: SeatType) => void;
    getAttendanceColor: (attendance: number) => string;
    getStudentName: (studentId?: number) => string;
    getPriorityInfo: (priority?: PriorityType) => PriorityConfig | PriorityInfo;
    onVerify?: (seatId: string, isCorrect: boolean) => void;
}

const DroppableSeat: React.FC<DroppableSeatProps> = ({
    seat,
    verifyMode,
    showTooltips = true,
    compactView = false,
    conferenceMode = false,
    isChecked = false,
    isMismatched = false,
    onSeatClick,
    getAttendanceColor,
    getStudentName,
    getPriorityInfo,
    onVerify
}) => {
    const { 
        state: { 
            filteredStudents,
            selectedSeat,
            editMode,
            layout:{ seats } },
        getStudentAttendance,
        dispatch } = useClassroom();

    const handleDrop = useCallback((item: DraggableStudentItem) => {
        dispatch({
            type: 'UPDATE_SEAT',
            payload: {
                ...seat,
                studentId: item.id,
                updatedAt: new Date()
            }
        });
    }, [seat, dispatch]);

    const canDropStudent = useCallback((item: DraggableStudentItem) => {
        const isAlreadyAssigned = seats.some(s =>
            s.studentId === item.id && s.id !== seat.id
        );
        return !isAlreadyAssigned || !seat.studentId;
    }, [seats, seat.id, seat.studentId]);

    const [{ isOver, canDrop }] = useDrop<DraggableStudentItem, void, { isOver: boolean; canDrop: boolean }>({
        accept: 'STUDENT',
        drop: handleDrop,
        canDrop: canDropStudent,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <div style={{ position: 'relative' }}>
            <Seat
                seat={seat}
                studentList={filteredStudents}
                selectedSeat={selectedSeat}
                verifyMode={verifyMode}
                editMode={editMode}
                showTooltips={showTooltips}
                compactView={compactView}
                getStudentAttendance={getStudentAttendance}
                getAttendanceColor={getAttendanceColor}
                getStudentName={getStudentName}
                getPriorityInfo={getPriorityInfo}
                onClick={() => onSeatClick(seat)}
                isHighlighted={isOver && canDrop}
                isInvalid={isOver && !canDrop}
                conferenceMode={conferenceMode}
                isChecked={isChecked}
                isMismatched={isMismatched}
                onVerify={(isCorrect) => onVerify?.(seat.id, isCorrect)}
            />
            {conferenceMode && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    display: 'flex',
                    gap: '4px'
                }}>
                    <button
                        onClick={() => onVerify?.(seat.id, true)}
                        style={{
                            background: isChecked ? '#4CAF50' : '#e0e0e0',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isChecked && <FaCheck size={12} color="white" />}
                    </button>
                    <button
                        onClick={() => onVerify?.(seat.id, false)}
                        style={{
                            background: isMismatched ? '#F44336' : '#e0e0e0',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isMismatched && <FaTimes size={12} color="white" />}
                    </button>
                </div>
            )}
            {isOver && !canDrop && (
                <div
                    style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: '#ff4444',
                        borderRadius: '50%',
                        padding: '4px',
                        color: 'white'
                    }}
                >
                    <FiAlertCircle size={16} />
                </div>
            )}
        </div>
    );
};

export default DroppableSeat;