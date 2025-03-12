import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaUser, FaSave, FaTimes } from "react-icons/fa";
import { Student } from "../../../utils/types";

import { Button, CloseButton } from '../../../styles/buttons'

import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ErrorMessage,
    SuccessMessage,
    InputGroup,
    Input,
    Label,
    LoadingIndicator
} from "./styles";

/**
 * Interface para as propriedades do modal de estudante
 */
interface StudentFormModalProps {
    studentData: Omit<Student, "id">;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: (data: Omit<Student, "id">) => void;
    onClose: () => void;
    isSubmitting?: boolean;
    validationErrors?: Record<string, string>;
}

/**
 * Modal de cadastro/edição de estudante
 */
const StudentFormModal: React.FC<StudentFormModalProps> = ({
    studentData,
    onInputChange,
    onSave,
    onClose,
    isSubmitting = false,
    validationErrors = {}
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [feedback, setFeedback] = useState<{ errorMessage?: string; successMessage?: string }>({});

    /**
     * Fecha o modal ao clicar fora dele
     */
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [onClose]);

    /**
     * Valida o formulário antes de salvar
     */
    const handleSubmit = useCallback(() => {
        if (isSubmitting) return;

        if (!studentData.name.trim() || !studentData.email.trim()) {
            setFeedback({ errorMessage: "Preencha todos os campos obrigatórios." });
            return;
        }

        if (Object.keys(validationErrors).length > 0) {
            setFeedback({ errorMessage: "Corrija os erros antes de salvar." });
            return;
        }

        try {
            onSave(studentData);
            setFeedback({ successMessage: "Aluno salvo com sucesso!" });
        } catch (error) {
            setFeedback({ errorMessage: "Erro ao salvar aluno. Tente novamente." });
        }
    }, [studentData, validationErrors, isSubmitting, onSave]);

    return (
        <ModalContainer role="dialog" aria-modal="true">
            <ModalContent ref={modalRef}>
                <ModalHeader>
                    <h3>
                        <FaUser className="icon-spacing" style={{ marginRight: '1rem' }} />
                        <span>Cadastro de Aluno</span>
                    </h3>
                    <CloseButton onClick={onClose} aria-label="Fechar modal">
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    <InputGroup>
                        <Label htmlFor="student-name">Nome</Label>
                        <Input
                            id="student-name"
                            type="text"
                            name="name"
                            value={studentData.name}
                            onChange={onInputChange}
                            placeholder="Digite o nome completo"
                            aria-invalid={!!validationErrors.name}
                        />
                        {validationErrors.name && <ErrorMessage>{validationErrors.name}</ErrorMessage>}
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="student-email">E-mail</Label>
                        <Input
                            id="student-email"
                            type="email"
                            name="email"
                            value={studentData.email}
                            onChange={onInputChange}
                            placeholder="Digite o e-mail"
                            aria-invalid={!!validationErrors.email}
                        />
                        {validationErrors.email && <ErrorMessage>{validationErrors.email}</ErrorMessage>}
                    </InputGroup>

                    {feedback.errorMessage && <ErrorMessage>{feedback.errorMessage}</ErrorMessage>}
                    {feedback.successMessage && <SuccessMessage>{feedback.successMessage}</SuccessMessage>}
                </ModalBody>

                <ModalFooter>
                    <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? <><LoadingIndicator /> Salvando...</> : <><FaSave /> Salvar</>}
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        <FaTimes /> Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default StudentFormModal;
