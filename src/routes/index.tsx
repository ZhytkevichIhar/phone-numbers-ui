import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PhoneNumbersPage from '../containers/PhoneNumbersPage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <PublicRoute path="/" component={PhoneNumbersPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
