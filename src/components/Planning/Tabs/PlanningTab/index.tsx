import React from 'react';
import ScheduleGrid from '../../ScheduleGrid';
import { ShiftSelector, ViewerContainer } from '../ClassScheduleTab/styles';
import { Shift } from '../../../../utils/types/Planning';
import { useSchedule } from '../../../../contexts/ScheduleContext';

const TabPlanning: React.FC = () => {
    const { state: { selectedShift, shiftSettings }, setSelectedShift } = useSchedule();

    return (
        <ViewerContainer>
            <ShiftSelector
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value as Shift)}
            >
                {Object.keys(shiftSettings).map(shift => (
                    <option key={shift} value={shift}>{shift}</option>
                ))}
            </ShiftSelector>

            <ScheduleGrid 
                shift={selectedShift}
                readOnly={true}
            />
        </ViewerContainer>
    );
};

export default TabPlanning;