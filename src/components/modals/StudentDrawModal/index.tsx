import React from "react";
import { FaRandom } from "react-icons/fa";

import { StudentAttendance } from "../../../utils/types/BasicUser";

import Modal from "../Modal";

import { Button } from '../../../styles/buttons'
import { DrawnStudentContainer, EmptyState, Icon } from "./styles";

interface StudentDrawModalProps {
    students: StudentAttendance[];
    onClose: () => void;
    onDraw: () => void;
    drawnStudent: StudentAttendance | null;
}

const StudentDrawModal: React.FC<StudentDrawModalProps> = ({ students, onClose, onDraw, drawnStudent }) => {
    return (
        <Modal
            isOpen={!!students} 
            title='Sorteio de Aluno'
            showFooter size='sm'
            onClose={onClose} 
            cancelText='Fechar'>
            <div>
                {drawnStudent ? (
                    <div>
                        <h4>Aluno Sorteado:</h4>
                        <DrawnStudentContainer>{drawnStudent.name}</DrawnStudentContainer>
                    </div>
                ) : (
                    <EmptyState>Nenhum aluno disponível para sorteio.</EmptyState>
                )}

                <Button 
                    variant="primary" 
                    onClick={onDraw} 
                    disabled={students.length === 0}>
                    <Icon><FaRandom /></Icon> Sortear Novamente
                </Button>
            </div>
        </Modal>
    );
};

export default StudentDrawModal;
