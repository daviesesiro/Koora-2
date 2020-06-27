import React, {useState} from 'react'; 

import FormInput from '../form-input/form-input.component';
import Button2 from '../button/button2.component';

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
            return setUserCredentials({...userCredentials, error:"Passwords don't match" });
        }
        
        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            setUserCredentials({...userCredentials, error: ''})

        }catch(error){
            setUserCredentials({...userCredentials, error: error.message})
        }
    }

    const handleChange = event =>{
        const {name, value} = event.target;
        setUserCredentials({...userCredentials, [name]:value});
    }

    return(
        <>
            <h2 className="sign-up-title">I do not have a account</h2>
            <h4 className='sign-up-subhead'>Sign up with your email and password</h4>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <p
                    style={{
                        color: 'rgb(100,0,0)', 
                        transform: 'translateY(2rem)',
                        fontSize: '.8rem',
                        textAlign: 'center'
                    }}
                >
                    {userCredentials.error}
                </p>
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
                <Button2 isBig color='red' type='submit'>SIGN UP</Button2> 
            </form>
            
        </>
    )
}

export default SignUp;