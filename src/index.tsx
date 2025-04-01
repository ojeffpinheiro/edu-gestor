import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from './contexts/ThemeContext';
import { AuthContextProvider } from './contexts/AuthContext';

import { GlobalStyles } from './styles/global';



// import LoginPage from './pages/LoginPage/indes';
// import HomePage from './pages/Home';
// import DigitalNotebook from './pages/DigitalNotebook';
// import TeamPage from './pages/TeamPage';
// import DailyReport from './pages/DailyReport/';
// import TeamManagement from './pages/TeamManagement';
// import EvaluationManagement from './pages/EvaluationManagement';
// import PlanningDashboard from './pages/PlanningDashboard';
// import DidacticSequencesPage from './pages/DidacticSequencesPage';
//import TestPage from './pages/TestPage';
import ResultsViewer from './pages/ResultsViewer';

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
          <ResultsViewer />
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);


