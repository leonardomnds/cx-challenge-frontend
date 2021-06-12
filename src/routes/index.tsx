import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Customers from '../pages/Customers';
import NewCustomer from '../pages/Customers/NewCustomer';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/customers" exact component={Customers} isPrivate />
    <Route path="/customers/new" exact component={NewCustomer} isPrivate />
    <Route path="/customers/edit/:customerId" exact component={NewCustomer} isPrivate />
  </Switch>
);

export default Routes;
