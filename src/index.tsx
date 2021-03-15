import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from './contexts/AppProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root') as HTMLElement,
);
