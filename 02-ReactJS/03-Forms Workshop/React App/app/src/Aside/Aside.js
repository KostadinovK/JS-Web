import React from 'react';

import './Aside.css';

import Link from '../shared/Link/Link';

function Aside({isLoggedIn}) {
    return (
        <aside className='Aside'>
          <ul>
                <Link url='/'>Posts</Link>
                {isLoggedIn && <Link url="/share">New Post</Link>}
                {isLoggedIn && <Link url="/profile">Profile</Link>}
                {!isLoggedIn && <Link url="/register">Register</Link>}
                {!isLoggedIn && <Link url="/login">Login</Link>}
                {isLoggedIn && <Link url="/logout">Logout</Link>}
            </ul>
        </aside>
    );
}

export default Aside;