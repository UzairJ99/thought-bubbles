import React from 'react';
import {Link, withRouter} from 'react-router-dom';
// components
import LogoHeader from './LogoHeader';
import Card from 'react-bootstrap/Card';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/Auth.css';
// back end
import  { withFirebase } from './Firebase/index';
// constants
import * as ROUTES from '../constants/routes';


const RegisterPage = () => {
    return (
        <header className = 'App-header'>
            <LogoHeader cloudType='group1' />
            <Card className='authBody' style={{borderRadius: '30px', height: '100%'}}>
                <Card.Body>
                    <h2 className='authHeading'>SIGN UP</h2>
                    <SignupForm />
                </Card.Body>
            </Card>
        </header>
    )
};

// Form component for processing registration
const SignupFormBase = (props) => {
    // initial field values for new user
    const initialState = {
        email: '',
        password: '',
        confirmedPassword: ''
    }
    
    const[userInfo, setUserInfo] = React.useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();

        // get info from state
        const {email, password, confirmedPassword} = userInfo;

        // create user - promise chain
        if (password === confirmedPassword) {
            props.firebase.doCreateUser(email, password)
            .then(authUser => {
                // destructure initial state
                setUserInfo(initialState);
                // clear info
                document.getElementById('emailVal').value = '';
                document.getElementById('passwordVal').value = '';
                document.getElementById('passwordValConfirm').value = '';
                // redirect
                props.history.push(ROUTES.WELCOME);
            })
            .catch(error => {
                setUserInfo({error});
                console.log(error);
            });
        } else {
            console.log("passwords don't match");
        }
    };

    // update state when input fields change

    const changeEmail = (id) => {
        const key = document.getElementById(id);
        userInfo['email'] = key.value;
        setUserInfo(userInfo);
    }

    const changePass = (id) => {
        const key = document.getElementById(id);
        userInfo['password'] = key.value;
        setUserInfo(userInfo);
    }

    const confirmPass = (id) => {
        const key = document.getElementById(id);
        userInfo['confirmedPassword'] = key.value;
        setUserInfo(userInfo);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label style={{marginTop: '15px', float: 'left', 'fontSize': '20px'}} className='authText'><span role='img'>👤</span> Email</Form.Label>
                <Form.Control onChange={()=>{changeEmail('emailVal')}} id="emailVal" type="email" style={{borderRadius: '30px'}} placeholder='Enter your email address' />
                <Form.Label style={{marginTop: '12px', float: 'left', 'fontSize': '20px'}} className='authText'><span role='img'>🔑</span> Password</Form.Label>
                <Form.Control onChange={()=>{changePass('passwordVal')}}  id='passwordVal' type="password" style={{borderRadius: '30px'}} placeholder='Enter your password' />
                <Form.Control onChange={()=>{confirmPass('passwordValConfirm')}}  id='passwordValConfirm' type="password" style={{borderRadius: '30px', marginTop: '10px'}} placeholder='Confirm your password' />
                <Button style={{marginTop: '30px', 
                                width: '100%', 
                                borderRadius: '30px',
                                height: '50px',
                                }}
                        type="submit">
                    SIGN UP!
                </Button>
            </Form.Group>
        </Form>
    );
}

const SignupForm = withRouter(withFirebase(SignupFormBase));

export default RegisterPage;
export {SignupForm};