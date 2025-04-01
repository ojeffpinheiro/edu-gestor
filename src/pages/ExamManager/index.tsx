// src/pages/ExamManager.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Button } from '@mui/material';
import { useAssessment } from '../../contexts/AssessmentContext';
import { Exam } from '../../utils/types/Assessment';
import ExamGenerator from '../../components/Assessment/ExamGenerator/ExamGenerator';
import ExamSecurityManager from '../../components/Assessment/ExamGenerator/ExamSecurityManager';
import ExamVariantGenerator from '../../components/Assessment/ExamGenerator/ExamVariantGenerator';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`exam-tabpanel-${index}`}
      aria-labelledby={`exam-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ExamManager: React.FC = () => {
  const { exams, questions, updateExam, resetToMockData } = useAssessment();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(exams[0] || null);
  const [createdExams, setCreatedExams] = useState<Exam[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleExamCreated = (exam: Exam) => {
    setCreatedExams(prev => [...prev, exam]);
    setSelectedExam(exam);
    setActiveTab(1); // Move to security tab after creation
  };

  const handleExamUpdated = (updatedExam: Exam) => {
    updateExam(updatedExam);
    setSelectedExam(updatedExam);
  };

  const handleVariantsGenerated = (variants: Exam[]) => {
    setCreatedExams(prev => [...prev, ...variants]);
  };

  const handleResetData = () => {
    resetToMockData();
    setSelectedExam(exams[0] || null);
    setCreatedExams([]);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gerenciamento de Exames
        </Typography>
        <Button variant="outlined" onClick={handleResetData}>
          Resetar Dados
        </Button>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="exam management tabs">
            <Tab label="Criar Exame" />
            <Tab label="Segurança" disabled={!selectedExam} />
            <Tab label="Gerar Variantes" disabled={!selectedExam} />
          </Tabs>
        </Box>
        
        <TabPanel value={activeTab} index={0}>
          <ExamGenerator />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          {selectedExam && (
            <ExamSecurityManager 
              exam={selectedExam} 
              onUpdate={handleExamUpdated} 
            />
          )}
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          {selectedExam && (
            <ExamVariantGenerator
              baseExam={selectedExam}
              questions={questions.filter(q => selectedExam.questions.includes(q.id))}
              onVariantsGenerated={handleVariantsGenerated}
            />
          )}
        </TabPanel>
      </Box>

      {createdExams.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Exames Criados
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {createdExams.map((exam) => (
              <Box
                key={exam.id}
                sx={{
                  p: 2,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  cursor: 'pointer',
                  bgcolor: selectedExam?.id === exam.id ? '#f0f7ff' : 'white',
                }}
                onClick={() => {
                  setSelectedExam(exam);
                  setActiveTab(1);
                }}
              >
                <Typography variant="h6">{exam.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {exam.id} | Questões: {exam.questions.length} | Criado em: {exam.createdAt.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ExamManager;