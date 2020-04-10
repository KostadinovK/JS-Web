import React from 'react';

import PostsList from '../PostsList/PostsList';

function ShareThought() {
    return (
        <React.Fragment>
            <div>
                <textarea></textarea>
                <button>Post</button>
            </div>

            <div>
                <PostsList count='3'></PostsList>
            </div>
        </React.Fragment>

    );
}

export default ShareThought;