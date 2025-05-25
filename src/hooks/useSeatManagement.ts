import { useState, useCallback, useMemo } from 'react';
import { SeatType, PriorityType, PRIORITY_CONFIGS } from '../utils/types/Team';
import { StudentFormData } from '../utils/types/BasicUser';

interface UseSeatManagementProps {
  seats: SeatType[];
  students: StudentFormData[];
  onSeatUpdate: (seat: SeatType) => void;
  onSeatSelect: (seat: SeatType | null) => void;
}

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

  // Função para obter frequência do aluno
  const getStudentAttendance = useCallback((studentId: number): number => {
    const student = students.find(s => s.id === studentId);
    // Aqui você implementaria a lógica real de frequência
    // Por enquanto, retornando um valor simulado baseado no ID
    return student ? Math.floor(Math.random() * 100) : 0;
  }, [students]);

  // Função para obter nome do aluno
  const getStudentName = useCallback((studentId?: number): string => {
    if (!studentId) return '';
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Aluno não encontrado';
  }, [students]);

  // Função para obter informações de prioridade
  const getPriorityInfo = useCallback((priority?: PriorityType) => {
    if (!priority) return { label: '', color: '', icon: '' };
    return PRIORITY_CONFIGS[priority];
  }, []);

  // Manipuladores de eventos
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

  const updateSeat = useCallback((updatedSeat: SeatType) => {
    onSeatUpdate(updatedSeat);
  }, [onSeatUpdate]);

  const handleSeatDoubleClick = useCallback((seat: SeatType) => {
    if (editMode) {
      setSelectedSeat(seat);
      onSeatSelect(seat);
      // Aqui você poderia abrir um modal de edição
    }
  }, [editMode, onSeatSelect]);

  const handleSeatContextMenu = useCallback((seat: SeatType, event: React.MouseEvent) => {
    if (editMode) {
      // Menu de contexto para opções avançadas
      event.preventDefault();
      // Implementar menu de contexto
      console.log('Menu de contexto para assento:', seat);
    }
  }, [editMode]);

  // Função para alternar modos
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

  // Estatísticas dos assentos
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

  // Função para exportar configuração
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

  // Função para validar configuração
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

  // Função para sugerir melhorias no layout
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