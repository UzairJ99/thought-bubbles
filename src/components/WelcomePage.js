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
      <h1 className="heading"><strong>Thought Bubbles</strong></h1>
      <div style={{display: 'flex', flexWrap: 'wrap', contentAlign: 'center'}}>
        <Card id="optionBtn" onClick={props.onAddThought}>
          <Card.Body>
            <h2><strong>Add a New Thought</strong></h2>
            <Card.Text>
              <img alt="icon" src={thoughtBubble} style={{width: '70%'}}></img>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card id="optionBtn">
          <Card.Body>
            <h2><strong>Search My Mind</strong></h2>
            <Card.Text>
              <img alt="icon" src={mindIcon} style={{width: '70%'}}></img>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </header>
  )
}

export default WelcomePage;