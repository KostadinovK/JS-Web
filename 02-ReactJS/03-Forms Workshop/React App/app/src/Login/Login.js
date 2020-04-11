import React from 'react';
import Cookies from 'js-cookie';

import '../shared/styles/LoginAndRegister.css';

import service from '../services/userService';


class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            form: {},
            error: {}
        };
    }

    onInputChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;

        this.setState(({ form }) => {
            return { form: { ...form, [name]: value } };
        });
    };

    onLoginSubmit = async (event) => {
        event.preventDefault();
        
        const {email, pass} = this.state.form;

        let data = await service.login(email, pass);
        
        this.props.history.push('/', {id: data.user._id, username: data.user.username, isLogged: true});
        Cookies.set('x-auth-token', data.token);
        console.log(this.props.history);
    };


    render(){
        return (
            <div className='Login'>
                <h1>Login</h1>
                <form onSubmit={this.onLoginSubmit}>
                    <div className='form-control'>
                        <label for='email'>Email</label>
                        <input type='text' id='email' onChange={this.onInputChange}></input>
                    </div>
                    <div className='form-control'>
                        <label for='pass'>Password</label>
                        <input type='password' id='pass' onChange={this.onInputChange}></input>
                    </div>
                    <div className='form-control'>
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        );
    } 
}

export default Login;