import React from 'react';
import { Evaluation } from '../../../utils/types/AssessmentEvaluation';
import { ModalBody, ModalContainer, ModalHeader } from '../../../styles/modals';
import { ModalContent } from '../../../styles/baseComponents';
import { Table, TableCell, TableHeader, TableRow } from '../../../styles/table';
import { mockStudents } from '../../../mocks/student';

interface ClassGradesViewProps {
    classInfo: {
        name: string;
        trimester: number;
    };
    evaluations: Evaluation[];
    onClose: () => void;
}

const ClassGradesView: React.FC<ClassGradesViewProps> = ({ classInfo, evaluations, onClose }) => {
    // Obter todas as partes de avaliação únicas
    const allParts = evaluations.flatMap(evaluation => evaluation.parts || []);
    
    // Dados mockados - na implementação real viria da API
    const studentGrades = mockStudents.map(student => {
        const grades: Record<string, number> = {};
        allParts.forEach(part => {
            grades[part.id] = Math.random() * part.maxScore; // Nota aleatória para exemplo
        });
        return {
            student,
            grades
        };
    });

    return (
        <ModalContainer>
            <ModalContent style={{ maxWidth: '90vw', width: 'auto' }}>
                <ModalHeader>
                    <h3>Notas da Turma: {classInfo.name} - {classInfo.trimester}º Trimestre</h3>
                    <button onClick={onClose}>&times;</button>
                </ModalHeader>
                <ModalBody style={{ overflowX: 'auto' }}>
                    <Table>
                        <thead>
                            <TableRow>
                                <TableHeader>Aluno</TableHeader>
                                {allParts.map(part => (
                                    <TableHeader key={part.id}>{part.name} (Max: {part.maxScore})</TableHeader>
                                ))}
                                <TableHeader>Média</TableHeader>
                            </TableRow>
                        </thead>
                        <tbody>
                            {studentGrades.map(({ student, grades }) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    {allParts.map(part => (
                                        <TableCell key={`${student.id}-${part.id}`}>
                                            {grades[part.id]?.toFixed(1) || '-'}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        {(
                                            Object.values(grades).reduce((sum, grade) => sum + grade, 0) /
                                            allParts.length
                                        ).toFixed(1)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody>
            </ModalContent>
        </ModalContainer>
    );
};

export default ClassGradesView;