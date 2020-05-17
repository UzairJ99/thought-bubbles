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
  const [step, setStep] = React.useState("stepOne");
  /* holds current entry at the DOM level so that the value of submission is not overwritten when rendering
  different components */
  const [submission, setField] = React.useState({
    'thoughts': "",
    'emotion': "",
    'counterThought': ""
  });

  // save the information to the submission object
  const saveThought = () => {
    submission['thoughts']=document.getElementById("thought").value;
    setField(submission);
    setStep("stepTwo");
  }
  const saveEmotion = () => {
    submission['emotion']='sad' // default to sad, change based on selected emotion
    setField(submission);
    setStep("stepThree");
  }
  const saveCounter = () => {
    submission['counterThought']=document.getElementById("counter-thought").value;
    setField(submission);
    setStep("finished");
  }

  // clear current input for all fields and go back to main page
  const handleCancel = () => {
    setField({})
    props.onBack();
  }

  const handleUpload = () => {
    // add to database here

    props.onBack();
  }

  // determine which component to load
  const renderStep = (step) => {
    switch(step) {
      case "stepTwo":
        return (
          <Card.Body>
            <h2><strong>How Did That Make You Feel?</strong></h2>
            {/* emojis go here */}
            <textarea id="counter-thought" rows='10' type="text"></textarea>
            <Button id="nextBtn" onClick={()=>{ saveEmotion() }} variant="primary">Next</Button>
            <p id="stepTracker">Step 2/3</p>
            <Button id="backBtn" onClick={()=> { handleCancel() }} variant="primary">Cancel</Button>
          </Card.Body>
        )
      case "stepThree":
        return (
          <Card.Body>
            <h2><strong>What Helps Counter This Thought?</strong></h2>
            <p>Something positive that helps you defeat this feeling or something reassuring</p>
            <textarea id="counter-thought" rows='10' type="text"></textarea>
            <Button id="nextBtn" onClick={()=>{ saveCounter() }} variant="primary">Next</Button>
            <p id="stepTracker">Step 3/3</p>
            <Button id="backBtn" onClick={props.onBack} variant="primary">Cancel</Button>
          </Card.Body>
        )
      case "finished":
        return (
          <Card.Body>
            <h2><strong><i style={{marginRight: '10px'}} className="far fa-check-circle"></i>Thought Complete</strong></h2>
            <br></br>
            <p>You can find this thought again in the Search My Mind page.</p>
            <br></br>
            <Button id="finishBtn" onClick={()=>{ handleUpload() }} variant="primary">Finish</Button>
          </Card.Body>
        )
      default:
        return (
          <Card.Body>
            <h2><strong>Add a New Thought</strong></h2>
            <textarea id="thought" rows='10' type="text"></textarea>
            <Button id="nextBtn" onClick={()=>{ saveThought() }} variant="primary">Next</Button>
            <p id="stepTracker">Step 1/3</p>
            <Button id="backBtn" onClick={props.onBack} variant="primary">Cancel</Button>
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