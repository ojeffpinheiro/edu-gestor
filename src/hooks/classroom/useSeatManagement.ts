import { useState, useCallback, useMemo } from 'react';
import { SeatType, PriorityType, PRIORITY_CONFIGS } from '../../types/classroom/Team';
import { StudentFormData } from '../../utils/types/BasicUser';

interface UseSeatManagementProps {
  seats: SeatType[];
  students: StudentFormData[];
  onSeatUpdate: (seat: SeatType) => void;
  onSeatSelect: (seat: SeatType | null) => void;
}

/**
 * Hook para gerenciar a lógica de assentos na sala de aula.
 * Permite selecionar, editar e verificar assentos, além de fornecer estatísticas e sugestões.
 * @param {seats} Lista de assentos disponíveis na sala.
 * @param {students} Lista de alunos disponíveis.
 * @param {onSeatUpdate} Função chamada ao atualizar um assento.
 * @param {onSeatSelect} Função chamada ao selecionar um assento.
 * @returns {selectedSeat, verifyMode, editMode, showTooltips, compactView, setSelectedSeat, setShowTooltips, setCompactView,
 * updateSeat, getStudentAttendance, getStudentName, getPriorityInfo,
 * handleSeatClick, handleSeatDoubleClick, handleSeatContextMenu,
 * toggleVerifyMode, toggleEditMode,
 * seatStatistics, validateConfiguration, getSuggestions, exportConfiguration}
 * * - `selectedSeat`: Assento atualmente selecionado.
 * * - `verifyMode`: Indica se o modo de verificação está ativo.
 * * - `editMode`: Indica se o modo de edição está ativo.
 * * - `showTooltips`: Indica se as dicas de ferramenta estão visíveis.
 * * - `compactView`: Indica se a visualização compacta está ativa.
 * * - `setSelectedSeat`: Função para definir o assento selecionado.
 * * - `setShowTooltips`: Função para definir a visibilidade das dicas de ferramenta.
 * * - `setCompactView`: Função para definir a visualização compacta.
 * * - `updateSeat`: Função para atualizar um assento.
 * * - `getStudentAttendance`: Função para obter a frequência de um aluno.
 * * - `getStudentName`: Função para obter o nome de um aluno.
 * * - `getPriorityInfo`: Função para obter informações de prioridade de um assento.
 * * - `handleSeatClick`: Função chamada ao clicar em um assento, para selecionar ou editar.
 * * - `handleSeatDoubleClick`: Função chamada ao clicar duas vezes em um assento, para editar.
 * * - `handleSeatContextMenu`: Função chamada ao abrir o menu de contexto em um assento, para opções avançadas.
 * * - `toggleVerifyMode`: Função para alternar entre o modo de verificação e o modo normal.
 * * - `toggleEditMode`: Função para alternar entre o modo de edição e o modo normal.
 * * - `seatStatistics`: Estatísticas dos assentos, incluindo ocupação e frequência.
 * * - `validateConfiguration`: Função para validar a configuração atual dos assentos.
 * * - `getSuggestions`: Função para obter sugestões de melhorias no layout da sala.
 * * - `exportConfiguration`: Função para exportar a configuração atual dos assentos.
 */
