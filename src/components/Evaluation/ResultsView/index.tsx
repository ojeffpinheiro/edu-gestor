import React, { useState } from 'react'
import { Evaluation } from '../../../types/evaluation/AssessmentEvaluation';
import { Section, SectionHeader } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { FilterContainer } from '../../../pages/Planning/DidacticSequencesPage/styled';
import { FilterSelect } from '../../../pages/Planning/DigitalNotebook/styles';
import { Table, TableCell, TableHeader, TableRow } from '../../../styles/table';
import { mockStudents } from '../../../mocks/student';
import StudentGradesModal from '../StudentGradesModal';

const ResultsView: React.FC<{ evaluations: Evaluation[] }> = ({ evaluations }) => {
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedStudent, setSelectedStudent] = useState<{ id: number; name: string } | null>(null);
    
    // Group evaluations by class
    const classes = Array.from(new Set(evaluations.map(e => e.series)));
    
    return (
        <Section>
            <SectionHeader>
                <SectionTitle>Resultado Final</SectionTitle>
                <FilterContainer>
                    <FilterSelect 
                        value={selectedClass} 
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="">Selecione uma turma</option>
                        {classes.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </FilterSelect>
                </FilterContainer>
            </SectionHeader>
            
            {selectedClass && (
                <div>
                    <h3>Alunos da {selectedClass}</h3>
                    <Table>
                        <thead>
                            <TableRow>
                                <TableHeader>Aluno</TableHeader>
                                <TableHeader>1º Tri</TableHeader>
                                <TableHeader>2º Tri</TableHeader>
                                <TableHeader>3º Tri</TableHeader>
                                <TableHeader>Final</TableHeader>
                            </TableRow>
                        </thead>
                        <tbody>
                            {mockStudents.map(student => (
                                <TableRow key={student.id} onClick={() => setSelectedStudent(student)}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>8.5</TableCell>
                                    <TableCell>7.2</TableCell>
                                    <TableCell>9.0</TableCell>
                                    <TableCell>8.2</TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
            
            {selectedStudent && (
                <StudentGradesModal
                    student={selectedStudent}
                    evaluations={evaluations}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </Section>
    );
};

export default ResultsView;