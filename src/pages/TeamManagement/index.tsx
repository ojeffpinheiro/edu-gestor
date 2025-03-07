import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';

import { 
    PageContainer,
    TableContainer, 
    Table, 
    Th, 
    Tr, 
    Td, 
    Button,
    IconButton, 
    Icon,
    FormContainer,
    Input,
    FormActions,
    EmptyState,
    Title
} from './styles';

interface Aluno {
    id: number;
    nome: string;
    email: string;
}

const TeamManagement: React.FC = () => {
    const [alunos, setAlunos] = useState<Aluno[]>([
        { id: 1, nome: 'Ana Souza', email: 'ana@exemplo.com' },
        { id: 2, nome: 'Carlos Oliveira', email: 'carlos@exemplo.com' },
        { id: 3, nome: 'Fernanda Lima', email: 'fernanda@exemplo.com' },
    ]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [alunoEditando, setAlunoEditando] = useState<Aluno | null>(null);
    const [formData, setFormData] = useState<Omit<Aluno, 'id'>>({ nome: '', email: '' });

    const handleAdicionarAluno = () => {
        setAlunoEditando(null);
        setFormData({ nome: '', email: '' });
        setShowForm(true);
    };

    const handleEditarAluno = (aluno: Aluno) => {
        setAlunoEditando(aluno);
        setFormData({ nome: aluno.nome, email: aluno.email });
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

    return (
        <PageContainer>
            <Title>Gerenciamento de Alunos</Title>
            
            <Button 
                variant="primary" 
                onClick={handleAdicionarAluno}
            >
                <Icon><FaUserPlus /></Icon> Adicionar Aluno
            </Button>
            
            {showForm && (
                <FormContainer>
                    <Input 
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Nome do aluno"
                    />
                    <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email do aluno"
                    />
                    <FormActions>
                        <Button onClick={handleSalvarAluno} variant="primary">
                            <Icon><FaSave /></Icon> Salvar
                        </Button>
                        <Button onClick={handleCancelar} variant="secondary">
                            <Icon><FaTimes /></Icon> Cancelar
                        </Button>
                    </FormActions>
                </FormContainer>
            )}

            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <Th>Nome</Th>
                            <Th>Email</Th>
                            <Th>Ações</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.length > 0 ? (
                            alunos.map((aluno) => (
                                <Tr key={aluno.id}>
                                    <Td>{aluno.nome}</Td>
                                    <Td>{aluno.email}</Td>
                                    <Td>
                                        <IconButton onClick={() => handleEditarAluno(aluno)} variant="info">
                                            <FaEdit />
                                        </IconButton>
                                        <IconButton onClick={() => handleExcluirAluno(aluno.id)} variant="error">
                                            <FaTrashAlt />
                                        </IconButton>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>
                                    <EmptyState>
                                        Nenhum aluno cadastrado. Clique em "Adicionar Aluno" para começar.
                                    </EmptyState>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </TableContainer>
        </PageContainer>
    );
};

export default TeamManagement;