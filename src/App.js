import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DesignerPage from './pages/DesignerPage';
import ResultPage from './pages/ResultPage';
import theme from './theme';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import { ErrorBoundary } from 'react-error-boundary';

// 创建错误回退组件
function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>出现了一些问题：</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <LanguageProvider>
          <CssBaseline />
          <LanguageToggle />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/designer" element={<DesignerPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </LanguageProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App; 