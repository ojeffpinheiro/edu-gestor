import React from 'react';
import { Evaluation } from '../../types/evaluation/AssessmentEvaluation';
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from '../../styles/modals';
import { Button } from '../../styles/buttons';

interface StudentGradesModalProps {
    student: { id: number; name: string };
    evaluations: Evaluation[];
    onClose: () => void;
}

const StudentGradesModal: React.FC<StudentGradesModalProps> = ({ student, evaluations, onClose }) => {
    // In a real app, this would come from your backend/state
    const mockGrades = [
        { evaluationId: 1, partId: 'part1', score: 8.5 },
        { evaluationId: 2, partId: 'part1', score: 7.0 },
        // ... more grades
    ];

    return (
        <ModalContainer>
            <ModalContent size='md' >
                <ModalHeader>
                    <h3>Notas detalhadas: {student.name}</h3>
                    <button onClick={onClose}>&times;</button>
                </ModalHeader>
                <ModalBody>
                    <table>
                        <thead>
                            <tr>
                                <th>Avaliação</th>
                                <th>Parte</th>
                                <th>Nota</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockGrades.map((grade, index) => {
                                const evaluation = evaluations.find(e => e.id === grade.evaluationId);
                                const part = evaluation?.parts.find(p => p.id === grade.partId);
                                
                                return (
                                    <tr key={index}>
                                        <td>{evaluation?.name || 'N/A'}</td>
                                        <td>{part?.name || 'N/A'}</td>
                                        <td>
                                            <input 
                                                type="number" 
                                                value={grade.score} 
                                                onChange={(e) => {
                                                    // Handle grade update
                                                }} 
                                                min={0} 
                                                max={part?.maxScore || 10}
                                            /> / {part?.maxScore || 10}
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                // Handle save for this grade
                                            }}>
                                                Salvar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Fechar</Button>
                    <Button onClick={() => {
                        // Handle save all grades
                    }}>Salvar Todas</Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default StudentGradesModal;