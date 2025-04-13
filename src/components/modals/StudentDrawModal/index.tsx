import React, { useEffect, useRef } from "react";
import { FaRandom, FaTimes } from "react-icons/fa";

import { Button, CloseButton } from '../../../styles/buttons'

import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Icon,
    EmptyState,
    DrawnStudentContainer
} from "./styles";
import { StudentAttendance } from "../../../utils/types/BasicUser";

interface StudentDrawModalProps {
    students: StudentAttendance[];
    onClose: () => void;
    onDraw: () => void;
    drawnStudent: StudentAttendance | null;
}

const StudentDrawModal: React.FC<StudentDrawModalProps> = ({ students, onClose, onDraw, drawnStudent }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    /**
         * Detecta cliques fora do modal para fechá-lo
         */
        useEffect(() => {
            const handleOutsideClick = (event: MouseEvent) => {
                if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                    onClose();
                }
            };
    
            document.addEventListener('mousedown', handleOutsideClick);
            return () => document.removeEventListener('mousedown', handleOutsideClick);
        }, []);
    

    return (
        <ModalContainer role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <ModalContent ref={modalRef}>
                <ModalHeader>
                    <h3>Sorteio de Aluno</h3>
                    <CloseButton onClick={onClose} aria-label="Fechar modal" title="Fechar">
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>
                <ModalBody>
                    {drawnStudent ? (
                        <div>
                            <h4>Aluno Sorteado:</h4>
                            <DrawnStudentContainer>{drawnStudent.name}</DrawnStudentContainer>
                        </div>
                    ) : (
                        <EmptyState>Nenhum aluno disponível para sorteio.</EmptyState>
                    )}

                    <Button variant="primary" onClick={onDraw} disabled={students.length === 0}>
                        <Icon><FaRandom /></Icon> Sortear Novamente
                    </Button>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>Fechar</Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default StudentDrawModal;
