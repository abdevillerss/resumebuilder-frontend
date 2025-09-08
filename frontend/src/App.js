import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
// Corrected imports to match your file names
import NotFoundPage from './pages/notfoundpage'; 
import TemplateSelectionPage from './pages/template';
import EditorPage from './pages/resumeeditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/templates" element={<TemplateSelectionPage />} />
        <Route path="/editor/:id" element={<EditorPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
