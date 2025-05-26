import React, { useState } from 'react';
import { FaUsers, FaMapPin, FaChartBar, FaCalendarAlt, FaDownload, FaPrint, FaEye, FaArrowLeft } from 'react-icons/fa';

import { GeneratedReport, Student, SeatingLayout, AttendanceData, ChangeRecord } from './types';
import { 
  ActionButton, 
  BackButton, 
  ChangeItem, 
  GeneratedReportsContainer, 
  ReportContainerWrapper, 
  ReportContent, 
  ReportHeader, 
  ReportsGrid, 
  ReportTitle, 
  ReportTypeButton, 
  Tr 
} from './stylesFiles';

interface GeneratedReportsProps {
  reports: GeneratedReport[];
  onBack: () => void;
  students: Student[];
  seatingLayout: SeatingLayout;
  attendanceData: AttendanceData[];
  changes: ChangeRecord[];
}

interface ReportContainerProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  onDownload: () => void;
  onPrint: () => void;
  onPreview: () => void;
}

const ReportContainer: React.FC<ReportContainerProps> = ({
  children,
  title,
  icon,
  onDownload,
  onPrint,
  onPreview
}) => (
  <ReportContainerWrapper>
    <ReportHeader>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {icon}
          <ReportTitle>{title}</ReportTitle>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <ActionButton onClick={onPreview} title="Visualizar">
            <FaEye size={16} />
          </ActionButton>
          <ActionButton onClick={onPrint} title="Imprimir">
            <FaPrint size={16} />
          </ActionButton>
          <ActionButton onClick={onDownload} title="Download">
            <FaDownload size={16} />
          </ActionButton>
        </div>
      </div>
    </ReportHeader>
    <ReportContent>
      {children}
    </ReportContent>
  </ReportContainerWrapper>
);

