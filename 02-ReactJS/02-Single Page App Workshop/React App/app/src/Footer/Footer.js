import React from 'react';
import './Footer.css';

import Link from '../shared/Link/Link';


function Footer() {
    return (
        <footer className='Footer'>
             <ul>
                <Link url='/'>Posts</Link>
                <Link url='/share'>Share</Link>
                <Link url='/profile'>Profile</Link>
                <Link url='/register'>Register</Link>
                <Link url='/login'>Login</Link>
                <Link url="/">
                    <img id="logo" src="/blue-origami-bird-flipped.png" alt="my-app-logo" />
                </Link>
            </ul>
        </footer>
    );
}

export default Footer;