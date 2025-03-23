import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
    TableContainer,
    Table,
    Th,
    Tr,
    Td,
    Button,
    Icon,
    Select,
    CategoryContainer,
    CategoryButtonsWrapper,
    TableWrapper,
    StudentName
} from './styles';

const studentList = ['Ana Souza', 'Carlos Oliveira', 'Fernanda Lima', 'Rafael Mendes'];

const categorias = [
    {
        titulo: 'Presença',
        subcategorias: [
            { nome: 'Presença', opcoes: ['Presente', 'Ausente', 'Ausência justificada'] },
            { nome: 'Pontualidade', opcoes: ['Pontual', 'Atraso', 'Atraso justificado'] }
        ]
    },
    {
        titulo: 'Colaboração',
        subcategorias: [
            { nome: 'Ajuda colegas', opcoes: ['Não ajudou', 'Ajudou às vezes', 'Sempre ajuda'] },
            { nome: 'Trabalho em grupo', opcoes: ['Excelente', 'Limitado', 'Não colabora'] },
            { nome: 'Colaboração', opcoes: ['Baixa', 'Ocasional', 'Constante'] }
        ]
    },
    {
        titulo: 'Participação',
        subcategorias: [
            { nome: 'Atividades', opcoes: ['Ativa', 'Mínima', 'Não participou', 'Dormiu'] },
            { nome: 'Conversas', opcoes: ['Focado', 'Algumas distrações', 'Muitas distrações'] },
            { nome: 'Concentração', opcoes: ['Total', 'Parcial', 'Ausente'] },
            { nome: 'Uso de celular', opcoes: ['Não usou', 'Uso frequente', 'Uso constante'] }
        ]
    },
    {
        titulo: 'Comportamento',
        subcategorias: [
            { nome: 'Integridade', opcoes: ['Honesto', 'Plágio', 'Sem integridade'] },
            { nome: 'Conduta', opcoes: ['Adequada', 'Inadequada', 'Desrespeitosa'] },
            { nome: 'Respeito', opcoes: ['Com todos', 'Parcial', 'Ausente'] },
            { nome: 'Uniforme', opcoes: ['Completo', 'Parcial', 'Sem uniforme'] },
            { nome: 'Regras', opcoes: ['Cumpriu todas', 'Cumpriu algumas', 'Não cumpriu'] }
        ]
    },
    {
        titulo: 'Organização',
        subcategorias: [
            { nome: 'Material', opcoes: ['Completo', 'Parcial', 'Ausente'] },
            { nome: 'Calculadora', opcoes: ['Trouxe', 'Não trouxe'] }
        ]
    },
    {
        titulo: 'Caderno',
        subcategorias: [
            { nome: 'Atividades', opcoes: ['Completas', 'Incompletas'] },
            { nome: 'Organização', opcoes: ['Muito organizado', 'Organizado', 'Desorganizado'] },
            { nome: 'Tarefas', opcoes: ['Todas completas', 'Algumas completas', 'Incompletas'] }
        ]
    },
    {
        titulo: 'Responsabilidade',
        subcategorias: [
            { nome: 'Prazos', opcoes: ['No prazo', 'Atraso justificado', 'Atraso', 'Não entregou'] },
            { nome: 'Patrimônio', opcoes: ['Cuidadoso', 'Descuidado'] },
            { nome: 'Materiais', opcoes: ['Uso adequado', 'Uso inadequado'] },
            { nome: 'Laboratório', opcoes: ['Seguiu instruções', 'Dificuldades parciais', 'Não seguiu'] }
        ]
    }
];

const DailyReport = () => {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Presença');

    const handleCategoriaClick = (titulo: string) => {
        setCategoriaSelecionada((prev) => (prev === titulo ? prev : titulo));
    };

    const categoriaAtual = categorias.find((categoria) => categoria.titulo === categoriaSelecionada);

    return (
        <TableContainer>
            <CategoryContainer>
                <h2>Avaliação de Alunos</h2>
                <CategoryButtonsWrapper>
                    {categorias.map((categoria) => (
                        <Button
                            key={categoria.titulo}
                            onClick={() => handleCategoriaClick(categoria.titulo)}
                            selected={categoriaSelecionada === categoria.titulo}
                        >
                            {categoria.titulo}
                            <Icon>
                                {categoriaSelecionada === categoria.titulo ? <FaChevronUp /> : <FaChevronDown />}
                            </Icon>
                        </Button>
                    ))}
                </CategoryButtonsWrapper>
            </CategoryContainer>

            <TableWrapper>
                <Table>
                    <thead>
                        <tr>
                            <Th fixed>Aluno</Th>
                            {categoriaAtual?.subcategorias.map((sub) => (
                                <Th key={sub.nome}>{sub.nome}</Th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map((student, index) => (
                            <Tr key={index}>
                                <Td fixed>
                                    <StudentName>{student}</StudentName>
                                </Td>
                                {categoriaAtual?.subcategorias.map((sub) => (
                                    <Td key={sub.nome}>
                                        <Select aria-label={`Selecionar ${sub.nome} para ${student}`}>
                                            <option value="">Selecione</option>
                                            {sub.opcoes.map((opcao) => (
                                                <option key={opcao} value={opcao}>
                                                    {opcao}
                                                </option>
                                            ))}
                                        </Select>
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            </TableWrapper>
        </TableContainer>
    );
};

export default DailyReport;