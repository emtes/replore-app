import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import ExploreOpenTasks from './components/ExploreOpenTasks';
import ExploreRepositories from './components/ExploreRepositories';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/repos">
          <ExploreRepositories />
        </Route>
        <Route path="/open-tasks">
          <ExploreOpenTasks />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
