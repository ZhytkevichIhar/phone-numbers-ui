import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const isAuthenticated = false; // state value from redux
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
