import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from 'components/Header';
import MainPage from './pages/MainPage';
import RepositoryPage from './pages/RepositoryPage';
import './App.css';

const App: React.FC = () => {
  let repsString = localStorage.getItem('reps');
  let [reps, setReps] = useState(repsString ? JSON.parse(repsString) : []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage reps={reps} setReps={setReps} />} />
        <Route path="/repository">
          <Route path=":id" element={<RepositoryPage reps={reps} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
