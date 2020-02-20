import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoole } from '../../firebase/firebase.utils.js'

import './sign-in.style.scss'

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: '', password: ''})
    }

    handleChange = event => {

        const { value, name } = event.target

        this.setState({ [name]: value})
    }

    render() {
        return (
            <div className= 'sign-in'>
                <h2>I Already have an account</h2>
                <span>Sign in with your email and password</span>
            
                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' 
                        type='email' 
                        value={this.state.email} 
                        required
                        label='Email'
                        handleChange={this.handleChange}
                        />

                    <FormInput name='password' 
                        type='password' 
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        label='Password'
                        required/>

                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoole} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                </form>

            </div>

        )
    }
}

export default SignIn