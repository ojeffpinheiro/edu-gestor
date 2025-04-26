import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

import { CloseButton, Button } from "../../../styles/buttons";
import { Table, TableCell, TableHeader, TableRow } from '../../../styles/table'
import { EvaluationPart, StudentScore } from "../../../utils/types/AssessmentEvaluation";
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from "../../../styles/modals";

interface RegisterScoresModalProps {
    students: { id: number; name: string }[];
    evaluationParts: EvaluationPart[];
    onClose: () => void;
    onSave: (scores: StudentScore[]) => void;
}

const RegisterScoresModal: React.FC<RegisterScoresModalProps> = ({ students, evaluationParts, onClose, onSave }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [scores, setScores] = useState<StudentScore[]>(students.map(student => ({
        studentId: student.id.toString(),
        toolId: '',
        score: 0,
    })));

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [scores]);

    const handleScoreChange = (studentId: number, partId: string, value: number) => {
        setScores(prevScores => {
            const updatedScores = prevScores.map(score => {
                if (score.studentId === studentId.toString()) {
                    return { ...score, score: value }; // Atualiza a nota do aluno
                }
                return score;
            });
            return updatedScores;
        });
    };

    const handleSave = () => {
        onSave(scores);
        onClose();
    };

    return (
        <ModalContainer role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <ModalContent ref={modalRef} size='md' >
                <ModalHeader>
                    <h3>Registrar notas</h3>
                    <CloseButton
                        onClick={onClose}
                        aria-label="Fechar modal"
                        title="Fechar"
                        data-testid="close-modal-btn"
                    >
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                            <TableRow>
                                <TableHeader>Aluno</TableHeader>
                                {evaluationParts.map(part => (
                                    <TableHeader key={part.id}>{part.name}</TableHeader>
                                ))}
                                <TableHeader>Soma</TableHeader>
                            </TableRow>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <TableRow key={`grade-${index}`}>
                                    <TableCell>{student.name}</TableCell>
                                    {evaluationParts.map(part => (
                                        <TableCell key={part.id}>
                                            <input
                                                type="number"
                                                min="0"
                                                max={part.maxScore}
                                                onChange={(e) => handleScoreChange(student.id, part.id, Number(e.target.value))}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        {scores
                                            .filter(score => score.studentId === student.id.toString())
                                            .reduce((total, score) => total + score.score, 0)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSave}>Salvar</Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default RegisterScoresModal;