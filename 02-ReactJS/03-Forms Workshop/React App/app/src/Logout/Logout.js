import React from 'react';
import Cookies from 'js-cookie';

function Logout({ history }) {
    Cookies.remove('x-auth-token');
    history.push('/', {isLoggedIn: false});
    return null;
}

export default Logout;