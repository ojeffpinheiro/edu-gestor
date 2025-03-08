import React from "react";
import { FaUserPlus, FaRandom, FaUser, FaCalendarAlt } from "react-icons/fa";
import { Container, ButtonGroup, Button, Icon } from "./styles";

interface ActionsContainerProps {
    onAddStudent: () => void;
    onSortGroups: () => void;
    onSortStudent: () => void;
    onShowCalendar: () => void;
}

const ActionsContainer: React.FC<ActionsContainerProps> = ({
    onAddStudent,
    onSortGroups,
    onSortStudent,
    onShowCalendar,
}) => {
    return (
        <Container>
            <Button variant="primary" onClick={onAddStudent}>
                <Icon><FaUserPlus /></Icon> Adicionar Aluno
            </Button>
            <ButtonGroup>
                <Button variant="info" onClick={onSortGroups}>
                    <Icon><FaRandom /></Icon> Sortear Grupos
                </Button>
                <Button variant="warning" onClick={onSortStudent}>
                    <Icon><FaUser /></Icon> Sortear Aluno
                </Button>
                <Button variant="success" onClick={onShowCalendar}>
                    <Icon><FaCalendarAlt /></Icon> Calendário
                </Button>
            </ButtonGroup>
        </Container>
    );
};

export default ActionsContainer;
