import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Configs from './pages/Configs';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/configuracoes" component={ Configs } />
        <Route exact path="/" component={ Login } />

      </Switch>
    </div>
  );
}
