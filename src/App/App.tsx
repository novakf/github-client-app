import React from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import MainPage from './pages/MainPage';
import RepositoryPage from './pages/RepositoryPage';
import ProfilePage from './pages/ProfilePage';
import CreateRepoPage from './pages/CreateRepoPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/new" element={<CreateRepoPage />} />
        <Route path="/:owner?" element={<MainPage />} />
        <Route path="/profile/:login" element={<ProfilePage />} />
        <Route path="/:owner/:repoName" element={<RepositoryPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
