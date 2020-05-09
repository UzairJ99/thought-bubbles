import React from 'react';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/WelcomePage.css';
// components
import Card from 'react-bootstrap/Card';


function WelcomePage() {
  return (
    <header className="App-header">
      <h1 className="heading">Thought Bubbles</h1>
      <div style={{display: 'flex', flex: 'wrap'}}>
        <Card id="optionBtn">
          <Card.Body>
            <Card.Title>Add a New Thought</Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card id="optionBtn">
          <Card.Body>
            <Card.Title>Search My Mind</Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </header>
  )
}

export default WelcomePage;