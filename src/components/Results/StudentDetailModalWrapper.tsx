import React from 'react'
import { StudentResult } from "../../utils/types/Assessment";
import EnhancedStudentDetailModal from "./EnhancedStudentDetailModal";

// Extrair a lógica do modal de detalhes do aluno
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