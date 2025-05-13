import React from "react";
import { FaUserPlus, FaRandom, FaUser } from "react-icons/fa";

import { Button } from '../../../styles/buttons'
import { Container, ButtonGroup, Icon } from "./styles";

interface ActionsContainerProps {
    onAddStudent?: () => void;
    onSortGroups?: () => void;
    onSortStudent?: () => void;
}

const ActionsContainer: React.FC<ActionsContainerProps> = ({
    onAddStudent,
    onSortGroups,
    onSortStudent,
}) => {
    return (
        <Container>
            {onAddStudent && (
                <Button variant="primary" onClick={onAddStudent}>
                    <Icon><FaUserPlus /></Icon> Adicionar Aluno
                </Button>
            )}
            <ButtonGroup>
                {onSortGroups && (
                    <Button variant="info" onClick={onSortGroups}>
                    <Icon><FaRandom /></Icon> Sortear Grupos
                </Button>
                )}
                {onSortStudent && (
                    <Button variant="warning" onClick={onSortStudent}>
                    <Icon><FaUser /></Icon> Sortear Aluno
                </Button>
                )}
            </ButtonGroup>
        </Container>
    );
};

export default ActionsContainer;
