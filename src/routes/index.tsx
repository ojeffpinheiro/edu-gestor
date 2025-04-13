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
import LoginPage from '../pages/LoginPage/indes';
import NotFound from '../pages/NotFound';
import PlanningDashboard from '../pages/Planning/PlanningDashboard';
import QuestionsManagementPage from '../pages/Question/QuestionsManagementPage';
import ResultsViewer from '../pages/ResultsViewer';
import TeamManagement from '../pages/Team/TeamManagement';
import TeamPage from '../pages/Team/TeamPage';
import TestPage from '../pages/TestPage';
import TopicContentManagement from '../pages/TopicContentManagement';
import UnitsManagement from '../pages/UnitsManagement';
import HomeTest from '../pages/HomeTest';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rotas protegidas */}
          <Route path='/' index element={<HomeTest />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/units" element={<UnitsManagement />} />
          <Route path="/daily-report" element={<DailyReport />} />
          <Route path="/didactic-sequences" element={<DidacticSequencesPage />} />
          <Route path="/digital-notebook" element={<DigitalNotebook />} />
          <Route path="/equation-system" element={<EquationSystem />} />
          <Route path="/evaluations" element={<EvaluationManagement />} />
          <Route path="/exams" element={<ExamManager />} />
          <Route path="/planning" element={<PlanningDashboard />} />
          <Route path="/questions" element={<QuestionsManagementPage />} />
          <Route path="/results" element={<ResultsViewer />} />
          <Route path="/team-management" element={<TeamManagement />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/daily-report" element={<DailyReport />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/topic-content" element={<TopicContentManagement />} />
          <Route path="/not-found" element={<NotFound />} />

        
        {/* Rota para página não encontrada */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;