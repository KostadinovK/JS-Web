import React from 'react';

import './Post.css';

function Post( {imgUrl, author, children} ) {
    return (
        <div className='Post'>
            <img src={imgUrl} alt=''></img>
            <p className='description'>
                {children}
            </p>
            <div>
                <span>
                    <small>Author: {author}</small>
                </span>
            </div>
        </div>
    );
}

export default Post;