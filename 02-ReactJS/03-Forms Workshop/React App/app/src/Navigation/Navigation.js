import React from 'react';
import './Navigation.css';

import Link from '../shared/Link/Link';

function Navigation({isLoggedIn}){
    return (
        <nav className="Navigation">
            <ul>
                <Link url='/'>
                    <img id="logo" src="/white-origami-bird.png" alt="my-app-logo" />
                </Link>
                <Link url='/'>Posts</Link>
                {isLoggedIn && <Link url="/share">New Post</Link>}
                {isLoggedIn && <Link url="/profile">Profile</Link>}
                {!isLoggedIn && <Link url="/register">Register</Link>}
                {!isLoggedIn && <Link url="/login">Login</Link>}
                {isLoggedIn && <Link url="/logout">Logout</Link>}
            </ul>
        </nav>
    );
}

export default Navigation;