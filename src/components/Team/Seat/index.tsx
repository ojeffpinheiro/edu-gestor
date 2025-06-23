import React, { useCallback, useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';

import { StudentFormData } from '../../../utils/types/BasicUser';
import { SeatType, PriorityType, SeatStatus, PRIORITY_CONFIGS, PriorityConfig, PriorityInfo } from "../../../utils/types/Team";
import { AttendanceIndicator, EmptySeatLabel, InteractionOverlay, SeatContainer, SeatTooltip, StudentName, } from './styles';

interface SeatProps {
  seat: SeatType;
  studentList: StudentFormData[];
  selectedSeat: SeatType | null;
  verifyMode: boolean;
  editMode?: boolean;
  showTooltips?: boolean;
  compactView?: boolean;
  isHighlighted?: boolean;
  isInvalid?: boolean;
  getStudentAttendance: (id: number) => number;
  getAttendanceColor: (attendance: number) => string;
  getStudentName: (studentId?: number) => string;
  getPriorityInfo: (priority?: PriorityType) => PriorityConfig | PriorityInfo
  onClick: () => void;
  onDoubleClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  conferenceMode?: boolean;
  isChecked?: boolean;
  isMismatched?: boolean;
  onVerify?: (isCorrect: boolean) => void;
}

/**
 * Componente que renderiza um assento na visualização de layout da sala
 * @param {SeatType} seat - Dados do assento
 * @param {StudentFormData[]} studentList - Lista de alunos disponíveis
 * @param {SeatType | null} selectedSeat - Assento atualmente selecionado
 * @param {boolean} verifyMode - Modo de verificação
 * @param {boolean} editMode - Modo de edição do assento
 * @param {boolean} showTooltips - Exibir tooltips informativos
 * @param {boolean} compactView - Exibir visualização compacta
 * @param {boolean} isHighlighted - Indica se o assento está destacado
 * @param {boolean} isInvalid - Indica se o assento é inválido
 * @param {function} getStudentAttendance - Função para obter a frequência do aluno
 * @param {function} getAttendanceColor - Função para obter a cor da frequência
 * @param {function} getStudentName - Função para obter o nome do aluno
 * @param {function} getPriorityInfo - Função para obter informações de prioridade do assento
 * @param {function} onClick - Função chamada ao clicar no assento
 * @param {function} onDoubleClick - Função chamada ao clicar duas vezes no assento
 * @param {function} onContextMenu - Função chamada ao abrir o menu de contexto no assento
 * @param {boolean} conferenceMode - Modo de conferência
 * @param {boolean} isChecked - Indica se o assento foi verificado
 * @param {boolean} isMismatched - Indica se há discrepâncias no assento
 * @param {function} onVerify - Função chamada para verificar o assento
 * @returns {JSX.Element} Componente de assento 

*/
const Seat: React.FC<SeatProps> = ({
  seat,
  studentList,
  selectedSeat,
  verifyMode,
  editMode = false,
  showTooltips = true,
  compactView = false,
  isHighlighted = false,
  isInvalid = false,
  getStudentAttendance,
  getAttendanceColor,
  getStudentName,
  getPriorityInfo,
  onClick,
  onDoubleClick,
  onContextMenu,
  conferenceMode = false,
  isChecked = false,
  isMismatched = false,
  onVerify,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoized computations
  const student = useMemo(() =>
    studentList.find(s => s.id === seat.studentId),
    [studentList, seat.studentId]
  );

  const attendance = useMemo(() =>
    student?.id ? getStudentAttendance(student.id) : 0,
    [student?.id, getStudentAttendance]
  );

  const attendanceColor = useMemo(() =>
    student?.id ? getAttendanceColor(attendance) : undefined,
    [student?.id, attendance, getAttendanceColor]
  );

  const priorityInfo = useMemo(() =>
    seat.priority ? PRIORITY_CONFIGS[seat.priority] : null,
    [seat.priority]
  );

  const seatStatus = useMemo((): SeatStatus => {
    if (!seat.studentId) return 'empty';
    if (attendance >= 90) return 'excellent';
    if (attendance >= 75) return 'good';
    if (attendance >= 60) return 'warning';
    return 'critical';
  }, [seat.studentId, attendance]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  }, [onClick]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDoubleClick?.();
  }, [onDoubleClick]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onContextMenu?.(e);
  }, [onContextMenu]);

  // Informações para tooltip
  const getTooltipContent = () => {
    if (!seat.studentId) {
      return editMode ? 'Clique para adicionar aluno' : 'Assento vazio';
    }

    const studentName = getStudentName(seat.studentId);
    const priorityText = priorityInfo ? priorityInfo.label : '';

    return (
      <div>
        <strong>{studentName}</strong>
        <br />
        Frequência: {attendance}%
        {priorityText && priorityInfo?.icon && (
          <>
            <br />
            <span style={{ color: priorityInfo?.color }}>
              {React.createElement(priorityInfo.icon, { size: 14 })}
              {' '}
              {priorityText}
            </span>
          </>
        )}
        {verifyMode && selectedSeat?.id === seat.id && (
          <div className="verification-badge">
            <FiCheck size={16} />
          </div>
        )}
      </div>
    );
  };

  const renderPriorityIcon = () => {
    if (!seat.priority) return null;

    const config = PRIORITY_CONFIGS[seat.priority];
    const IconComponent = config.icon;
    return <IconComponent size={20} color={config.color} />;
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SeatContainer
        $hasStudent={!!seat.studentId}
        $isSelected={selectedSeat?.id === seat.id}

        $isHighlighted={isHighlighted}
        $isInvalid={isInvalid}
        attendanceColor={attendanceColor}
        $priority={seat.priority ?? undefined}
        $compactView={compactView}
        $verifyMode={verifyMode}
        $editMode={editMode}
        onClick={handleClick}
        onDoubleClick={onDoubleClick ? handleDoubleClick : undefined}
        onContextMenu={onContextMenu ? handleContextMenu : undefined}
        $conferenceMode={conferenceMode}
        $isChecked={isChecked}
        $isMismatched={isMismatched}

        aria-label={`Assento ${seat.position.row}-${seat.position.column}`}
        aria-describedby={`tooltip-${seat.id}`} >
        {/* Indicador de prioridade */}
        {renderPriorityIcon()}

        {/* Conteúdo principal do assento */}
        {seat.studentId ? (
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <StudentName
              compactView={compactView}
              attendanceStatus={seatStatus}
            >
              {compactView
                ? getStudentName(seat.studentId).split(' ')[0]
                : getStudentName(seat.studentId)
              }
            </StudentName>
            {!compactView && (
              <AttendanceIndicator
                attendanceStatus={seatStatus}
                color={attendanceColor}
              >
                {attendance}%
              </AttendanceIndicator>
            )}
          </div>
        ) : (
          <EmptySeatLabel $editMode={editMode}>
            {editMode ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>+</div>
                <div style={{ fontSize: '12px' }}>Adicionar</div>
              </div>
            ) : (
              'Vazio'
            )}
          </EmptySeatLabel>
        )}

        {/* Overlay para interações especiais */}
        {(editMode || verifyMode) && (
          <InteractionOverlay
            editMode={editMode}
            verifyMode={verifyMode}
            isSelected={selectedSeat?.id === seat.id}
          />
        )}

        {/* Indicador visual para verificação */}
        {verifyMode && selectedSeat?.id === seat.id && (
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '20px',
              height: '20px',
              backgroundColor: '#28a745',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            <FaCheck size={12} />
          </div>
        )}

        {conferenceMode && (
          <div style={{
            position: 'absolute',
            bottom: '4px',
            left: '4px',
            display: 'flex',
            gap: '4px'
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVerify?.(true);
              }}
              style={{
                background: isChecked ? '#4CAF50' : 'rgba(255,255,255,0.7)',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 4px',
                cursor: 'pointer',
                fontSize: '10px',
                color: isChecked ? 'white' : '#333'
              }}
            >
              Correto
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVerify?.(false);
              }}
              style={{
                background: isMismatched ? '#F44336' : 'rgba(255,255,255,0.7)',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 4px',
                cursor: 'pointer',
                fontSize: '10px',
                color: isMismatched ? 'white' : '#333'
              }}
            >
              Errado
            </button>
          </div>
        )}
      </SeatContainer>

      {/* Tooltip */}
      {showTooltips && isHovered && (
        <SeatTooltip>
          {getTooltipContent()}
        </SeatTooltip>
      )}
    </div>
  );
};

export default Seat;