export const useSeatManagement = ({
  seats,
  students,
  onSeatUpdate,
  onSeatSelect
}: UseSeatManagementProps) => {
  const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);
  const [verifyMode, setVerifyMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const [compactView, setCompactView] = useState(false);

  /**
   * @function getStudentAttendance
   * @description Função para obter a frequência de um aluno.
   * * Esta função simula a lógica de frequência, retornando um valor aleatório
   * * baseado no ID do aluno. Em uma aplicação real, você implementaria a lógica
   * * de frequência real, possivelmente consultando uma API ou banco de dados.
   * @param {studentId} ID do aluno para o qual obter a frequência.
   * @returns {number} Porcentagem de frequência do aluno.
   */
  const getStudentAttendance = useCallback((studentId: number): number => {
    if (!studentId) return 0;
    const student = students.find(s => s.id === studentId);
    return student ? (student.attendance ?? 0) : 0;
  }, [students]);

  /**
   * @function getStudentName
   * @description Função para obter o nome de um aluno baseado no ID.
   * * Esta função procura o aluno na lista de alunos e retorna o nome.
   * * Se o aluno não for encontrado, retorna uma mensagem padrão.
   * @param {studentId} ID do aluno para o qual obter o nome.
   * @return {string} Nome do aluno ou mensagem de erro se não encontrado.
   */
  const getStudentName = useCallback((studentId?: number): string => {
    if (!studentId) return '';
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Aluno não encontrado';
  }, [students]);

  /**
   * @function getPriorityInfo
   * @description Função para obter informações de prioridade de um assento.
   * * Esta função retorna um objeto com o rótulo, cor e ícone baseados no tipo de prioridade.
   * @param {priority} Tipo de prioridade do assento.
   * @return {Object} Objeto contendo o rótulo, cor e ícone da prioridade.
   * * - `label`: Rótulo descritivo da prioridade.
   * * - `color`: Cor associada à prioridade.
   * * - `icon`: Ícone representativo da prioridade.
   */
  const getPriorityInfo = useCallback((priority?: PriorityType) => {
    if (!priority) return { label: '', color: '', icon: '' };
    return PRIORITY_CONFIGS[priority];
  }, []);

  /**
   * @function handleSeatClick
   * @description Manipulador de eventos para cliques em assentos.
   * * Dependendo do modo (edição, verificação ou normal), seleciona o assento,
   * * marca como verificado ou alterna a seleção.
   * @param {seat} Assento clicado.
   * @returns {void}
   * * - No modo edição, seleciona o assento para editar.
   * * - No modo verificação, marca o assento como verificado.
   * * - No modo normal, alterna a seleção do assento.
   */
  const handleSeatClick = useCallback((seat: SeatType) => {
    if (editMode) {
      // No modo edição, seleciona o assento para editar
      setSelectedSeat(seat);
      onSeatSelect(seat);
    } else if (verifyMode) {
      // No modo verificação, marca como verificado
      setSelectedSeat(seat);
      onSeatSelect(seat);
    } else {
      // Modo normal, apenas seleciona
      setSelectedSeat(selectedSeat?.id === seat.id ? null : seat);
      onSeatSelect(selectedSeat?.id === seat.id ? null : seat);
    }
  }, [editMode, verifyMode, selectedSeat, onSeatSelect]);

  /**
   * @function updateSeat
   * @description Função para atualizar um assento.
   * * Esta função é chamada quando um assento é modificado, seja por edição ou verificação.
   * @param {updatedSeat} Assento atualizado com as novas informações.
   * @returns {void}
   * * - Chama a função `onSeatUpdate` para aplicar as mudanças no assento.
   * */
  const updateSeat = useCallback((updatedSeat: SeatType) => {
    onSeatUpdate(updatedSeat);
  }, [onSeatUpdate]);

  /**
   * @function handleSeatDoubleClick
   * @description Manipulador de eventos para cliques duplos em assentos.
   * * * No modo edição, seleciona o assento para edição.
   * * @param {seat} Assento clicado duas vezes.
   * @returns {void}
   * * - Se o modo de edição estiver ativo, seleciona o assento e chama `onSeatSelect`.
   * */
  const handleSeatDoubleClick = useCallback((seat: SeatType) => {
    if (editMode) {
      setSelectedSeat(seat);
      onSeatSelect(seat);
      // Aqui você poderia abrir um modal de edição
    }
  }, [editMode, onSeatSelect]);

  /**
   * @function handleSeatContextMenu
   * @description Manipulador de eventos para o menu de contexto em assentos.
   * * * No modo de edição, permite opções avançadas como mover assentos ou alterar prioridades.
   * @param {seat} Assento clicado com o botão direito.
   * @param {event} Evento do mouse para o menu de contexto.
   * * @returns {void}
   * * - Se o modo de edição estiver ativo, previne o comportamento padrão e exibe um menu de contexto.
   * */
  const handleSeatContextMenu = useCallback((seat: SeatType, event: React.MouseEvent) => {
    if (editMode) {
      // Menu de contexto para opções avançadas
      event.preventDefault();
      // Implementar menu de contexto
      console.log('Menu de contexto para assento:', seat);
    }
  }, [editMode]);

  /**
   * @function toggleVerifyMode
   * @description Alterna entre o modo de verificação e o modo normal.
   * * No modo de verificação, os assentos podem ser marcados como verificados.
   * @returns {void}
   * * - Se o modo de verificação estiver ativo, desativa-o e limpa a seleção.
   * * - Se o modo de verificação estiver inativo, ativa-o e limpa a seleção.
   */
  const toggleVerifyMode = useCallback(() => {
    setVerifyMode(prev => {
      if (prev) {
        setSelectedSeat(null);
        onSeatSelect(null);
      }
      return !prev;
    });
    setEditMode(false);
  }, [onSeatSelect]);

  /** 
   * @function toggleEditMode
   * @description Alterna entre o modo de edição e o modo normal.
   * * No modo de edição, os assentos podem ser modificados.
   * * @returns {void}
   * * - Se o modo de edição estiver ativo, desativa-o e limpa a seleção.
   * * - Se o modo de edição estiver inativo, ativa-o e limpa a seleção.
   * */
  const toggleEditMode = useCallback(() => {
    setEditMode(prev => {
      if (prev) {
        setSelectedSeat(null);
        onSeatSelect(null);
      }
      return !prev;
    });
    setVerifyMode(false);
  }, [onSeatSelect]);

  /**
   * @function seatStatistics
   * @description Calcula estatísticas dos assentos, incluindo ocupação, frequência e prioridades.
   * * @returns {Object} Objeto com as estatísticas dos assentos.
   * * - `totalSeats`: Total de assentos na sala.
   * * - `occupiedSeats`: Total de assentos ocupados.
   * * - `emptySeats`: Total de assentos vazios.
   * * - `prioritySeats`: Total de assentos prioritários.
   * * - `attendanceStats`: Estatísticas de frequência dos alunos.
   * * - `occupationRate`: Taxa de ocupação dos assentos.
   * * - `totalSeats`: Número total de assentos.
   * * - `occupiedSeats`: Número de assentos ocupados.
   */
  const seatStatistics = useMemo(() => {
    const totalSeats = seats.length;
    const occupiedSeats = seats.filter(seat => seat.studentId).length;
    const emptySeats = totalSeats - occupiedSeats;

    const prioritySeats = seats.filter(seat => seat.priority).length;

    const attendanceStats = seats
      .filter(seat => seat.studentId)
      .map(seat => getStudentAttendance(seat.studentId!))
      .reduce(
        (acc, attendance) => {
          if (attendance >= 90) acc.excellent++;
          else if (attendance >= 75) acc.good++;
          else if (attendance >= 60) acc.warning++;
          else acc.critical++;
          return acc;
        },
        { excellent: 0, good: 0, warning: 0, critical: 0 }
      );

    return {
      totalSeats,
      occupiedSeats,
      emptySeats,
      prioritySeats,
      attendanceStats,
      occupationRate: (occupiedSeats / totalSeats) * 100
    };
  }, [seats, getStudentAttendance]);

  /**
   * @function exportConfiguration
   * @description Exporta a configuração atual dos assentos para um arquivo JSON.
   * * Inclui informações sobre os assentos, estatísticas e data de exportação.
   * * @returns {void}
   * * - Cria um arquivo JSON com a configuração atual e inicia o download.
   * * - O arquivo contém os IDs dos assentos, posições, IDs dos alunos, nomes, prioridades e frequência.
   * * - O nome do arquivo é baseado na data atual.
   */
  const exportConfiguration = useCallback(() => {
    const config = {
      seats: seats.map(seat => ({
        id: seat.id,
        position: seat.position,
        studentId: seat.studentId,
        studentName: seat.studentId ? getStudentName(seat.studentId) : null,
        priority: seat.priority,
        attendance: seat.studentId ? getStudentAttendance(seat.studentId) : null
      })),
      statistics: seatStatistics,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `classroom-layout-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [seats, getStudentName, getStudentAttendance, seatStatistics]);

  /**
   * @function validateConfiguration
   * @description Valida a configuração atual dos assentos.
   * * Verifica se há assentos duplicados, assentos prioritários sem estudantes e alunos com baixa frequência.
   * * @returns {Object} Objeto contendo o status da validação e uma lista de problemas encontrados.
   * * - `isValid`: Indica se a configuração é válida (true) ou não (false).
   * * - `issues`: Lista de problemas encontrados na configuração.
   * * - Se não houver problemas, `issues` será um array vazio.
   */
  const validateConfiguration = useCallback(() => {
    const issues: string[] = [];

    // Verificar assentos duplicados
    const studentIds = seats
      .filter(seat => seat.studentId)
      .map(seat => seat.studentId);
    const duplicates = studentIds.filter((id, index) =>
      studentIds.indexOf(id) !== index
    );

    if (duplicates.length > 0) {
      issues.push(`Alunos duplicados encontrados: ${duplicates.join(', ')}`);
    }

    // Verificar assentos prioritários sem estudantes
    const emptyPrioritySeats = seats.filter(seat =>
      seat.priority && !seat.studentId
    );

    if (emptyPrioritySeats.length > 0) {
      issues.push(`${emptyPrioritySeats.length} assento(s) prioritário(s) vazio(s)`);
    }

    // Verificar baixa frequência em assentos prioritários
    const lowAttendancePriority = seats
      .filter(seat => seat.priority && seat.studentId)
      .filter(seat => getStudentAttendance(seat.studentId!) < 60);

    if (lowAttendancePriority.length > 0) {
      issues.push(`${lowAttendancePriority.length} aluno(s) prioritário(s) com baixa frequência`);
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }, [seats, getStudentAttendance]);

  /**
   * @function getSuggestions
   * @description Gera sugestões de melhorias no layout da sala com base nas estatísticas dos assentos.
   * * Analisa a distribuição de alunos, frequência e ocupação para fornecer recomendações.
   * * @returns {string[]} Lista de sugestões para melhorar o layout da sala.
   * * - Sugestões podem incluir mover alunos com baixa visão, melhorar a distribuição de frequência ou aumentar a ocupação.
   * * - As sugestões são baseadas em regras simples, mas podem ser expandidas conforme necessário.
   * * - As sugestões são retornadas como um array de strings.
   */
  const getSuggestions = useCallback(() => {
    const suggestions: string[] = [];

    // Sugestão para alunos com baixa visão
    const lowVisionSeats = seats.filter(seat =>
      seat.priority === 'low_vision' && seat.studentId
    );
    
    const lowVisionInBack = lowVisionSeats.filter(seat =>
      seat.position.row > 2
    );

    if (lowVisionInBack.length > 0) {
      suggestions.push('Considere mover alunos com baixa visão para as primeiras fileiras');
    }

    // Sugestão para distribuição de frequência
    const { attendanceStats } = seatStatistics;
    if (attendanceStats.critical > attendanceStats.excellent) {
      suggestions.push('Alta concentração de alunos com frequência crítica. Considere estratégias de engajamento');
    }

    // Sugestão para ocupação
    if (seatStatistics.occupationRate < 70) {
      suggestions.push('Taxa de ocupação baixa. Considere redistribuir os alunos para melhor aproveitamento do espaço');
    }

    return suggestions;
  }, [seats, seatStatistics]);

  return {
    // Estados
    selectedSeat,
    verifyMode,
    editMode,
    showTooltips,
    compactView,

    // Setters
    setSelectedSeat,
    setShowTooltips,
    setCompactView,

    // Funções utilitárias
    updateSeat,
    getStudentAttendance,
    getStudentName,
    getPriorityInfo,

    // Manipuladores de eventos
    handleSeatClick,
    handleSeatDoubleClick,
    handleSeatContextMenu,

    // Controles de modo
    toggleVerifyMode,
    toggleEditMode,

    // Dados e análises
    seatStatistics,
    validateConfiguration,
    getSuggestions,
    exportConfiguration
  };
};