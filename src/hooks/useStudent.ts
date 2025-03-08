import { useState } from "react";
import { Student } from '../utils/types'

export const useStudents = () => {
    const [alunos, setAlunos] = useState<Student[]>([        
        { id: 1, name: "Ana Souza", email: "ana@exemplo.com" },
        { id: 2, name: "Carlos Oliveira", email: "carlos@exemplo.com" },
        { id: 3, name: "Fernanda Lima", email: "fernanda@exemplo.com" },
    ]);
    const [alunoEditando, setAlunoEditando] = useState<Student | null>(null);
    const [formData, setFormData] = useState<Omit<Student, "id">>({ name: "", email: "" });
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleAdicionarAluno = () => {
        setAlunoEditando(null);
        setFormData({ name: "", email: "" });
        setShowForm(true);
    };

    const handleEditarAluno = (aluno: Student) => {
        setAlunoEditando(aluno);
        setFormData({ name: aluno.name, email: aluno.email });
        setShowForm(true);
    };

    const handleExcluirAluno = (id: number) => {
        setAlunos(alunos.filter((aluno) => aluno.id !== id));
    };

    const handleSalvarAluno = () => {
        if (alunoEditando) {
            setAlunos(
                alunos.map((a) => (a.id === alunoEditando.id ? { ...a, ...formData } : a))
            );
        } else {
            setAlunos([...alunos, { ...formData, id: Date.now() }]);
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

    return {
        alunos,
        alunoEditando,
        formData,
        showForm,
        handleAdicionarAluno,
        handleEditarAluno,
        handleExcluirAluno,
        handleSalvarAluno,
        handleCancelar,
        handleInputChange,
    };
};
