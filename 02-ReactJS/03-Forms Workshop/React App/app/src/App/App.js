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

import userService from '../services/userService';

class App extends React.Component {

  constructor(props) {
    super(props);
    
    const isLoggedIn = Cookies.get('x-auth-token');

    this.state = { isLoggedIn };
  }

  logout = (history) => {
    Cookies.remove('x-auth-token');
    Cookies.remove('username');
    Cookies.remove('userId');
    this.setState({isLoggedIn: false});
    history.push('/', {});
  }

  login = (history, username, password) => {
    userService.login(username, password).then((data) => {
      Cookies.set('x-auth-token', data.token);
      Cookies.set('username', data.user.username);
      Cookies.set('userId', data.user._id);
      this.setState({ isLoggedIn: true });
      history.push('/');
    });
  }

  renderCmp(title, Cmp, props) {
    return function ({ match, history }) {
      return <Main><Cmp title={title} match={match} history={history} {...props}/></Main>
    };
  };

  render(){
    const { isLoggedIn } = this.state;
   
    return (
      <Router>
        <div className="App">
          <Navigation isLoggedIn={isLoggedIn} />
          <div className="Container">
            <Aside isLoggedIn={isLoggedIn}/>
            <Switch>
              <Route path='/' exact render={this.renderCmp('Posts', PostsList)}/>
              <Route path='/register' render={this.renderCmp('', Register, { isLoggedIn })}/>
              <Route path='/login' render={this.renderCmp('', Login, { isLoggedIn, login: this.login })}/>
              <Route path='/profile' render={this.renderCmp('', Profile, { isLoggedIn })}/>
              <Route path='/share' render={this.renderCmp('', ShareThought, { isLoggedIn })}/>
              <Route path="/logout" render={this.renderCmp('', Logout, { isLoggedIn, logout: this.logout })} />
              <Route path='*' render={this.renderCmp('', NotFound)}/>
            </Switch>
          </div>
          <Footer isLoggedIn={isLoggedIn}/>
        </div>
      </Router>
    );
  }
  
}

export default App;
