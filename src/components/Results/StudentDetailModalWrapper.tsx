import React from 'react'
import { StudentResult } from "../../utils/types/Assessment";
import EnhancedStudentDetailModal from "./EnhancedStudentDetailModal";
/**
 * Wrapper para o modal de detalhes do aluno que gerencia a renderização condicional.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {StudentResult | null} props.student - Dados do aluno ou null se não houver seleção
 * @param {Function} props.onClose - Função para fechar o modal
 * @returns {JSX.Element | null} Modal de detalhes ou null se não houver aluno selecionado
 * 
 * @example
 * <StudentDetailModalWrapper
 *   student={selectedStudent}
 *   onClose={() => setSelectedStudent(null)}
 * />
 */
const StudentDetailModalWrapper = ({
    student,
    onClose
}: {
    student: StudentResult | null;
    onClose: () => void;
}) => (
    student && (
        <EnhancedStudentDetailModal
            student={student}
            onClose={onClose}
        />
    )
);

export default StudentDetailModalWrapper;