import React, { useState, useCallback, useEffect } from 'react';
import { 
  FaUserCheck,
  FaHandsHelping, 
  FaBalanceScale, 
  FaClipboardCheck, 
  FaBookOpen,
  FaComments,
  FaSchool
} from 'react-icons/fa';

import { categorias, studentList } from '../../../mocks/assessmentData';

import { ErrorBoundary } from '../../../components/ui/ErrorBoundary';

import { Table, TableHeader, TableRow, Td } from '../../../styles/table';

import {
  TableContainer,
  StatusMessage,
  TableWrapper,
  StudentName,
  MainContainer,
  AssessmentHeader,
  CategoryCardContainer,
  CategoryCard,
  CategoryIcon,
  CardTitle,
  SelectField,
  SaveButton,
  EmptyStateMessage
} from './styles';


/**
 * Interface para as opções das subcategorias
 */
interface SubCategoria {
  nome: string;
  opcoes: string[];
}

/**
 * Interface para as categorias de avaliação
 */
interface Categoria {
  titulo: string;
  icone: React.ReactNode;
  descricao: string;
  subcategorias: SubCategoria[];
}

/**
 * Interface para armazenar as avaliações dos alunos
 */
interface StudentAssessments {
  [studentName: string]: {
    [category: string]: {
      [subcategory: string]: string;
    };
  };
}

/**
 * Componente principal para o Relatório Diário de Avaliação dos Alunos
 * Permite que professores avaliem os alunos em diferentes categorias
 */
