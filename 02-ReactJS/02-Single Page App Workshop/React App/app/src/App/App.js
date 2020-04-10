import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Register from '../Register/Register';
import Login from '../Login/Login';
import PostsList from '../PostsList/PostsList';
import ShareThought from '../ShareThought/ShareThought';
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
            <Route path='/register' render={render('', Register)}/>
            <Route path='/login' render={render('', Login)}/>
            <Route path='/share' render={render('', ShareThought)}/>
            <Route path='*' render={render('Something went wrong', NotFound)}/>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
