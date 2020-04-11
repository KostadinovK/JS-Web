import React from 'react';

import './ShareThought.css';

import PostsList from '../PostsList/PostsList';

function ShareThought() {
    return (
        <div className='Input'>
            <div>
                <h1>Share your thoughs</h1>
                <textarea></textarea>
                <button>Post</button>
            </div>

            <div>
                <PostsList title='Last 3 posts' count='3'></PostsList>
            </div>
        </div>

    );
}

export default ShareThought;