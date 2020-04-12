import React from 'react';

import '../shared/styles/LoginAndRegister.css';

class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            form: {},
            error: null
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
        
        this.props.login(this.props.history, email, pass);
    };


    render(){
        const { isLoggedIn } = this.props;
        const {error} = this.state;

        if(isLoggedIn){
            this.props.history.push('/');
            return null;
        }
        
        return (
            <div className='Login'>
                <h1>Login</h1>
                {error ? <div className='error-message'>{error}</div> : <div></div>}
                <form onSubmit={this.onLoginSubmit}>
                    <div className='form-control'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' onChange={this.onInputChange}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='pass'>Password</label>
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