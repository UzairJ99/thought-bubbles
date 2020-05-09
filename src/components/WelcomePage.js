import React from 'react';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/WelcomePage.css';
// components
import Card from 'react-bootstrap/Card';
// images
import thoughtBubble from '../icons/bubble.png';
import mindIcon from '../icons/mind.png';


function WelcomePage(props) {
  return (
    <header className="App-header">
      <h1 className="heading">Thought Bubbles</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', contentAlign: 'center'}}>
        <Card id="optionBtn" onClick={props.onAddThought}>
          <Card.Body>
            <Card.Title>Add a New Thought</Card.Title>
            <Card.Text>
            <img src={thoughtBubble} style={{width: '50%'}}></img>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card id="optionBtn">
          <Card.Body>
            <Card.Title>Search My Mind</Card.Title>
            <Card.Text>
            <img src={mindIcon} style={{width: '50%'}}></img>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </header>
  )
}

export default WelcomePage;