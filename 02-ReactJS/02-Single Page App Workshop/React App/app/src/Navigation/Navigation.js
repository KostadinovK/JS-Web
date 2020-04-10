import React from 'react';
import './Navigation.css';

import Link from '../shared/Link/Link';

function Navigation(){
    return (
        <nav className="Navigation">
            <ul>
                <Link url='#'>
                    <img id="logo" src="/white-origami-bird.png" alt="my-app-logo" />
                </Link>
                <Link url='#'>Link 1</Link>
                <Link url='#'>Link 2</Link>
                <Link url='#'>Link 3</Link>
            </ul>
        </nav>
    );
}

export default Navigation;