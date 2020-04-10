import React from 'react';

import './Aside.css';

import Link from '../shared/Link/Link';

function Aside() {
    return (
        <aside className='Aside'>
          <ul>
                <Link url='/'>Posts</Link>
                <Link url='/share'>Share</Link>
                <Link url='/profile'>Profile</Link>
                <Link url='/register'>Register</Link>
                <Link url='/login'>Login</Link>
            </ul>
        </aside>
    );
}

export default Aside;