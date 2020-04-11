import React from 'react';

import '../shared/styles/LoginAndRegister.css';

function Register() {
    return (
        <div className='Register'>
            <h1>Register</h1>
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
                    <label for='rePass'>Repeat Password</label>
                    <input type='password' id='rePass'></input>
                </div>
                <div className='form-control'>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;