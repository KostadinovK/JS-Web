import React from 'react';

import '../shared/styles/LoginAndRegister.css';

import service from '../services/userService';

class Register extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            form: {},
            error: null
        };
    };

    onInputChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;

        this.setState(({ form }) => {
            return { form: { ...form, [name]: value } };
        });
    };

    onRegisterSubmit = async (event) => {
        event.preventDefault();
        
        const {email, pass, rePass} = this.state.form;
        
        this.setState(({ error }) => {
            return { error: null };
        });

        if(email === undefined || email === ''){
            this.setState(({ error }) => {
                return { error: 'Email is required!'};
            });
           
            return null;
        }

        if(pass === undefined || pass === ''){
            this.setState(({ error }) => {
                return { error: 'Password is required!' };
            });

            return null;
        }

        if(pass !== rePass){
            this.setState(({ error }) => {
                return { error: 'Passwords must match!'};
            });

            return null;
        }

        await service.register(email, pass);
        this.props.history.push('/login');
    };

    render(){
        const { isLoggedIn } = this.props;
        const { error } = this.state;

        if(isLoggedIn){
            this.props.history.push('/');
            return null;
        }

        return (
            <div className='Register'>
                <h1>Register</h1>
        {error ? <div className='error-message'>{error}</div> : <div></div>}
                <form onSubmit={this.onRegisterSubmit}>
                    <div className='form-control'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' onChange={this.onInputChange}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='pass'>Password</label>
                        <input type='password' id='pass' onChange={this.onInputChange}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='rePass'>Repeat Password</label>
                        <input type='password' id='rePass' onChange={this.onInputChange}></input>
                    </div>
                    <div className='form-control'>
                        <button type='submit'>Register</button>
                    </div>
                </form>
            </div>
        );
    };
   
}

export default Register;