import React from 'react';
import './Link.css';

import { Link as L } from 'react-router-dom';

function Link( {children, url} ){
    return (
        <li className='listItem'>
            <L to={url}>{children}</L>
        </li>
    );
}

export default Link;