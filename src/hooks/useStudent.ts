import { useState } from "react";
import { StudentAttendance } from "../utils/types/BasicUser";

export const useStudents = () => {
    const [studentList, setStudentList] = useState<StudentAttendance[]>([        
        { id: 1, name: 'Ana Souza', email: 'ana@exemplo.com', attendance: 90 },
        { id: 2, name: 'Carlos Oliveira', email: 'carlos@exemplo.com', attendance: 85 },
        { id: 3, name: 'Fernanda Lima', email: 'fernanda@exemplo.com', attendance: 95 },
    ]);
    const [studentEditing, setStudentEditing] = useState<StudentAttendance | null>(null);
    const [formData, setFormData] = useState<Omit<StudentAttendance, "id">>({ name: "", email: "", attendance: 0 });
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleAddStudent = () => {
        setStudentEditing(null);
        setFormData({ name: "", email: "", attendance: 0 });
        setShowForm(true);
    };

    const handleEditStudent = (student: StudentAttendance) => {
        setStudentEditing(student);
        setFormData({ name: student.name, email: student.email, attendance: student.attendance });
        setShowForm(true);
    };

    const handleDelStudent = (id: number) => {
        setStudentList(studentList.filter((student) => student.id !== id));
    };

    const handleSaveStudent = () => {
        if (studentEditing) {
            setStudentList(
                studentList.map((a) => (a.id === studentEditing.id ? { ...a, ...formData } : a))
            );
        } else {
            setStudentList([...studentList, { ...formData, id: Date.now() }]);
        }
        setShowForm(false);
    };

    const handleCancelar = () => {
        setShowForm(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
        studentEditing,
        formData,
        showForm,
        handleAddStudent,
        handleEditStudent,
        handleDelStudent,
        handleSaveStudent,
        handleCancelar,
        handleInputChange,
        calculateAttendanceGrade
    };
};
