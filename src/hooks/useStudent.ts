import { useState } from "react";
import { StudentFormData } from "../utils/types/BasicUser";

export const useStudents = () => {
    const [studentList, setStudentList] = useState<StudentFormData[]>([
        { id: 1, name: 'Ana Souza', email: 'ana@exemplo.com', attendance: 90, className: '9º Ano', rollNumber: 1, status: 'Ativo', gender: 'Feminino', specialNeeds: null },
        { id: 2, name: 'Carlos Oliveira', email: 'carlos@exemplo.com', attendance: 85, className: '9º Ano', rollNumber: 2, status: 'Ativo', gender: 'Masculino', specialNeeds: null },
        { id: 3, name: 'Fernanda Lima', email: 'fernanda@exemplo.com', attendance: 95, className: '9º Ano', rollNumber: 3, status: 'Ativo', gender: 'Feminino', specialNeeds: null },
    ]);

    const [formData, setFormData] = useState<StudentFormData>({
        name: "",
        email: "",
        attendance: 0,
        birthDate: "",
        className: "",
        rollNumber: 0,
        status: "Ativo",
        gender: "",
        specialNeeds: null
    });

    // Função de validação do formulário
    const validateForm = (): { isValid: boolean; errors: Record<string, string> } => {
        const errors: Record<string, string> = {};
        let isValid = true;

        // Validação do nome
        if (!formData.name || formData.name.trim() === "") {
            errors.name = "O nome é obrigatório";
            isValid = false;
        }

        // Validação do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.email = "Email inválido";
            isValid = false;
        }

        // Validação da turma
        if (!formData.className || formData.className.trim() === "") {
            errors.className = "A turma é obrigatória";
            isValid = false;
        }

        // Validação do número de chamada
        if (!formData.rollNumber || formData.rollNumber < 1) {
            errors.rollNumber = "O número de chamada deve ser maior que zero";
            isValid = false;
        }

        // Validação do status
        if (!formData.status) {
            errors.status = "A situação é obrigatória";
            isValid = false;
        }

        // Validação do gênero
        if (!formData.gender) {
            errors.gender = "O sexo é obrigatório";
            isValid = false;
        }

        return { isValid, errors };
    };

    // Function to add a new student (simplified - no longer just prepares form)
    const handleAddStudent = () => {
        // Reset the form to empty state for a new student
        setFormData({
            name: "",
            email: "",
            attendance: 0,
            birthDate: "",
            className: "",
            rollNumber: 0,
            status: "Ativo",
            gender: "",
            specialNeeds: null
        });
    };

    // Function to prepare form data for editing a student
    const handleEditStudent = (student: StudentFormData) => {
        // Set current form data to the student being edited
        setFormData({
            id: student.id, // Important to include ID for update logic
            name: student.name,
            email: student.email,
            attendance: student.attendance,
            birthDate: student.birthDate || "",
            className: student.className || "",
            rollNumber: student.rollNumber || 0,
            status: student.status || "Ativo",
            gender: student.gender || "",
            specialNeeds: student.specialNeeds || null
        });
    };

    // Function to delete a student
    const handleDelStudent = (id: number) => {
        setStudentList(studentList.filter((student) => student.id !== id));
    };

    // Function to save current form data (add new or update existing)
    const handleSaveStudent = () => {
        if (formData.id) {
            // Editing existing student
            setStudentList(
                studentList.map((student) => 
                    student.id === formData.id ? { ...formData } : student
                )
            );
        } else {
            // Adding new student
            setStudentList([
                ...studentList, 
                { ...formData, id: Date.now() } // Generate unique ID
            ]);
        }
        
        // Reset form after save
        handleAddStudent();
        
        return true; // Indicate success
    };

    const calculateAttendanceGrade = (attendance: number): number => {
        if (attendance >= 90) return 10;
        if (attendance >= 80) return 8;
        if (attendance >= 70) return 7;
        if (attendance >= 60) return 6;
        if (attendance >= 50) return 5;
        return Math.max(0, Math.floor(attendance / 10));
    };

    return {
        studentList,
        formData,
        handleAddStudent,
        handleEditStudent,
        handleDelStudent,
        handleSaveStudent,
        setFormData,
        validateForm,
        calculateAttendanceGrade
    };
};