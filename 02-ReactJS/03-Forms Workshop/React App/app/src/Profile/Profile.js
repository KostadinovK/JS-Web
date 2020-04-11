import React from 'react';

import './Profile.css';

import PostsList from '../PostsList/PostsList';

function Profile({isLoggedIn, history}) {
    if(!isLoggedIn) {
        history.push('/');
        return null;
    }

    return (
        <div className='Profile'>
            <img src='/blue-origami-bird-flipped' alt='profile'/>
            <div className='personal-info'>
                <p>
                    <span>Email:</span>
                    testemail@abv.bg
                </p>
                <p>
                    <span>Posts:</span>
                    9
                </p>
            </div>

                <PostsList title='3 of your posts' count='3'></PostsList>
        </div>

    );
}

export default Profile;