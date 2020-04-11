import React from 'react';

import './Aside.css';

import Link from '../shared/Link/Link';

function Aside({isLoggedIn}) {
    return (
        <aside className='Aside'>
          <ul>
                <Link url='/'>Posts</Link>
                {isLoggedIn && <Link to="/share">New Post</Link>}
                {isLoggedIn && <Link to="/profile">Profile</Link>}
                {!isLoggedIn && <Link to="/register">Register</Link>}
                {!isLoggedIn && <Link to="/login">Login</Link>}
                {isLoggedIn && <Link to="/logout">Logout</Link>}
            </ul>
        </aside>
    );
}

export default Aside;