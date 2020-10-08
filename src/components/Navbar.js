import React from 'react';
import {withRouter} from 'react-router-dom';
// back end
import {withFirebase} from './Firebase/index';
// constants
import * as ROUTES from '../constants/routes';


const Navbar = (props) => {
    // perform sign out
    const handleSignOut = (event) => {
        event.preventDefault();
        props.firebase.doSignOut()
        .then(() => {
            // redirect
            props.history.push(ROUTES.LANDING);
        })
        .catch(error => {
            console.log(error);
        });        
    }

    return (
        <button onClick={handleSignOut} 
                style={{top: '30px', 
                        right: '30px', 
                        position: 'absolute',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: 'white'
                        }}>
            <i className="fas fa-sign-out-alt"></i> Sign Out
        </button>
    );
}

// wrap in router for redirect
const LogOff = withRouter(withFirebase(Navbar));

export default Navbar;
export {LogOff};