import React, { useState } from 'react';

import './ShareThought.css';

import PostsList from '../PostsList/PostsList';

import postService from '../services/postService';

function ShareThought({isLoggedIn, history}) {

    const [description, setDescription] = useState('');

    if(!isLoggedIn) {
        history.push('/');
        return null;
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        await postService.create(description);
        history.push('/');
    }
    
    return (
        <div className='Input'>
            <div>
                <form onSubmit={onFormSubmit}>
                    <h1>Share your thoughs</h1>
                    <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
                    <button type='submit'>Post</button>
                </form>
            </div>

            <div>
                <PostsList title='Last 3 posts' count='3'></PostsList>
            </div>
        </div>

    );
}

export default ShareThought;