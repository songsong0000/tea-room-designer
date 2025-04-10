import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DesignerPage from './pages/DesignerPage';
import ResultPage from './pages/ResultPage';
import theme from './theme';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageToggle from './components/LanguageToggle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <CssBaseline />
        <LanguageToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/designer" element={<DesignerPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App; 