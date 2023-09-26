import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import MainPage from './pages/MainPage';
import RepositoryPage from './pages/RepositoryPage';

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
