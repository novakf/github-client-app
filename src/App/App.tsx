import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from 'components/Header';
import MainPage from './pages/MainPage';
import RepositoryPage from './pages/RepositoryPage';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/:owner?" element={<MainPage />} />
        <Route path="/:owner/:repoName" element={<RepositoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
