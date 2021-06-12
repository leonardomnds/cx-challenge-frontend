import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/Auth';
import { useToast } from '../hooks/Toast';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) => {
  const { token } = useAuth();
  const { addToast } = useToast();

  if (!token && isPrivate) {
    addToast({
      type: 'error',
      title: 'Não foi possível se autenticar',
      description: 'Verifique E-mail e senha e tente novamente.',
    });
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={() => (isPrivate === !!token ? <Component /> : <Redirect to={{ pathname: isPrivate ? '/' : '/customers' }} />)}
    />
  );
};

export default Route;
