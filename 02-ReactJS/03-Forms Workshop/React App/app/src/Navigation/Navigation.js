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
                {isLoggedIn && <Link to="/share">New Post</Link>}
                {isLoggedIn && <Link to="/profile">Profile</Link>}
                {!isLoggedIn && <Link to="/register">Register</Link>}
                {!isLoggedIn && <Link to="/login">Login</Link>}
                {isLoggedIn && <Link to="/logout">Logout</Link>}
            </ul>
        </nav>
    );
}

export default Navigation;