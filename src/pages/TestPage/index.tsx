import React, { useState } from 'react';
import { FaDownload, FaFileAlt, FaChartBar, FaMapPin, FaCalendarAlt, FaUsers, FaCog, FaEye } from 'react-icons/fa';

import { AttendanceData, ChangeRecord, GeneratedReport, ReportField, ReportType, SeatingLayout, SelectedReports, Student } from './types';

import GeneratedReports from './Files';

import {
  Container,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Header,
  Title,
  Subtitle,
  GridContainer,
  IconWrapper,
  FormGroup,
  Label,
  Select,
  Input,
  CheckboxLabel,
  PreviewSection,
  PreviewTitle,
  PreviewGrid,
  PreviewCard,
  PreviewCardContent,
  PreviewCardTitle,
  StatusBadge,
  CheckboxGroup
} from './styles';

function FileGenerationSystem() {
  const [selectedReports, setSelectedReports] = useState<SelectedReports>({
    studentList: false,
    seatingChart: false,
    attendance: false,
    changes: false
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>([]);
  const [viewMode, setViewMode] = useState<'generate' | 'view'>('generate');

  const students: Student[] = [
    { id: 1, name: "Aluno 1", seat: "A2", photo: "https://example.com/photos/aluno1.jpg", contact: "aluno1@escola.com", notes: "Observação do aluno 1" },
    { id: 2, name: "Aluno 2", seat: "A3", photo: "https://example.com/photos/aluno2.jpg", contact: "aluno2@escola.com", notes: "Observação do aluno 2" },
    { id: 3, name: "Aluno 3", seat: "A4", photo: "https://example.com/photos/aluno3.jpg", contact: "aluno3@escola.com", notes: "Observação do aluno 3" },
    { id: 4, name: "Aluno 4", seat: "A5", photo: "https://example.com/photos/aluno4.jpg", contact: "aluno4@escola.com", notes: "Observação do aluno 4" },
    { id: 5, name: "Aluno 5", seat: "B1", photo: "https://example.com/photos/aluno5.jpg", contact: "aluno5@escola.com", notes: "Observação do aluno 5" },
  ];

  const seatingLayout: SeatingLayout = {
    rows: 4,
    columns: 5,
    totalSeats: 20,
    occupiedSeats: 20,
    occupancyRate: 100.0,
    emptySeats: 0,
    seats: [
      { student: students[0] },
      { student: students[1] },
      { student: students[2] },
      { student: students[3] },
      { student: students[4] },
      { student: students[5] },
      { student: students[6] },
      { student: students[7] },
      { student: students[8] },
      { student: students[9] },
      { student: students[10] },
      { student: students[11] },
      { student: students[12] },
      { student: students[13] },
      { student: students[14] },
      { student: students[15] },
      { student: students[16] },
      { student: students[17] },
      { student: students[18] },
      { student: students[19] }
    ]
  };

  const attendanceData: AttendanceData[] = [
    { id: 1, name: "Aluno 1", totalClasses: 40, attendance: 36, classes: 40, absences: 4 },
    { id: 2, name: "Aluno 2", totalClasses: 40, attendance: 38, classes: 40, absences: 2 },
    { id: 3, name: "Aluno 3", totalClasses: 40, attendance: 33, classes: 40, absences: 7 },
    { id: 4, name: "Aluno 4", totalClasses: 40, attendance: 40, classes: 40, absences: 0 },
    { id: 5, name: "Aluno 5", totalClasses: 40, attendance: 31, classes: 40, absences: 9 },
  ];

  const changes: ChangeRecord[] = [
    { id: 1, type: "seat", description: "Alteração feita no sistema 1", author: "Professor Ana", date: "2025-05-25", time: "09:15", reason: "Ajuste necessário na organização da turma" },
    { id: 2, type: "class", description: "Alteração feita no sistema 2", author: "Professor Carlos", date: "2025-05-24", time: "10:10", reason: "Ajuste necessário na organização da turma" },
    { id: 3, type: "config", description: "Alteração feita no sistema 3", author: "Professor Beatriz", date: "2025-05-23", time: "14:05", reason: "Ajuste necessário na organização da turma" },
    { id: 4, type: "seat", description: "Alteração feita no sistema 4", author: "Professor Ana", date: "2025-05-22", time: "08:45", reason: "Ajuste necessário na organização da turma" },
  ];


  const reportCards: {
    id: ReportType;
    title: string;
    description: string;
    icon: React.ReactNode;
    fields: ReportField[];
  }[] = [
      {
        id: 'studentList',
        title: 'Lista de Alunos',
        description: 'Relatório com informações dos alunos e assentos atribuídos',
        icon: <FaUsers size={24} />,
        fields: [
          { label: 'Turma', type: 'select', options: ['6º A', '6º B', '7º A', '7º B', '8º A', '8º B'] },
          { label: 'Incluir fotos', type: 'checkbox' },
          { label: 'Incluir contatos', type: 'checkbox' },
          { label: 'Incluir observações', type: 'checkbox' }
        ]
      },
      {
        id: 'seatingChart',
        title: 'Layout da Sala',
        description: 'Mapa visual da disposição atual dos assentos',
        icon: <FaMapPin size={24} />,
        fields: [
          { label: 'Sala', type: 'select', options: ['Sala 101', 'Sala 102', 'Sala 201', 'Sala 202'] },
          { label: 'Incluir nomes', type: 'checkbox' },
          { label: 'Incluir numeração', type: 'checkbox' },
          { label: 'Mostrar vazios', type: 'checkbox' }
        ]
      },
      {
        id: 'attendance',
        title: 'Estatísticas de Frequência',
        description: 'Análise detalhada da frequência dos alunos',
        icon: <FaChartBar size={24} />,
        fields: [
          { label: 'Período', type: 'select', options: ['Último mês', 'Último bimestre', 'Último semestre', 'Personalizado'] },
          { label: 'Data inicial', type: 'date' },
          { label: 'Data final', type: 'date' },
          { label: 'Incluir gráficos', type: 'checkbox' }
        ]
      },
      {
        id: 'changes',
        title: 'Relatório de Alterações',
        description: 'Histórico de mudanças de assentos e configurações',
        icon: <FaCalendarAlt size={24} />,
        fields: [
          { label: 'Tipo de alteração', type: 'select', options: ['Todas', 'Mudanças de assento', 'Alterações de turma', 'Configurações'] },
          { label: 'Período', type: 'select', options: ['7 dias', '30 dias', '90 dias', 'Personalizado'] },
          { label: 'Incluir autor', type: 'checkbox' },
          { label: 'Incluir motivo', type: 'checkbox' }
        ]
      }
    ];

  const handleReportToggle = (reportType: ReportType) => {
    setSelectedReports(prev => ({
      ...prev,
      [reportType]: !prev[reportType]
    }));
  };

  const handleGenerate = async (reportType: ReportType) => {
    setIsGenerating(true);

    // Simular geração de arquivo
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newReport: GeneratedReport = {
      type: reportType,
      filters: {}, // Aqui você pode adicionar os filtros reais usados
      generatedAt: new Date()
    };

    setGeneratedReports(prev => [...prev, newReport]);
    setIsGenerating(false);
  };

  if (viewMode === 'view') {
    return <GeneratedReports
      students={students}
      reports={generatedReports}
      onBack={() => setViewMode('generate')}
      attendanceData={attendanceData}
      changes={changes}
      seatingLayout={seatingLayout}
    />;
  }



  return (
    <Container>
      <Header>
        <Title>Geração de Arquivos</Title>
        <Subtitle>
          Gere relatórios personalizados sobre alunos, frequência e configurações da sala
        </Subtitle>

        {generatedReports.length > 0 && (
          <Button
            onClick={() => setViewMode('view')}
            style={{ marginTop: 'var(--space-md)', width: 'auto' }}
          >
            <FaEye size={16} />
            Visualizar Relatórios Gerados ({generatedReports.length})
          </Button>
        )}
      </Header>

      <GridContainer>
        {reportCards.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <IconWrapper>
                {report.icon}
              </IconWrapper>
              <div>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </div>
            </CardHeader>

            <div>
              {report.fields.map((field, index) => (
                <FormGroup key={index}>
                  {field.type === 'select' && (
                    <>
                      <Label>{field.label}</Label>
                      <Select>
                        <option value="">Selecione...</option>
                        {field.options?.map((option, optIndex) => (
                          <option key={optIndex} value={option}>{option}</option>
                        ))}
                      </Select>
                    </>
                  )}

                  {field.type === 'date' && (
                    <>
                      <Label>{field.label}</Label>
                      <Input type="date" />
                    </>
                  )}

                  {field.type === 'checkbox' && (
                    <CheckboxLabel>
                      <Checkbox
                        type="checkbox"
                        checked={selectedReports[report.id] || false}
                        onChange={() => handleReportToggle(report.id)}
                      />
                      {field.label}
                    </CheckboxLabel>
                  )}
                </FormGroup>
              ))}

              <Button
                onClick={() => handleGenerate(report.id)}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <FaCog size={16} />
                    Gerando...
                  </>
                ) : (
                  <>
                    <FaDownload size={16} />
                    Gerar Relatório
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </GridContainer>

      <PreviewSection>
        <PreviewTitle>
          <FaFileAlt size={20} />
          Visualização dos Relatórios
        </PreviewTitle>

        <PreviewGrid>
          <PreviewCard>
            <PreviewCardTitle>Lista de Alunos - 6º A</PreviewCardTitle>
            <PreviewCardContent>
              • 28 alunos cadastrados<br />
              • 26 assentos atribuídos<br />
              • 2 pendências<br />
              • Última atualização: hoje
            </PreviewCardContent>
          </PreviewCard>

          <PreviewCard>
            <PreviewCardTitle>Layout Sala 101</PreviewCardTitle>
            <PreviewCardContent>
              • Disposição: 6x5 (30 lugares)<br />
              • Ocupação: 93%<br />
              • Última alteração: 3 dias atrás<br />
              • <StatusBadge>Ativo</StatusBadge>
            </PreviewCardContent>
          </PreviewCard>

          <PreviewCard>
            <PreviewCardTitle>Frequência - Março</PreviewCardTitle>
            <PreviewCardContent>
              • Média geral: 94.2%<br />
              • Maior frequência: Ana Silva (100%)<br />
              • Menor frequência: João Santos (78%)<br />
              • Total de aulas: 20
            </PreviewCardContent>
          </PreviewCard>

          <PreviewCard>
            <PreviewCardTitle>Alterações Recentes</PreviewCardTitle>
            <PreviewCardContent>
              • 5 mudanças de assento<br />
              • 2 alterações de turma<br />
              • 1 configuração modificada<br />
              • Período: últimos 7 dias
            </PreviewCardContent>
          </PreviewCard>
        </PreviewGrid>
      </PreviewSection>
    </Container>
  );
}

export default FileGenerationSystem;