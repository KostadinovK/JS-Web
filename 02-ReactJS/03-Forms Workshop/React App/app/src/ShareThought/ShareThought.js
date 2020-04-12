import React, { useState } from 'react';

import './ShareThought.css';

import PostsList from '../PostsList/PostsList';

import postService from '../services/postService';

function ShareThought({isLoggedIn, history}) {

    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    if(!isLoggedIn) {
        history.push('/');
        return null;
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if(description === null || description === ''){
            setError('Description is required!');
            return null;
        }

        setError(null);

        //await postService.create(description);
        history.push('/');
    }
    
    return (
        <div className='Input'>
            <div>
                <form onSubmit={onFormSubmit}>
                    <h1>Share your thoughs</h1>
                    {error ? <div className='error-message'>{error}</div> : <div></div>}
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