// components/Team/LayoutView/index.tsx
import React from 'react';
import DroppableSeat from '../DroppableSeat';
import { PriorityConfig, PriorityInfo, PriorityType, SeatType } from '../../../utils/types/Team';
import { ClassroomLayout, GridContainer, TeacherDesk } from './styles';
import { getAttendanceColor } from '../../../utils/attendanceUtils';
import { useClassroom } from '../../../contexts/ClassroomContext';

interface LayoutViewProps {
  conferenceMode: boolean;
  isChecked: boolean;
  isMismatched: boolean;
  onSeatClick: (seat: SeatType) => void;
  getStudentName: (studentId?: number | undefined) => string;
  getPriorityInfo: (priority?: PriorityType) => PriorityConfig | PriorityInfo;
  onVerify?: (seatId: string, isCorrect: boolean) => void;
}

/**
 * Componente que renderiza a visualização em grade da sala de aula
 * @param {boolean} conferenceMode - Modo de conferência
 * @param {boolean} isChecked - Indica se o assento foi verificado
 * @param {boolean} isMismatched - Indica se há discrepâncias no assento
 * @param {function} onSeatClick - Função chamada ao clicar em um assento
 * @param {function} setLayout - Função para atualizar o layout
 * @param {function} getStudentName - Função para obter o nome do aluno
 * @param {function} getPriorityInfo - Função para obter informações de prioridade
 * @param {function} onVerify - Função chamada para verificar o assento
 * @return {JSX.Element} Componente de visualização do layout da sala
 * 
 */
const LayoutView: React.FC<LayoutViewProps> = ({
  conferenceMode,
  isChecked,
  isMismatched,
  onVerify,
  onSeatClick,
  getPriorityInfo,
  getStudentName,
}) => {

  const {
    state: { layout }
  } = useClassroom();

  if (layout.rows === 0 || layout.columns === 0) {
    return <div>Carregando layout...</div>;
  }
  

  return (
    <ClassroomLayout>
      <h3>Layout da Sala</h3>
      <TeacherDesk>
        <span>Mesa do Professor</span>
      </TeacherDesk>

      <GridContainer>
        {layout.seats.map(seat => (
          <DroppableSeat
            key={seat.id}
            seat={seat}
            verifyMode={conferenceMode}
            conferenceMode={conferenceMode}
            compactView={false}
            isChecked={isChecked}
            isMismatched={isMismatched}
            showTooltips={true}
            onSeatClick={onSeatClick}
            getAttendanceColor={getAttendanceColor}
            getStudentName={getStudentName}
            getPriorityInfo={getPriorityInfo}
            onVerify={onVerify}
          />
        ))}
      </GridContainer>
    </ClassroomLayout>
  );
};

export default LayoutView;