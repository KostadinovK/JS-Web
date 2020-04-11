import React from 'react';

import './Main.css';

function Main( {children, title} ) {
    return (
        <main className='Main'>
            <h1>{title}</h1>
            {children}
        </main>
    );
}

export default Main;