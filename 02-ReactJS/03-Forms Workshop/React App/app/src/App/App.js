import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Cookies from 'js-cookie';

import './App.css';

import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';
import PostsList from '../PostsList/PostsList';
import ShareThought from '../ShareThought/ShareThought';
import NotFound from '../NotFound/NotFound';

class App extends React.Component {

  logout = (history) => {
    history.push('/', {username: null, id: null, isLoggedIn: false});
    Cookies.remove('x-auth-token');
  }

  renderCmp(title, Cmp) {
    return function ({ match, history }) {
      return <Main><Cmp title={title} match={match} history={history}/></Main>
    };
  };

  render(){
    return (
      <Router>
        <div className="App">
          <Navigation />
          <div className="Container">
            <Aside />
            <Switch>
              <Route path='/' exact render={this.renderCmp('Posts', PostsList)}/>
              <Route path='/register' render={this.renderCmp('', Register)}/>
              <Route path='/login' render={this.renderCmp('', Login)}/>
              <Route path='/profile' render={this.renderCmp('', Profile)}/>
              <Route path='/share' render={this.renderCmp('', ShareThought)}/>
              <Route path="/logout"render={this.renderCmp('', Logout)} />
              <Route path='*' render={this.renderCmp('Something went wrong', NotFound)}/>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
  
}

export default App;