const DailyReport: React.FC = () => {
  // Estado para armazenar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState<string>('Presença');
  
  // Estado para armazenar as avaliações dos alunos
  const [assessments, setAssessments] = useState<StudentAssessments>({});
  
  // Estado para feedback ao usuário
  const [statusMessage, setStatusMessage] = useState<{type: 'success' | 'error' | 'info' | null; message: string}>({
    type: null,
    message: ''
  });
  
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Mapeamento de ícones para cada categoria
   */
  const categoryIcons: Record<string, React.ReactNode> = {
    'Presença': <FaUserCheck />,
    'Colaboração': <FaHandsHelping />,
    'Participação': <FaComments />,
    'Comportamento': <FaBalanceScale />,
    'Organização': <FaClipboardCheck />,
    'Caderno': <FaBookOpen />,
    'Responsabilidade': <FaSchool />
  };

  // Adicionar ícones às categorias
  const categoriasComIcones: Categoria[] = categorias.map(categoria => ({
    ...categoria,
    icone: categoryIcons[categoria.titulo] || <FaUserCheck />,
    descricao: getDescricaoCategoria(categoria.titulo)
  }));

  /**
   * Obtém a descrição para cada categoria
   */
  function getDescricaoCategoria(titulo: string): string {
    switch (titulo) {
      case 'Presença':
        return 'Registro da presença e pontualidade dos alunos';
      case 'Participação':
        return 'Avaliação da participação e engajamento nas aulas';
      case 'Atividades':
        return 'Registro das atividades e tarefas realizadas';
      case 'Comportamento':
        return 'Avaliação do comportamento e atitude em sala';
      case 'Observações':
        return 'Notas adicionais e observações importantes';
      default:
        return 'Informações sobre a categoria';
    }
  }

  /**
   * Manipula a mudança de categoria selecionada
   */
  const handleCategoryClick = useCallback((titulo: string) => {
    setSelectedCategory(titulo);
  }, []);

  /**
   * Manipula a mudança de valor de uma avaliação
   */
  const handleAssessmentChange = useCallback((student: string, subcategory: string, value: string) => {
    setAssessments(prev => {
      const newAssessments = { ...prev };
      
      // Inicializar objetos aninhados se não existirem
      if (!newAssessments[student]) {
        newAssessments[student] = {};
      }
      
      if (!newAssessments[student][selectedCategory]) {
        newAssessments[student][selectedCategory] = {};
      }
      
      // Atualizar o valor
      newAssessments[student][selectedCategory][subcategory] = value;
      
      return newAssessments;
    });
  }, [selectedCategory]);

  /**
   * Salva as avaliações (simulação)
   */
  const handleSaveAssessments = useCallback(async () => {
    try {
      setIsLoading(true);
      setStatusMessage({ type: 'info', message: 'Salvando avaliações...' });
      
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatusMessage({ type: 'success', message: 'Avaliações salvas com sucesso!' });
      
      // Limpar mensagem após alguns segundos
      setTimeout(() => {
        setStatusMessage({ type: null, message: '' });
      }, 3000);
    } catch (error) {
      console.error('Erro ao salvar avaliações:', error);
      setStatusMessage({ 
        type: 'error', 
        message: 'Erro ao salvar as avaliações. Por favor, tente novamente.' 
      });
    } finally {
      setIsLoading(false);
    }
  }, [assessments]);

  // Obter a categoria atual baseada na seleção
  const currentCategory = categoriasComIcones.find((categoria) => categoria.titulo === selectedCategory);

  // Efeito para carregar avaliações salvas (simulação)
  useEffect(() => {
    const loadSavedAssessments = async () => {
      try {
        setIsLoading(true);
        // Simular carregamento de dados
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Aqui você normalmente carregaria dados de uma API
        // Por enquanto vamos usar dados fictícios
        const savedAssessments: StudentAssessments = {};
        studentList.forEach(student => {
          savedAssessments[student] = {};
          categorias.forEach(categoria => {
            savedAssessments[student][categoria.titulo] = {};
          });
        });
        
        setAssessments(savedAssessments);
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        setStatusMessage({
          type: 'error',
          message: 'Não foi possível carregar as avaliações salvas.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedAssessments();
  }, []);

  // Obter o valor atual da avaliação para um aluno e subcategoria
  const getAssessmentValue = useCallback((student: string, subcategory: string): string => {
    if (
      assessments[student] && 
      assessments[student][selectedCategory] && 
      assessments[student][selectedCategory][subcategory]
    ) {
      return assessments[student][selectedCategory][subcategory];
    }
    return '';
  }, [assessments, selectedCategory]);

  return (
    <ErrorBoundary fallback={<EmptyStateMessage>Ocorreu um erro ao carregar o relatório. Por favor, recarregue a página.</EmptyStateMessage>}>
      <MainContainer>
        <AssessmentHeader>
          <h1>Avaliação Diária de Alunos</h1>
          <p>Selecione uma categoria abaixo para avaliar os alunos</p>
        </AssessmentHeader>

        {statusMessage.type && (
          <StatusMessage type={statusMessage.type}>{statusMessage.message}</StatusMessage>
        )}

        <CategoryCardContainer>
          {categoriasComIcones.map((categoria) => (
            <CategoryCard
              key={categoria.titulo}
              onClick={() => handleCategoryClick(categoria.titulo)}
              selected={selectedCategory === categoria.titulo}
              aria-label={`Selecionar categoria ${categoria.titulo}`}
            >
              <CategoryIcon>{categoria.icone}</CategoryIcon>
              <CardTitle>{categoria.titulo}</CardTitle>
              <p>{categoria.descricao}</p>
            </CategoryCard>
          ))}
        </CategoryCardContainer>

        <TableContainer>
          {currentCategory && (
            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Aluno</TableHeader>
                    {currentCategory.subcategorias.map((sub) => (
                      <TableHeader key={sub.nome}>{sub.nome}</TableHeader>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <TableRow>
                      <Td colSpan={currentCategory.subcategorias.length + 1}>
                        <EmptyStateMessage>Carregando dados...</EmptyStateMessage>
                      </Td>
                    </TableRow>
                  ) : studentList.length === 0 ? (
                    <TableRow>
                      <Td colSpan={currentCategory.subcategorias.length + 1}>
                        <EmptyStateMessage>Nenhum aluno encontrado</EmptyStateMessage>
                      </Td>
                    </TableRow>
                  ) : (
                    studentList.map((student, index) => (
                      <TableRow key={`${student}-${index}`}>
                        <Td>
                          <StudentName>{student}</StudentName>
                        </Td>
                        {currentCategory.subcategorias.map((sub) => (
                          <Td key={`${student}-${sub.nome}`}>
                            <SelectField
                              value={getAssessmentValue(student, sub.nome)}
                              onChange={(e) => handleAssessmentChange(student, sub.nome, e.target.value)}
                              aria-label={`Selecionar ${sub.nome} para ${student}`}
                              disabled={isLoading}
                            >
                              <option value="">Selecione</option>
                              {sub.opcoes.map((opcao) => (
                                <option key={`${student}-${sub.nome}-${opcao}`} value={opcao}>
                                  {opcao}
                                </option>
                              ))}
                            </SelectField>
                          </Td>
                        ))}
                      </TableRow>
                    ))
                  )}
                </tbody>
              </Table>
            </TableWrapper>
          )}

          <SaveButton 
            onClick={handleSaveAssessments} 
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Salvando...' : 'Salvar Avaliações'}
          </SaveButton>
        </TableContainer>
      </MainContainer>
    </ErrorBoundary>
  );
};

export default DailyReport;