import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import PostsList from '../PostsList/PostsList';
import NotFound from '../NotFound/NotFound';

function render(title, Cmp) {
  return function ({ match }) {
    return <Main title={title}><Cmp match={match} /></Main>
  };
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="Container">
          <Aside />
          <Switch>
            <Route path='/' exact render={render('Posts', PostsList)}/>
            <Route path='*' render={render('Something went wrong', NotFound)}/>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
