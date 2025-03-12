import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/global';
import { AuthContextProvider } from './contexts/AuthContext';

// import LoginPage from './pages/LoginPage/indes';
// import HomePage from './pages/Home';
// import DigitalNotebook from './pages/DigitalNotebook';
// import TeamPage from './pages/TeamPage';
// import DailyReport from './pages/DailyReport/';
// import TeamManagement from './pages/TeamManagement';
import EvaluationManagement from './pages/EvaluationManagement';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <GlobalStyles />
        <EvaluationManagement />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);


