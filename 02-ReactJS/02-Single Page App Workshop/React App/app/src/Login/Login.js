import React from 'react';

import '../shared/styles/LoginAndRegister.css';

function Login() {
    return (
        <div className='Login'>
            <h1>Login</h1>
            <form>
                <div className='form-control'>
                    <label for='email'>Email</label>
                    <input type='text' id='email'></input>
                </div>
                <div className='form-control'>
                    <label for='pass'>Password</label>
                    <input type='password' id='pass'></input>
                </div>
                <div className='form-control'>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;