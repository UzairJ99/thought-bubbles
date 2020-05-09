import React from 'react';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/WelcomePage.css';
import '../stylesheets/AddThought.css';
// components
import Card from 'react-bootstrap/Card';
// images


function AddThought() {
  return (
    <header className="App-header">
      <h1 className="heading">Thought Bubbles</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', contentAlign: 'center'}}>
        <Card id="thoughtCard">
          <Card.Body>
            <Card.Title>Add a New Thought</Card.Title>
            <textarea rows='10' type="text"></textarea>
          </Card.Body>
        </Card>
      </div>
    </header>
  )
}

export default AddThought;