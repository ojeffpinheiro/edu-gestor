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
import { categorias, studentList } from '../../../mocks/assessmentData';

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