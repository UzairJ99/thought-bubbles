import React from 'react';
import {Link, withRouter} from 'react-router-dom';
// components
import LogoHeader from './LogoHeader';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/Auth.css';
// back end
import { withFirebase } from './Firebase/index';
// constants
import * as ROUTES from '../constants/routes';


const LoginPage = () => {
    return (
        <header className = 'App-header'>
            <LogoHeader/>
            <Card className='authBody' style={{borderRadius: '30px', height: '100%'}}>
                <Card.Body>
                    <h1 className='authHeading'>SIGN IN</h1>
                    <SigninForm/>
                </Card.Body>
            </Card>
            <br></br>
            <p>
                Don't have an account? <Link to={ROUTES.SIGNUP}>Sign Up!</Link>
            </p>
        </header>
    )
};


const SigninFormBase = (props) => {
    // initial field values for login
    const initialState = {
        email: '',
        password: ''
    }

    const [userInfo, setUserInfo] = React.useState(initialState);
    const [invalidLogin, setInvalidLogin] = React.useState(false);
    const [errorMsg, setError] = React.useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        // get login info from state
        const {email, password} = userInfo;

        props.firebase.doSignIn(email, password)
        .then((authUser) => {
            // state is successful login
            setInvalidLogin(false);
            // clear userInfo
            clearInfo();
            // go to welcome page
            props.history.push(ROUTES.WELCOME);
        })
        .catch(error => {
            // clear userInfo and reset values
            clearInfo();
            document.getElementById('emailVal').value = '';
            document.getElementById('passwordVal').value = '';

            // change state to error
            setError(error.message);
            setInvalidLogin(true);
        });
    }

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

    const clearInfo = () => {
        userInfo['email'] = '';
        userInfo['password'] = '';
        setUserInfo({email: '', password: ''});
    }

    return (
        <Form onSubmit={handleLogin}>
            {
                // render error message if the login attempt failed
                invalidLogin ? <Alert variant="danger" id='flashMessage' style={{fontSize: '15px'}}>{errorMsg}</Alert> : null
            }
            <Form.Group>
                <Form.Label style={{marginTop: '15px', float: 'left', 'fontSize': '20px'}} className='authText'><span role='img'>👤</span> Email</Form.Label>
                <Form.Control onChange={()=>{changeEmail('emailVal')}} id="emailVal" type="email" style={{borderRadius: '30px'}} placeholder='Enter your email address' />
                <Form.Label style={{marginTop: '12px', float: 'left', 'fontSize': '20px'}} className='authText'><span role='img'>🔑</span> Password</Form.Label>
                <Form.Control onChange={()=>{changePass('passwordVal')}}  id='passwordVal' type="password" style={{borderRadius: '30px'}} placeholder='Enter your password' />
                <Button style={{marginTop: '30px', 
                                width: '100%', 
                                borderRadius: '30px',
                                height: '50px',
                                }}
                        type="submit">
                    SUBMIT
                </Button>
            </Form.Group>
        </Form>
    );
}

const SigninForm = withRouter(withFirebase(SigninFormBase));

export default LoginPage;
export { SigninForm };