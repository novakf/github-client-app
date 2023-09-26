import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './config/configureMobX';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (module.hot) {
  module.hot.accept();
}
