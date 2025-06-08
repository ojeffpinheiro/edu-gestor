// components/Team/LayoutView/index.tsx
import React from 'react';
import DroppableSeat from '../DroppableSeat';
import { LayoutConfig, PriorityConfig, PriorityInfo, PriorityType, SeatType } from '../../../utils/types/Team';
import { StudentFormData } from '../../../utils/types/BasicUser';
import { ClassroomLayout, GridContainer, TeacherDesk } from './styles';
import { getAttendanceColor } from '../../../utils/attendanceUtils';

interface LayoutViewProps {
  layout: LayoutConfig;
  studentList: StudentFormData[];
  selectedSeat: SeatType | null;
  editLayoutMode: boolean;
  conferenceMode: boolean;
  isChecked: boolean;
  isMismatched: boolean;
  onSeatClick: (seat: SeatType) => void;
  setLayout: React.Dispatch<React.SetStateAction<LayoutConfig>>;
  getStudentName: (studentId?: number | undefined) => string;
  getPriorityInfo: (priority?: PriorityType) => PriorityConfig | PriorityInfo;
  onVerify?: (seatId: string, isCorrect: boolean) => void;
  getStudentAttendance: (studentId: number) => number;
}

/**
 * Componente que renderiza a visualização em grade da sala de aula
 * @param {LayoutConfig} layout - Configuração atual do layout
 * @param {StudentFormData[]} studentList - Lista de alunos disponíveis
 * @param {SeatType | null} selectedSeat - Assento atualmente selecionado
 * @param {boolean} editLayoutMode - Modo de edição do layout
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
  layout,
  studentList,
  selectedSeat,
  editLayoutMode,
  conferenceMode,
  isChecked,
  isMismatched,
  getStudentAttendance,
  onVerify,
  onSeatClick,
  setLayout,
  getPriorityInfo,
  getStudentName,
}) => {
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
            seats={layout.seats}
            studentList={studentList}
            selectedSeat={selectedSeat}
            editMode={editLayoutMode}
            verifyMode={conferenceMode}
            conferenceMode={conferenceMode}
            compactView={false}
            isChecked={isChecked}
            isMismatched={isMismatched}
            showTooltips={true}
            getStudentAttendance={getStudentAttendance}
            onSeatClick={onSeatClick}
            setLayout={setLayout}
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