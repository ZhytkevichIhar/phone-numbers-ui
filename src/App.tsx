import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import './style.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
