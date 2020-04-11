import React from 'react';
import './Navigation.css';

import Link from '../shared/Link/Link';

function Navigation(){
    return (
        <nav className="Navigation">
            <ul>
                <Link url='/'>
                    <img id="logo" src="/white-origami-bird.png" alt="my-app-logo" />
                </Link>
                <Link url='/'>Posts</Link>
                <Link url='/share'>Share</Link>
                <Link url='/profile'>Profile</Link>
                <Link url='/register'>Register</Link>
                <Link url='/login'>Login</Link>
            </ul>
        </nav>
    );
}

export default Navigation;