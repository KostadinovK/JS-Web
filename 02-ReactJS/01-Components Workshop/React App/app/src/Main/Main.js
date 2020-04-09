import React from 'react';

import './Main.css';

import PostsList from '../PostsList/PostsList';

function Main() {
    return (
        <main className='Main'>
            <h1>Some Heading</h1>
            <PostsList/>
        </main>
    );
}

export default Main;