import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './config/configureMobX';

const rootElement = document.getElementById('root') as HTMLElement;

if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (module.hot) {
  module.hot.accept();
}
