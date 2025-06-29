// src/routes/index.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Páginas
import DailyReport from '../pages/Team/DailyReport';
import DidacticSequencesPage from '../pages/Planning/DidacticSequencesPage';
import DigitalNotebook from '../pages/Planning/DigitalNotebook';
import EquationSystem from '../pages/EquationSystem';
import EvaluationManagement from '../pages/Evaluation/EvaluationManagement';
import ExamManager from '../pages/ExamManager';
import HomePage from '../pages/Home';
import HomeTest from '../pages/HomeTest';
import LoginPage from '../pages/LoginPage/indes';
import NotFound from '../pages/NotFound';
import PlanningDashboard from '../pages/Planning/PlanningDashboard';
import PlanningPage from '../pages/Planning/PlanningPage';
import QuestionsManagementPage from '../pages/Question/QuestionsManagementPage';
import ResultsViewer from '../pages/ResultsViewer';
import TeamManagement from '../pages/Team/TeamManagement';
import TeamPage from '../pages/Team/TeamPage';
import TestPage from '../pages/TestPage';
import TopicContentManagement from '../pages/TopicContentManagement';
import UnitsManagement from '../pages/UnitsManagement';
import Exams from '../pages/Exam';
import CalendarView from '../components/Calendar/CalendarView';
import ScheduleView from '../components/Calendar/ScheduleView';
import ClassroomLayoutPage from '../pages/Team/ClassroomLayoutPage';
import DashboardPlanning from '../pages/Planning/DashboardPlanning';
import DashboardResultViewer from '../pages/DashboardResultViewer';
import { ClassroomProvider } from '../contexts/ClassroomContext';

const AppRoutes: React.FC = () => {
  return (
    <ClassroomProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas protegidas */}
          <Route path='/' index element={<HomeTest />} />
          <Route path="/result-dashboard" element={<DashboardResultViewer />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/schedule" element={<ScheduleView />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/units" element={<UnitsManagement />} />
          <Route path="/daily-report" element={<DailyReport />} />
          <Route path="/didactic-sequences" element={<DidacticSequencesPage />} />
          <Route path="/digital-notebook" element={<DigitalNotebook />} />
          <Route path="/equation-system" element={<EquationSystem />} />
          <Route path="/evaluations" element={<EvaluationManagement />} />
          <Route path="/exams" element={<ExamManager />} />
          <Route path='/exam' element={<Exams />} />
          <Route path="/planning" element={<PlanningDashboard />} />
          <Route path="/planning-new" element={<DashboardPlanning />} />
          <Route path='/plannig-page' element={<PlanningPage />} />
          <Route path="/questions" element={<QuestionsManagementPage />} />
          <Route path="/results" element={<ResultsViewer />} />
          <Route path="/team-management" element={<TeamManagement />} />
          <Route path="/classroom-mapping" element={<ClassroomLayoutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/daily-report" element={<DailyReport />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/topic-content" element={<TopicContentManagement />} />
          <Route path="/not-found" element={<NotFound />} />


          {/* Rota para página não encontrada */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </ClassroomProvider>
  );
};

export default AppRoutes;