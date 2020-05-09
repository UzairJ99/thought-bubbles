import React from 'react';
// components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/WelcomePage.css';
import '../stylesheets/AddThought.css';
// images


function AddThought(props) {
  const [step, setStep] = React.useState(1);

  const handleNext = () => {
    setStep(step + 1);
  }

  // determine which component to load
  const renderStep = (step) => {
    switch(step) {
      case 2:
        return (
          <Card.Body>
            <h2><strong>How Did That Make You Feel?</strong></h2>
            {/* emojis go here */}
            <Button id="nextBtn" onClick={()=>{ handleNext() }} variant="primary">Next</Button>
            <Button id="backBtn" onClick={props.onBack} variant="primary">Back</Button>
          </Card.Body>
        )
      default:
        return (
          <Card.Body>
            <h2><strong>Add a New Thought</strong></h2>
            <textarea rows='10' type="text"></textarea>
            <Button id="nextBtn" onClick={()=>{ handleNext() }} variant="primary">Next</Button>
            <Button id="backBtn" onClick={props.onBack} variant="primary">Back</Button>
          </Card.Body>
        )
    }
  }

  return (
    <header className="App-header">
      <h1 className="heading"><strong>Thought Bubbles</strong></h1>
      <div style={{display: 'flex', flexWrap: 'wrap', contentAlign: 'center'}}>
        <Card id="thoughtCard">
          {renderStep(step)}
        </Card>
      </div>
    </header>
  )
}

export default AddThought;