const StudentListReport: React.FC<{ students: Student[] }> = ({ students }) => {
  return (
    <ReportContainer
      title="Lista de Alunos - 6º A"
      icon={<FaUsers size={24} />}
      onDownload={() => console.log('Download lista de alunos')}
      onPrint={() => console.log('Imprimir lista de alunos')}
      onPreview={() => console.log('Visualizar lista de alunos')}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>
          Informações da Turma
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {/* Info cards would go here */}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #d1d5db' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ border: '1px solid #d1d5db', padding: '0.75rem', textAlign: 'left' }}>Foto</th>
              <th style={{ border: '1px solid #d1d5db', padding: '0.75rem', textAlign: 'left' }}>Nome</th>
              <th style={{ border: '1px solid #d1d5db', padding: '0.75rem', textAlign: 'left' }}>Assento</th>
              <th style={{ border: '1px solid #d1d5db', padding: '0.75rem', textAlign: 'left' }}>Contato</th>
              <th style={{ border: '1px solid #d1d5db', padding: '0.75rem', textAlign: 'left' }}>Observações</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <Tr key={student.id}>
                <td style={{ border: '1px solid #d1d5db', padding: '0.75rem', textAlign: 'center', fontSize: '1.5rem' }}>
                  {student.photo}
                </td>
                <td style={{ border: '1px solid #d1d5db', padding: '0.75rem', fontWeight: '500' }}>
                  {student.name}
                </td>
                <td style={{ border: '1px solid #d1d5db', padding: '0.75rem' }}>
                  <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                    {student.seat}
                  </span>
                </td>
                <td style={{ border: '1px solid #d1d5db', padding: '0.75rem', fontSize: '0.875rem' }}>
                  {student.contact}
                </td>
                <td style={{ border: '1px solid #d1d5db', padding: '0.75rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  {student.notes}
                </td>
              </Tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportContainer>
  );
};

const SeatingChartReport: React.FC<{ seatingLayout: SeatingLayout }> = ({ seatingLayout }) => {
  return (
    <ReportContainer
      title="Layout da Sala 101"
      icon={<FaMapPin size={24} />}
      onDownload={() => console.log('Download layout')}
      onPrint={() => console.log('Imprimir layout')}
      onPreview={() => console.log('Visualizar layout')}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#1f2937' }}>
            Disposição: {seatingLayout.rows}x{seatingLayout.columns} ({seatingLayout.totalSeats} lugares)
          </h3>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '1rem', height: '1rem', backgroundColor: '#3b82f6', borderRadius: '0.25rem' }}></div>
              <span>Ocupado</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '1rem', 
                height: '1rem', 
                backgroundColor: '#f3f4f6', 
                border: '2px dashed #9ca3af',
                borderRadius: '0.25rem' 
              }}></div>
              <span>Vazio</span>
            </div>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: '#1f2937', 
          color: 'white', 
          textAlign: 'center', 
          padding: '0.5rem', 
          borderRadius: '0.25rem',
          marginBottom: '1.5rem'
        }}>
          📋 QUADRO / PROFESSOR
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${seatingLayout.columns}, minmax(0, 1fr))`,
          gap: '0.75rem',
          maxWidth: '42rem',
          margin: '0 auto'
        }}>
          {seatingLayout.seats.map((seat, index) => (
            <div
              key={index}
              style={{
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                borderWidth: '2px',
                ...(seat.student 
                  ? {
                      backgroundColor: '#dbeafe',
                      borderColor: '#93c5fd',
                      color: '#1e40af'
                    }
                  : {
                      backgroundColor: '#f3f4f6',
                      borderColor: '#d1d5db',
                      borderStyle: 'dashed',
                      color: '#6b7280'
                    }
                )
              }}
            >
              {seat.student?.name || `${String.fromCharCode(65 + Math.floor(index/seatingLayout.columns))}${(index%seatingLayout.columns)+1}`}
            </div>
          ))}
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1rem',
          marginTop: '1.5rem',
          fontSize: '0.875rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
              {seatingLayout.occupiedSeats}
            </div>
            <div style={{ color: '#6b7280' }}>Alunos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {seatingLayout.occupancyRate}%
            </div>
            <div style={{ color: '#6b7280' }}>Ocupação</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6b7280' }}>
              {seatingLayout.emptySeats}
            </div>
            <div style={{ color: '#6b7280' }}>Vazios</div>
          </div>
        </div>
      </div>
    </ReportContainer>
  );
};

const AttendanceReport: React.FC<{ attendanceData: AttendanceData[] }> = ({ attendanceData }) => {
  const averageAttendance = attendanceData.reduce((sum, student) => sum + student.attendance, 0) / attendanceData.length;
  const bestStudent = [...attendanceData].sort((a, b) => b.attendance - a.attendance)[0];
  const worstStudent = [...attendanceData].sort((a, b) => a.attendance - b.attendance)[0];
  const totalAbsences = attendanceData.reduce((sum, student) => sum + student.absences, 0);

  return (
    <ReportContainer
      title="Estatísticas de Frequência - Março 2024"
      icon={<FaChartBar size={24} />}
      onDownload={() => console.log('Download frequência')}
      onPrint={() => console.log('Imprimir frequência')}
      onPreview={() => console.log('Visualizar frequência')}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ backgroundColor: '#ecfdf5', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
              {averageAttendance.toFixed(1)}%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#065f46' }}>Média Geral</div>
          </div>
          <div style={{ backgroundColor: '#dbeafe', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1d4ed8' }}>
              {attendanceData[0]?.totalClasses || 20}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Total Aulas</div>
          </div>
          <div style={{ backgroundColor: '#ede9fe', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#5b21b6' }}>
              {attendanceData.length}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#5b21b6' }}>Alunos</div>
          </div>
          <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#92400e' }}>
              {totalAbsences}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#92400e' }}>Total Faltas</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
          <h4 style={{ fontWeight: '500', marginBottom: '0.75rem' }}>Frequência por Aluno</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {attendanceData.map((student) => (
              <div key={student.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '8rem', fontSize: '0.875rem', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {student.name}
                </div>
                <div style={{ flex: 1, backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '1.5rem', position: 'relative' }}>
                  <div 
                    style={{
                      height: '100%',
                      borderRadius: '9999px',
                      backgroundColor: 
                        student.attendance >= 90 ? '#10b981' :
                        student.attendance >= 80 ? '#f59e0b' : '#ef4444',
                      width: `${student.attendance}%`,
                      transition: 'width 0.3s ease'
                    }}
                  ></div>
                  <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {student.attendance}%
                  </span>
                </div>
                <div style={{ width: '4rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {student.absences} faltas
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div>
            <h4 style={{ fontWeight: '500', marginBottom: '0.75rem', color: '#059669' }}>
              🏆 Melhor Frequência
            </h4>
            <div style={{ 
              backgroundColor: '#ecfdf5', 
              padding: '0.75rem', 
              borderRadius: '0.25rem',
              borderLeft: '4px solid #10b981'
            }}>
              <div style={{ fontWeight: '500' }}>{bestStudent.name}</div>
              <div style={{ fontSize: '0.875rem', color: '#065f46' }}>
                {bestStudent.attendance}% de presença ({bestStudent.totalClasses - bestStudent.absences}/{bestStudent.totalClasses} aulas)
              </div>
            </div>
          </div>
          <div>
            <h4 style={{ fontWeight: '500', marginBottom: '0.75rem', color: '#ef4444' }}>
              ⚠️ Atenção Necessária
            </h4>
            <div style={{ 
              backgroundColor: '#fee2e2', 
              padding: '0.75rem', 
              borderRadius: '0.25rem',
              borderLeft: '4px solid #ef4444'
            }}>
              <div style={{ fontWeight: '500' }}>{worstStudent.name}</div>
              <div style={{ fontSize: '0.875rem', color: '#b91c1c' }}>
                {worstStudent.attendance}% de presença ({worstStudent.absences} faltas)
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportContainer>
  );
};

const ChangesReport: React.FC<{ changes: ChangeRecord[] }> = ({ changes }) => {
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'seat': return '💺';
      case 'class': return '🏫';
      case 'config': return '⚙️';
      default: return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'seat': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' };
      case 'class': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' };
      case 'config': return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' };
    }
  };

  const changesByType = changes.reduce((acc, change) => {
    acc[change.type] = (acc[change.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <ReportContainer
      title="Relatório de Alterações - Últimos 7 dias"
      icon={<FaCalendarAlt size={24} />}
      onDownload={() => console.log('Download alterações')}
      onPrint={() => console.log('Imprimir alterações')}
      onPreview={() => console.log('Visualizar alterações')}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ backgroundColor: '#dbeafe', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1d4ed8' }}>
              {changesByType.seat || 0}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Mudanças de Assento</div>
          </div>
          <div style={{ backgroundColor: '#dcfce7', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534' }}>
              {changesByType.class || 0}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#166534' }}>Alterações de Turma</div>
          </div>
          <div style={{ backgroundColor: '#f3e8ff', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6b21a8' }}>
              {changesByType.config || 0}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b21a8' }}>Config. Modificadas</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {changes.map((change) => {
            const colors = getTypeColor(change.type);
            return (
              <ChangeItem key={change.id} >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ fontSize: '1.5rem' }}>{getTypeIcon(change.type)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: colors.bg,
                        color: colors.text
                      }}>
                        {change.type === 'seat' ? 'Assento' : 
                         change.type === 'class' ? 'Turma' : 'Configuração'}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {change.date} às {change.time}
                      </span>
                    </div>
                    <div style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>
                      {change.description}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      <span style={{ fontWeight: '500' }}>Autor:</span> {change.author} | 
                      <span style={{ fontWeight: '500' }}> Motivo:</span> {change.reason}
                    </div>
                  </div>
                </div>
              </ChangeItem>
            );
          })}
        </div>
      </div>
    </ReportContainer>
  );
};

const GeneratedReports: React.FC<GeneratedReportsProps> = ({
  reports,
  onBack,
  students,
  seatingLayout,
  attendanceData,
  changes
}) => {
  const [activeReport, setActiveReport] = useState('studentList');

  return (
    <GeneratedReportsContainer>
      <ReportsGrid>
        <div style={{ marginBottom: '1.5rem' }}>
          <BackButton onClick={onBack}>
            <FaArrowLeft /> Voltar para geração de relatórios
          </BackButton>

          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            Relatórios Gerados
          </h1>
          <p style={{ color: '#4b5563' }}>
            Visualize e gerencie os relatórios do sistema de gerenciamento escolar
            <span style={{ marginLeft: '0.5rem', backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
              {reports.length} relatórios gerados
            </span>
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <ReportTypeButton
              active={activeReport === 'studentList'}
              onClick={() => setActiveReport('studentList')}
            >
              📋 Lista de Alunos
            </ReportTypeButton>
            <ReportTypeButton
              active={activeReport === 'seatingChart'}
              onClick={() => setActiveReport('seatingChart')}
            >
              🗺️ Layout da Sala
            </ReportTypeButton>
            <ReportTypeButton
              active={activeReport === 'attendance'}
              onClick={() => setActiveReport('attendance')}
            >
              📊 Frequência
            </ReportTypeButton>
            <ReportTypeButton
              active={activeReport === 'changes'}
              onClick={() => setActiveReport('changes')}
            >
              📅 Alterações
            </ReportTypeButton>
          </div>
        </div>

        <div style={{ transition: 'all 0.3s' }}>
          {activeReport === 'studentList' && <StudentListReport students={students} />}
          {activeReport === 'seatingChart' && <SeatingChartReport seatingLayout={seatingLayout} />}
          {activeReport === 'attendance' && <AttendanceReport attendanceData={attendanceData} />}
          {activeReport === 'changes' && <ChangesReport changes={changes} />}
        </div>
      </ReportsGrid>
    </GeneratedReportsContainer>
  );
};

export default GeneratedReports;