import React from 'react';
import styled from 'styled-components';
import { EvaluationPart } from '../../utils/types/AssessmentEvaluation';

const PartContainer = styled.div`
    padding: 8px 12px;
    background-color: #e3f2fd;
    border-radius: 4px;
    margin: 4px;
    cursor: grab;
    user-select: none;
    border: 1px solid #bbdefb;
    
    &:active {
        cursor: grabbing;
        background-color: #bbdefb;
    }
`;

interface DraggablePartProps {
    part: EvaluationPart;
    onDragStart: (partId: string) => void;
}

const DraggablePart: React.FC<DraggablePartProps> = ({ part, onDragStart }) => {
    return (
        <PartContainer
            draggable
            onDragStart={() => onDragStart(part.id)}
        >
            {part.name} (Max: {part.maxScore})
        </PartContainer>
    );
};

export default DraggablePart;