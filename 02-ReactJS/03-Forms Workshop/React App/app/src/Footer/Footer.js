import React from 'react';
import './Footer.css';

import Link from '../shared/Link/Link';


function Footer({isLoggedIn}) {
    return (
        <footer className='Footer'>
             <ul>
                <Link url='/'>Posts</Link>
                {isLoggedIn && <Link url="/share">New Post</Link>}
                {isLoggedIn && <Link url="/profile">Profile</Link>}
                {!isLoggedIn && <Link url="/register">Register</Link>}
                {!isLoggedIn && <Link url="/login">Login</Link>}
                {isLoggedIn && <Link url="/logout">Logout</Link>}
                <Link url="/">
                    <img id="logo" src="/blue-origami-bird-flipped.png" alt="my-app-logo" />
                </Link>
            </ul>
        </footer>
    );
}

export default Footer;