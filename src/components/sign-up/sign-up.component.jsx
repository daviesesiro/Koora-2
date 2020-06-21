import React, {useState} from 'react'; 

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up.styles.scss'
import { auth } from '../../firebase/firebase.utils';

const SignUp = () => {   
    const [userCredentials, setUserCredentials] = useState({
        email:'',
        password: '',
        confirmPassword: '',
        error: ''
    });
    
    const {email, password, confirmPassword} = userCredentials;

    const handleSubmit = async event =>{
        event.preventDefault();


        if(password !== confirmPassword){
            alert("passwords don't match");
            return;
        }
        
        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            console.log('created user', user);
        }catch(error){
            setUserCredentials({...userCredentials, error: error.message})
        }
    }

    const handleChange = event =>{
        const {name, value} = event.target;
        setUserCredentials({...userCredentials, [name]:value});
    }

    return(
        <div className='sign-up'>
            <h2 className="title">I do not have a account</h2>
            <h4>Sign up with your email and password</h4>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange = {handleChange}
                    label="Email"
                    required
                />  
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange = {handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange = {handleChange}
                    label="Confirm Password"
                    required
                />
                <Button type='submit'>SIGN UP</Button> 
            </form>
            <p style={{ color:'rgb(100,0,0)' }}>{userCredentials.error}</p>
        </div>
    )
}

export default SignUp;