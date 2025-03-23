import React from 'react';
import { Input } from '../../styles/inputs'
import { GroupFormationState, GroupFormationType, FORMATION_CONFIG, StudentAttendance } from '../../utils/types'

interface FormationControlsProps {
    formationParams: GroupFormationState;
    students: StudentAttendance[];
    handleGroupSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNumberOfGroupsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Componente para renderizar os controles de formação baseados no tipo selecionado
 */
const FormationControls: React.FC<FormationControlsProps> = ({
    formationParams,
    students,
    handleGroupSizeChange,
    handleNumberOfGroupsChange
}) => {
    const { formationType, groupSize, numberOfGroups } = formationParams;
    
    if (formationType === GroupFormationType.BY_SIZE) {
        return (
            <>
                <label htmlFor="groupSize">
                    Estudantes por grupo: 
                    <span className="help-text" style={{ color: '#718096', fontSize: '13px', marginLeft: '4px' }}>
                        (min: {FORMATION_CONFIG.MIN_GROUP_SIZE}, max: {students.length})
                    </span>
                </label>
                <Input
                    id="groupSize"
                    type="number"
                    min={FORMATION_CONFIG.MIN_GROUP_SIZE}
                    max={students.length}
                    value={groupSize}
                    onChange={handleGroupSizeChange}
                    aria-label="Tamanho do grupo"
                    aria-describedby="groupSizeHelp"
                    data-testid="group-size-input"
                />
                <small id="groupSizeHelp" className="sr-only">
                    Informe quantos estudantes devem estar em cada grupo
                </small>
            </>
        );
    }
    
    return (
        <>
            <label htmlFor="numberOfGroups">
                Quantidade de grupos:
                <span className="help-text" style={{ color: '#718096', fontSize: '13px', marginLeft: '4px' }}>
                    (min: {FORMATION_CONFIG.MIN_GROUPS}, max: {students.length})
                </span>
            </label>
            <Input
                id="numberOfGroups"
                type="number"
                min={FORMATION_CONFIG.MIN_GROUPS}
                max={students.length}
                value={numberOfGroups}
                onChange={handleNumberOfGroupsChange}
                aria-label="Número de grupos"
                aria-describedby="numberOfGroupsHelp"
                data-testid="number-groups-input"
            />
            <small id="numberOfGroupsHelp" className="sr-only">
                Informe quantos grupos devem ser formados no total
            </small>
        </>
    );
};

export default FormationControls;