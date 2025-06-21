import React, { useState } from 'react';

import { 
  FiHome, 
  FiDatabase, 
  FiFileText, 
  FiClipboard, 
  FiBarChart2 
} from 'react-icons/fi';

import QuestionBank from './Subpages/QuestionBank';
import ExamGenerator from './Subpages/ExamGenerator';
import ExamDashboard from './Subpages/ExamDashboard';
import AssessmentDashboard from '../../components/Exam/AssessmentDashboard';

import { 
  LayoutContainer,
  MainContent,
  SidebarContainer,
  SidebarMenu,
  MenuItem,
  MenuIcon,
  MenuText
} from './styles';

const MainTabs = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const sidebarCollapsed = false;

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <ExamDashboard />;
      case 'questions':
        return <QuestionBank />;
      case 'exams':
        return <ExamGenerator />;
      case 'assessments':
        return <AssessmentDashboard />;
      /* case 'stats':
        return <Statistics />;*/
      default:
        return <ExamDashboard />;
    }
  };

  const menuItems = [
    { id: 'dashboard', icon: <FiHome />, label: 'Dashboard' },
    { id: 'questions', icon: <FiDatabase />, label: 'Banco de Questões' },
    { id: 'exams', icon: <FiFileText />, label: 'Geração de Provas' },
    { id: 'assessments', icon: <FiClipboard />, label: 'Avaliações' },
    { id: 'stats', icon: <FiBarChart2 />, label: 'Estatísticas' }
  ];

  return (
    <LayoutContainer>
      <SidebarContainer collapsed={sidebarCollapsed}>
        <SidebarMenu>
          {menuItems.map(item => (
            <MenuItem 
              key={item.id}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              collapsed={sidebarCollapsed}
            >
              <MenuIcon>{item.icon}</MenuIcon>
              {!sidebarCollapsed && <MenuText>{item.label}</MenuText>}
            </MenuItem>
          ))}
        </SidebarMenu>
      </SidebarContainer>

      <MainContent collapsed={sidebarCollapsed}>
        {renderTabContent()}
      </MainContent>
    </LayoutContainer>
  );
};

export default MainTabs;