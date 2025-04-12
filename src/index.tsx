import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from './contexts/ThemeContext';
import { AuthContextProvider } from './contexts/AuthContext';

import { GlobalStyles } from './styles/global';
import UnitsManagement from './pages/UnitsManagement';


// import DailyReport from './pages/DailyReport/';
// import DidacticSequencesPage from './pages/DidacticSequencesPage';
// import DigitalNotebook from './pages/DigitalNotebook';
// import EquationSystem from './pages/EquationSystem';
// import EvaluationManagement from './pages/EvaluationManagement';
// import ExamManager from './pages/ExamManager';
// import HomePage from './pages/Home';
// import LoginPage from './pages/LoginPage/';
// import PlanningDashboard from './pages/PlanningDashboard';
// import QuestionsManagementPage from './pages/QuestionsManagementPage';
// import ResultsViewer from './pages/ResultsViewer';
// import TeamManagement from './pages/TeamManagement';
// import TeamPage from './pages/TeamPage';
// import TestPage from './pages/TestPage';
// import TopicContentManagement from './pages/TopicContentManagement';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient} >
          <GlobalStyles />
          <UnitsManagement />
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);


