import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact componente={SignIn} />
      <Route path="/register" componente={SignUp} />
      <Route path="/dashboard" componente={Profile} />
      <Route path="/perfil" componente={Dashboard} />
    </Switch>
  );
}
