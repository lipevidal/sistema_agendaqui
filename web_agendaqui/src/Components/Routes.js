import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cadastro from '../Pages/Cadastro';
import Home from '../Pages/Home';
import Login from '../Pages/Login';

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/login" component={Login} />
        </Switch>
    </BrowserRouter>
  );
}
