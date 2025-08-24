import React from 'react';

import { PriorityConfig, PriorityInfo, PriorityType, SeatType } from '../../../types/classroom/Team';
import { useClassroom } from '../../../contexts/ClassroomContext';
import { getAttendanceColor } from '../../../utils/attendanceUtils';

import DroppableSeat from '../DroppableSeat';

import { ClassroomLayout, GridContainer, GroupContainer, TeacherDesk } from './styles';
import { Template } from '../../../utils/classroomUtils';
import { FaChalkboardTeacher } from 'react-icons/fa';

interface LayoutViewProps {
  conferenceMode: boolean;
  isChecked: boolean;
  isMismatched: boolean;
  template: Template;
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
  template,
  onVerify,
  onSeatClick,
  getPriorityInfo,
  getStudentName,
}) => {

  const { state: { layout } } = useClassroom();
  const renderSeats = () => {
    if (template === 'groups') {
      // Renderização melhorada de grupos
      const groups: Record<string, SeatType[]> = {};
      const groupSize = 4; // Tamanho padrão do grupo ou poderia vir das props

      layout.seats.forEach((seat, index) => {
        const groupId = Math.floor(index / groupSize);
        if (!groups[groupId]) groups[groupId] = [];
        groups[groupId].push(seat);
      });

      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {Object.values(groups).map((groupSeats, groupIndex) => (
            <GroupContainer key={groupIndex}>
              <h4>Grupo {groupIndex + 1}</h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
                width: 'fit-content'
              }}>
                {groupSeats.map(seat => (
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
              </div>
            </GroupContainer>
          ))}
        </div>
      );
    }

    if (template === 'U') {
      // Organiza os assentos em formato de U
      const rows = Array.from({ length: layout.rows }).map((_, rowIndex) => {
        return layout.seats.filter(seat => seat.position.row === rowIndex);
      });

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          width: '100%'
        }}>
          {/* Fileira superior (parte de cima do U) */}
          {rows.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              width: '100%'
            }}>
              {rows[0].map(seat => (
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
                  onVerify={onVerify} />
              ))}
            </div>
          )}

          {/* Lados do U */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '2rem'
          }}>
            {/* Lado esquerdo */}
            {rows.length > 1 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {rows.slice(1, Math.ceil(rows.length / 2)).map((rowSeats, idx) => (
                  <div key={`left-${idx}`}>
                    {rowSeats[0] &&
                      <DroppableSeat
                        key={rowSeats[0].id}
                        seat={rowSeats[0]}

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
                        onVerify={onVerify} />}
                  </div>
                ))}
              </div>
            )}

            {/* Espaço central (vazio onde fica a mesa do professor) */}
            <div style={{ flex: 1 }} />

            {/* Lado direito */}
            {rows.length > 1 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {rows.slice(1, Math.ceil(rows.length / 2)).map((rowSeats, idx) => (
                  <div key={`right-${idx}`}>
                    {rowSeats[rowSeats.length - 1] && (
                      <DroppableSeat
                        key={rowSeats[rowSeats.length - 1].id}
                        seat={rowSeats[rowSeats.length - 1]}

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
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fileira inferior (base do U) */}
          {rows.length > Math.ceil(rows.length / 2) && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              width: '100%'
            }}>
              {rows[Math.ceil(rows.length / 2)].map(seat => (
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
            </div>
          )}
        </div>
      );
    }

    if (template === 'circle') {
      // Calcula as posições em um círculo perfeito
      const center = { x: 50, y: 50 }; // Centro em porcentagem
      const radius = 35; // Raio do círculo em porcentagem
      const totalSeats = layout.seats.length;

      return (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '400px', // Altura fixa para o container
          margin: '2rem 0'
        }}>
          {layout.seats.map((seat, index) => {
            // Ângulo igualmente distribuído em 360 graus
            const angle = (index * (2 * Math.PI)) / totalSeats;
            // Calcula posição x e y no círculo
            const x = center.x + radius * Math.cos(angle - Math.PI / 2); // -PI/2 para começar no topo
            const y = center.y + radius * Math.sin(angle - Math.PI / 2);

            return (
              <div
                key={seat.id}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 0.3s ease',
                  width: '80px' // Largura fixa para cada assento
                }}
              >
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
              </div>
            );
          })}

          {/* Mesa do Professor no centro */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}>
            <TeacherDesk style={{
              padding: '0.5rem',
              width: '120px',
              textAlign: 'center'
            }}>
              <FaChalkboardTeacher size={20} />
              <div style={{ fontSize: '0.8rem' }}>Professor</div>
            </TeacherDesk>
          </div>
        </div>
      );
    }

    // Layout padrão em grid
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
        gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
        gap: '1rem'
      }}>
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
      </div>
    );
  };

  const getTemplateName = (template?: Template) => {
    switch (template) {
      case 'U': return 'Formato em U - Mesa do Professor no centro';
      case 'circle': return 'Formato Circular - Ideal para discussões';
      case 'groups': return 'Grupos de Trabalho - Colaboração em equipe';
      case 'rows': return 'Fileiras Tradicionais';
      default: return 'Layout Padrão - Grid organizado';
    }
  };

  if (layout.rows === 0 || layout.columns === 0) {
    return <div>Carregando layout...</div>;
  }

  return (
    <ClassroomLayout>
      <h3>Layout da Sala - {getTemplateName(template)}</h3>

      <TeacherDesk>
        <span>Mesa do Professor</span>
        {template === 'U' && (
          <div style={{ marginTop: '1rem' }}>
            <FaChalkboardTeacher size={24} />
          </div>
        )}
      </TeacherDesk>

      <GridContainer $template={template}>
        {renderSeats()}
      </GridContainer>
    </ClassroomLayout>
  );
};

export default LayoutView;