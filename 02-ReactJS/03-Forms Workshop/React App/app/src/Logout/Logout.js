import React from 'react';

function Logout({ isLoggedIn, logout, history }) {
  if(!isLoggedIn){
    history.push('/');
    return null;
  }

  logout(history);
  return null;
}

export default Logout;