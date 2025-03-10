import React from 'react';
import { FaUsers } from "react-icons/fa";

import { GroupsList, GroupItem, StudentsList, StudentItem } from '../modals/GroupDrawModal/styles'
import { Student } from '../../utils/types'

interface GroupsResultListProps {
    studentGroups: Student[][];
    showResults: boolean;
}

/**
 * Componente para renderizar a lista de grupos formados
 */
const GroupsResultList: React.FC<GroupsResultListProps> = ({ 
    studentGroups, 
    showResults 
}) => {
    if (!showResults || studentGroups.length === 0) return null;
    
    return (
        <GroupsList>
            <h4>
                <FaUsers style={{ marginRight: '8px' }} />
                Grupos Formados ({studentGroups.length})
            </h4>
            {studentGroups.map((group, index) => (
                <GroupItem key={index}>
                    <h5>Grupo {index + 1} ({group.length} estudantes)</h5>
                    <StudentsList>
                        {group.map((student) => (
                            <StudentItem key={student.id}>{student.name}</StudentItem>
                        ))}
                    </StudentsList>
                </GroupItem>
            ))}
        </GroupsList>
    );
};

export default GroupsResultList;