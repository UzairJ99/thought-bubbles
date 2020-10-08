import React from 'react';
// images
import logo from '../images/logo/Logo 2.png';
import cloudGroup1 from '../images/clouds/cloud group .png';


// this component is for the logo and clouds on every page
const LogoHeader = () => {
    return (
        <div>
            <img
                src = {cloudGroup1} 
                style={{
                width: '400px',
                zIndex: '1', 
                position: 'absolute',
                top: '30px', 
                left: '30px'
                }}>
            </img>
            <img
                src = {cloudGroup1} 
                style={{
                width: '400px',
                zIndex: '1', 
                position: 'absolute',
                top: '30px', 
                right: '30px'
                    }}>
            </img>
            <h1 className="heading" style={{zIndex: '2'}}>
                <img src={logo} style={{height: '150px'}}></img>
            </h1>
        </div>
    );
}

export default LogoHeader;
