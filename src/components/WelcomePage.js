import React from 'react';
import {Link} from "react-router-dom";
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/WelcomePage.css';
// components
import Card from 'react-bootstrap/Card';
import {LogOff} from './Navbar';
// images
import thoughtBubble from '../icons/bubble.png';
import mindIcon from '../icons/mind.png';
import logo from '../images/logo/Logo 2.png';
import cloudGroup1 from '../images/clouds/cloud group .png';

/*
This component renders the main welcome page after signing into the app.
User can then select between adding a new thought or viewing their previous submissions.
*/
const WelcomePage = (props) => {

  // clouds are on index level 1; import text and buttons are on index level 2 for overlapping issues
  return (
    <header className="App-header">
    {/* below image tags are just for graphics */}
      <img
        alt = 'clouds'
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
        alt = 'clouds'
        src = {cloudGroup1} 
        style={{
          width: '400px',
          zIndex: '1', 
          position: 'absolute',
          bottom: '0px', 
          right: '30px'
        }}>
      </img>

      <LogOff />
      
      <h1 className="heading" style={{zIndex: '2'}}>
        <img alt = 'Thought Bubbles' src={logo} style={{height: '200px'}}></img>
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", contentAlign: "center" }}>
        {/* Button 1 for adding a new thought */}
        <Link to="/addNewThought" style={{textDecoration: 'none'}}>
          <Card id="optionBtn">
            <Card.Body>
              <h2>
                <strong>Add a New Thought</strong>
              </h2>
              <Card.Text>
                <img
                  alt="icon"
                  src={thoughtBubble}
                  style={{ width: "70%" }}
                ></img>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        {/* Button 2 for searching previous entries */}
        <Link to="/searchMyMind" style={{textDecoration: 'none', zIndex: '2'}}>
          <Card id="optionBtn">
            <Card.Body>
              <h2>
                <strong>Search My Mind</strong>
              </h2>
              <Card.Text>
                <img alt="icon" src={mindIcon} style={{ width: "70%" }}></img>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </header>
  );
}

export default WelcomePage;