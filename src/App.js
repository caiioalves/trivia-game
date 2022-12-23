import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "./App.css"
import Login from './pages/Login';
import Play from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import { ThemeProvider } from '@emotion/react';
import { Tema } from './componentes/Theme';
// import musica from './musica/background.mp3';

export default function App() {
  return (
    <ThemeProvider theme={Tema}>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/play" component={ Play } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </ThemeProvider>
  );
}
