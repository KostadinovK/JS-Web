import React from 'react';

import '../shared/styles/LoginAndRegister.css';

import service from '../services/userService';

class Register extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            form: {},
            errors: {}
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

        await service.register(email, pass);
        
        this.props.history.push('/login');
    };

    render(){
        return (
            <div className='Register'>
                <h1>Register</h1>
                <form onSubmit={this.onRegisterSubmit}>
                    <div className='form-control'>
                        <label forHtml='email'>Email</label>
                        <input type='text' id='email' onChange={this.onInputChange}></input>
                    </div>
                    <div className='form-control'>
                        <label forHtml='pass'>Password</label>
                        <input type='password' id='pass' onChange={this.onInputChange}></input>
                    </div>
                    <div className='form-control'>
                        <label forHtml='rePass'>Repeat Password</label>
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