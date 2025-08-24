import React from "react";
import { FaEdit, FaCopy, FaClipboardList, FaTrash } from "react-icons/fa";

import { Card, CardHeader, CardBody, ActionButton } from "./styles";
import { Evaluation } from "../../../types/evaluation/AssessmentEvaluation";

interface EvaluationsListProps {
    evaluations: Evaluation[];
    onSelect: (evaluation: Evaluation) => void;
    onDelete: (id: number) => void;
    onDuplicate: (evaluation: Evaluation) => void;
    onRegisterScores: (evaluation: Evaluation) => void;
}

const EvaluationsList: React.FC<EvaluationsListProps> = ({
    evaluations,
    onSelect,
    onDelete,
    onDuplicate,
    onRegisterScores
}) => {

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {evaluations.map(evaluation => (
                <Card key={evaluation.id}>
                    <CardHeader>
                        <h3>{evaluation.name}</h3>
                        <div>
                            <ActionButton onClick={() => onSelect(evaluation)} title="Editar">
                                <FaEdit />
                            </ActionButton>
                            <ActionButton onClick={() => onRegisterScores(evaluation)} title="Registrar Notas">
                                <FaClipboardList />
                            </ActionButton>
                            <ActionButton title="Duplicar" onClick={() => onDuplicate(evaluation)}>
                                <FaCopy />
                            </ActionButton>
                            <ActionButton onClick={() => onDelete(evaluation.id)} title="Excluir">
                                <FaTrash />
                            </ActionButton>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>Trimestre: {evaluation.trimester}º</p>
                        <p>Aprovação: {evaluation.passingGrade}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default EvaluationsList;