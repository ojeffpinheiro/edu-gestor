import { useState } from "react";
import { StudentFormData } from "../../types/user/BasicUser";

/**
 * 
 * @returns { studentList, formData, handleAddStudent, handleEditStudent, handleDelStudent, handleSaveStudent, setFormData, validateForm, calculateAttendanceGrade }
 * * Hook para gerenciar a lista de alunos, permitindo adicionar, editar e remover alunos,
 * * além de validar os dados do formulário e calcular a nota de frequência.
 * * @returns { studentList } Lista de alunos cadastrados.
 * * @returns { formData } Dados do formulário atual.
 * * @returns { handleAddStudent } Função para preparar o formulário para adicionar um novo aluno.
 * * @returns { handleEditStudent } Função para preparar o formulário para editar um aluno existente.
 * * @returns { handleDelStudent } Função para remover um aluno da lista.
 * * @returns { handleSaveStudent } Função para salvar os dados do aluno (adicionar ou editar).
 * * @returns { setFormData } Função para atualizar os dados do formulário.
 * * @returns { validateForm } Função para validar os dados do formulário.
 * * @returns { calculateAttendanceGrade } Função para calcular a nota de frequência com base na porcentagem de presença.
 */
export const useStudents = () => {
    /**
     * @constant studentList
     * @description Lista de alunos cadastrados, inicializada com alguns dados de exemplo.
     * @type { StudentFormData[] }
     * * @property { id } ID do aluno.
     * * @property { name } Nome do aluno.
     * * @property { email } Email do aluno.
     * * @property { attendance } Porcentagem de presença do aluno.
     * * @property { className } Nome da turma do aluno.
     * * @property { rollNumber } Número de chamada do aluno.
     * * @property { status } Situação do aluno (Ativo, Inativo, etc.).
     * * @property {gender} Gênero do aluno (Masculino, Feminino, etc.).
     * * @property { specialNeeds } Necessidades especiais do aluno (se houver).
     */
    const [studentList, setStudentList] = useState<StudentFormData[]>([
        { id: 1, name: 'Ana Souza', email: 'ana@exemplo.com', attendance: 90, className: '9º Ano', rollNumber: 1, status: 'Ativo', gender: 'Feminino', specialNeeds: null },
        { id: 2, name: 'Carlos Oliveira', email: 'carlos@exemplo.com', attendance: 85, className: '9º Ano', rollNumber: 2, status: 'Ativo', gender: 'Masculino', specialNeeds: null },
        { id: 3, name: 'Fernanda Lima', email: 'fernanda@exemplo.com', attendance: 95, className: '9º Ano', rollNumber: 3, status: 'Ativo', gender: 'Feminino', specialNeeds: null },
    ]);

    /**
     * @constant formData
     * @description Dados do formulário atual, utilizados para adicionar ou editar um aluno.
     * * Inicializado com valores vazios ou padrão.
     * @type { StudentFormData }
     * * @property { name } Nome do aluno.
     * * @property { email } Email do aluno.
     * * @property { attendance } Porcentagem de presença do aluno.
     * * @property { birthDate } Data de nascimento do aluno.
     * * @property { className } Nome da turma do aluno.
     * * @property { rollNumber } Número de chamada do aluno.
     * * @property { status } Situação do aluno (Ativo, Inativo, etc.).
     * * @property { gender } Gênero do aluno (Masculino, Feminino, etc.).
     * * @property { specialNeeds } Necessidades especiais do aluno (se houver).
     */
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

    /**
     * @function validateForm
     * @description Função para preparar o formulário para adicionar um novo aluno ou editar um aluno existente.
     * * Valida os dados do formulário e retorna um objeto indicando se o formulário é válido e quais campos possuem erros.
     * * @property { errors } Objeto contendo mensagens de erro para cada campo inválido.
     * @param { isValid } Indica se o formulário é válido.
     * @param { errors } Objeto contendo mensagens de erro para cada campo inválido.
     
     * @returns { isValid: boolean, errors: Record<string, string> }
     * * @property { isValid } Indica se o formulário é válido.
     * * @property { errors } Objeto contendo mensagens de erro para cada campo inválido.
    */
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

    /**
     * @function handleAddStudent
     * @description Função para preparar o formulário para adicionar um novo aluno.
     * * Reseta os dados do formulário para um estado vazio, pronto para receber novos dados.
     */
    const handleAddStudent: () => void = () => {
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

    /*
     * @function handleEditStudent
     * @description Função para preparar o formulário para editar um aluno existente.
     * * Recebe os dados do aluno a ser editado e preenche o formulário com esses dados.
     * @param { student } Dados do aluno a ser editado
     */
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

    /* 
        * @function handleDelStudent
        * @description Função para remover um aluno da lista.
        * * Recebe o ID do aluno a ser removido e atualiza a lista de alunos, filtrando o aluno com o ID correspondente.
        * @param { id } ID do aluno a ser removido
        * 
    */
    const handleDelStudent = (id: number) => {
        setStudentList(studentList.filter((student) => student.id !== id));
    };

    /**
     * @function handleSaveStudent
     * @description Função para salvar os dados do aluno (adicionar ou editar).
     * * Se o aluno já possui um ID, atualiza os dados do aluno existente; caso contrário, adiciona um novo aluno com um ID gerado.
     * @property { formData } Dados do aluno a serem salvos.
     * @property { studentList } Lista de alunos atualizada após a adição ou edição.
     * * @returns { boolean } Indica se a operação de salvar foi bem-sucedida.
     * * @returns { true } Indica que a operação foi bem-sucedida.
     * @returns { false } Indica que a operação falhou (não implementado, mas pode ser adicionado no futuro).
     * @returns { void } Não retorna nada, apenas atualiza o estado do componente.
     * 
     */
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

    /**
     * @function calculateAttendanceGrade
     * @description Função para calcular a nota de frequência com base na porcentagem de presença.
     * * A nota é calculada da seguinte forma:
     * * - 90% ou mais: nota 10
     * * - 80% a 89%: nota 8
     * * - 70% a 79%: nota 7
     * * - 60% a 69%: nota 6
     * * - 50% a 59%: nota 5
     * * - Abaixo de 50%: nota proporcional (0 a 4)
     * * @param { attendance } Porcentagem de presença do aluno.
     * * @returns { number } Nota de frequência calculada.
     */
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