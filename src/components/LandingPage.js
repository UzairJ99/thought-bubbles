import React from 'react';
import {Link} from 'react-router-dom';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/WelcomePage.css';
import '../stylesheets/landing.css';
// components
import Button from 'react-bootstrap/Button';
import LogoHeader from './LogoHeader';


const LandingPage = () => {
    return (
        <header className='App-header'>
            <LogoHeader cloudType='group1' />

            <p>Organize Your Thoughts and Emotions</p>

            <Link to='/login' className='menu' style={{zIndex: '2'}}>
                <Button variant="light" 
                        className='menuButton' 
                        style={{borderRadius: '30px', 
                            fontSize: '20px'}}>
                    <span role='img'>🔐</span> LOGIN
                </Button>
            </Link>
            <br></br>
            <Link to='/signup' className='menu' style={{zIndex: '2'}}>
                <Button variant="light" 
                        className='menuButton' 
                        style={{borderRadius: '30px', 
                            fontSize: '20px'}}>
                    <span role='img'>📝</span> SIGN UP!
                </Button>
            </Link>
        </header>
    )
};

export default LandingPage;