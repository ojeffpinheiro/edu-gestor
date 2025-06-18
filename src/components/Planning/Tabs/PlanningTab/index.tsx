import React from 'react';
import ScheduleGrid from '../../ScheduleGrid';
import { Shift } from '../../../../utils/types/Planning';
import { useSchedule } from '../../../../contexts/ScheduleContext';
import { Container, SelectContainer, ShiftSelect, GridContainer } from './styles';

const TabPlanning: React.FC = () => {
    const { state: { selectedShift, shiftSettings }, setSelectedShift } = useSchedule();

    console.log('Shift settings:', shiftSettings);
    console.log('Selected shift:', selectedShift);

    return (
        <Container>
            <SelectContainer>
                <label>Turno:</label>
                <ShiftSelect
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value as Shift)}
                >
                    {Object.keys(shiftSettings).map(shift => (
                        <option key={shift} value={shift}>{shift}</option>
                    ))}
                </ShiftSelect>
            </SelectContainer>

            <GridContainer>
                <ScheduleGrid 
                    shift={selectedShift}
                    readOnly={true}
                />
            </GridContainer>
        </Container>
    );
};

export default TabPlanning;