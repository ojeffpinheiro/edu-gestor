// components/StudentDetailModal.tsx
import React, { useState } from 'react';
import { StudentResult, ExamResult } from '../../utils/types/Assessment'
import { FiEye, FiTarget, FiTrendingUp, FiUser, FiX } from 'react-icons/fi'
import { FaChartBar, FaGraduationCap } from 'react-icons/fa';

/** import { TableCell, TableHeader } from '../../styles/table';
import { CloseButton, TabButton } from '../../styles/buttons';
import { TabsContainer } from '../../styles/tabs';
import { ModalContent, ModalOverlay } from '../../styles/baseComponents';
import { ModalBody, ModalHeader } from '../../styles/modals';*/

import styled from 'styled-components';
interface StudentDetailModalProps {
  student: StudentResult;
  onClose: () => void;
}


const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StudentAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const StudentName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
`;

const StudentId = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
  margin: 0;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  padding: 0 2rem;
  background: #f8fafc;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 1rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#1e293b' : '#64748b'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 12px 12px 0 0;
  margin-top: 0.5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #1e293b;
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  max-height: 60vh;
  overflow-y: auto;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e2e8f0;
`;

const MetricLabel = styled.span`
  display: block;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const MetricValue = styled.span`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExamsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.th`
  background: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #374151;
`;

const PerformanceBar = styled.div<{ width: string; color: string }>`
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.width};
    background: ${props => props.color};
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const DetailsButton = styled.button`
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: background 0.2s ease;

  &:hover {
    background: #5a6fd8;
  }
`;

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  const [activeTab, setActiveTab] = useState('performance');

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <StudentInfo>
            <StudentAvatar>
              <FiUser size={24} />
            </StudentAvatar>
            <div>
              <StudentName>{student.studentName}</StudentName>
              <StudentId>ID: {student.studentId || 'N/A'}</StudentId>
            </div>
          </StudentInfo>
          <CloseButton onClick={onClose}>
            <FiX size={20} />
          </CloseButton>
        </ModalHeader>
        
        <TabsContainer>
          <TabButton 
            active={activeTab === 'performance'} 
            onClick={() => setActiveTab('performance')}
          >
            <FaChartBar size={14} />
            Desempenho
          </TabButton>
          <TabButton 
            active={activeTab === 'progress'} 
            onClick={() => setActiveTab('progress')}
          >
            <FiTrendingUp size={14} />
            Progresso
          </TabButton>
          <TabButton 
            active={activeTab === 'skills'} 
            onClick={() => setActiveTab('skills')}
          >
            <FiTarget size={14} />
            Habilidades
          </TabButton>
        </TabsContainer>
        
        <ModalBody>
          {activeTab === 'performance' && (
            <>
              <MetricsGrid>
                <MetricCard>
                  <MetricLabel>Média Geral</MetricLabel>
                  <MetricValue>{student.overallAverage.toFixed(1)}</MetricValue>
                </MetricCard>
                <MetricCard>
                  <MetricLabel>Aprovações</MetricLabel>
                  <MetricValue>
                    {student.examResults.filter(exam => exam.totalScore >= 60).length}
                  </MetricValue>
                </MetricCard>
                <MetricCard>
                  <MetricLabel>Total de Provas</MetricLabel>
                  <MetricValue>{student.examResults.length}</MetricValue>
                </MetricCard>
              </MetricsGrid>
              
              <SectionTitle>
                <FaGraduationCap size={18} />
                Últimas Avaliações
              </SectionTitle>
              <ExamsTable>
                <thead>
                  <tr>
                    <TableHeader>Avaliação</TableHeader>
                    <TableHeader>Nota</TableHeader>
                    <TableHeader>Desempenho</TableHeader>
                    <TableHeader>Ações</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {student.examResults.map((exam: ExamResult) => (
                    <tr key={exam.id}>
                      <TableCell>{exam.examId}</TableCell>
                      <TableCell>
                        <strong style={{ color: getPerformanceColor(exam.totalScore) }}>
                          {exam.totalScore.toFixed(1)}
                        </strong>
                      </TableCell>
                      <TableCell>
                        <PerformanceBar 
                          width={`${exam.totalScore}%`}
                          color={getPerformanceColor(exam.totalScore)}
                        />
                      </TableCell>
                      <TableCell>
                        <DetailsButton>
                          <FiEye size={14} />
                          Ver
                        </DetailsButton>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </ExamsTable>
            </>
          )}
          
          {activeTab === 'progress' && (
            <div>
              <SectionTitle>
                <FiTrendingUp size={18} />
                Evolução do Desempenho
              </SectionTitle>
              <p style={{ color: '#64748b' }}>
                Gráfico de evolução será implementado aqui...
              </p>
            </div>
          )}
          
          {activeTab === 'skills' && (
            <div>
              <SectionTitle>
                <FiTarget size={18} />
                Análise de Habilidades
              </SectionTitle>
              <p style={{ color: '#64748b' }}>
                Análise detalhada de competências será implementada aqui...
              </p>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StudentDetailModal;