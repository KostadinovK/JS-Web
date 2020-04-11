import React from 'react';
import './Footer.css';

import Link from '../shared/Link/Link';


function Footer({isLoggedIn}) {
    return (
        <footer className='Footer'>
             <ul>
                <Link url='/'>Posts</Link>
                {isLoggedIn && <Link to="/share">New Post</Link>}
                {isLoggedIn && <Link to="/profile">Profile</Link>}
                {!isLoggedIn && <Link to="/register">Register</Link>}
                {!isLoggedIn && <Link to="/login">Login</Link>}
                {isLoggedIn && <Link to="/logout">Logout</Link>}
                <Link url="/">
                    <img id="logo" src="/blue-origami-bird-flipped.png" alt="my-app-logo" />
                </Link>
            </ul>
        </footer>
    );
}

export default Footer;